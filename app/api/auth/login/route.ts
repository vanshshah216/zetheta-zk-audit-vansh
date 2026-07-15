import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  getSessionCookieOptions,
} from '@/lib/auth-session'
import { validateLoginCredentials } from '@/lib/auth-credentials.server'
import type { AuthSession, LoginCredentials } from '@/lib/auth-types'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginCredentials
    const email = body.email?.trim()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = validateLoginCredentials(email, password)
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createSessionToken(user.id, user.email, user.role)
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE_NAME, token, getSessionCookieOptions())

    const session: AuthSession = {
      accessToken: token,
      refreshToken: '',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      user,
    }

    return NextResponse.json({ user, session })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
