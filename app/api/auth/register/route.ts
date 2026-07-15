import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  getSessionCookieOptions,
} from '@/lib/auth-session'
import {
  getProfileSeedData,
  registerUser,
} from '@/lib/auth-credentials.server'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase/client'
import type { AuthSession, RegisterData } from '@/lib/auth-types'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterData

    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.role) {
      return NextResponse.json({ error: 'Missing required registration fields' }, { status: 400 })
    }

    if (!body.agreeToTerms) {
      return NextResponse.json({ error: 'You must agree to the terms' }, { status: 400 })
    }

    const user = registerUser(body)
    if (!user) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabase()
        const profile = getProfileSeedData(user)
        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', profile.email)
          .maybeSingle()

        if (!existing) {
          await supabase.from('profiles').insert([profile])
        }
      } catch {
        // Profile sync is best-effort for demo registrations
      }
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
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
