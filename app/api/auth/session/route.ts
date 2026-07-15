import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUserById } from '@/lib/auth-credentials.server'
import {
  AUTH_COOKIE_NAME,
  getSessionCookieOptions,
  parseSessionToken,
} from '@/lib/auth-session'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const session = token ? await parseSessionToken(token) : null

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const fullUser = getUserById(session.userId)

  return NextResponse.json({
    user: fullUser ?? {
      id: session.userId,
      email: session.email,
      role: session.role,
      firstName: '',
      lastName: '',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
    },
  })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, '', { ...getSessionCookieOptions(), maxAge: 0 })
  return NextResponse.json({ success: true })
}
