import type { UserRole } from '@/lib/auth-types'

export const AUTH_COOKIE_NAME = 'zka-session'

export interface SessionPayload {
  userId: string
  email: string
  role: UserRole
  exp: number
}

const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours

const DEV_FALLBACK_SECRET = 'dev-only-insecure-secret-change-me'

function getSessionSecret(): string {
  const secret =
    process.env.AUTH_SESSION_SECRET ||
    process.env.SEED_SECRET ||
    (process.env.NODE_ENV === 'production' ? '' : DEV_FALLBACK_SECRET)

  if (process.env.NODE_ENV === 'production' && !secret) {
    throw new Error(
      'AUTH_SESSION_SECRET (or SEED_SECRET) must be set in production'
    )
  }

  return secret || DEV_FALLBACK_SECRET
}

function encodeBase64Url(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64url')
  }
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decodeBase64Url(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'base64url').toString('utf8')
  }
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  return atob(padded)
}

async function sign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const bytes = new Uint8Array(signature)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(binary, 'binary').toString('base64url')
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function verifySignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const expected = await sign(payload, secret)
  return expected === signature
}

export async function createSessionToken(userId: string, email: string, role: UserRole): Promise<string> {
  const payload: SessionPayload = {
    userId,
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  }
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = await sign(encodedPayload, getSessionSecret())
  return `${encodedPayload}.${signature}`
}

export async function parseSessionToken(token: string): Promise<SessionPayload | null> {
  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return null

  const valid = await verifySignature(encodedPayload, signature, getSessionSecret())
  if (!valid) return null

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionPayload
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    if (!payload.userId || !payload.email || !payload.role) return null
    return payload
  } catch {
    return null
  }
}

export function getSessionCookieOptions(maxAge = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  }
}
