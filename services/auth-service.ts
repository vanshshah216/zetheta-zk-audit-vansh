import {
  AuthUser,
  AuthSession,
  LoginCredentials,
  RegisterData,
} from '@/lib/auth-types'

function buildSession(user: AuthUser, accessToken: string): AuthSession {
  return {
    accessToken,
    refreshToken: '',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    user,
  }
}

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: AuthUser; session: AuthSession } | null> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { user: AuthUser; session: AuthSession }
    return { user: data.user, session: data.session }
  },

  async register(
    data: RegisterData
  ): Promise<{ user: AuthUser; session: AuthSession } | null> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return null
    }

    const result = (await response.json()) as { user: AuthUser; session: AuthSession }
    return { user: result.user, session: result.session }
  },

  async logout() {
    await fetch('/api/auth/session', { method: 'DELETE' })
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const response = await fetch('/api/auth/session')
    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { user: AuthUser | null }

    if (!data.user) {
      return null
    }

    return {
      ...data.user,
      createdAt: new Date(data.user.createdAt),
    }
  },

  async refreshSession(): Promise<AuthSession | null> {
    const user = await this.getCurrentUser()
    if (!user) {
      return null
    }

    return buildSession(user, '')
  },
}
