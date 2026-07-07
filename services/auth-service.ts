import { AuthUser, AuthSession, LoginCredentials, RegisterData } from '@/lib/auth-types'

// Mock user database
const MOCK_USERS: Record<string, { user: AuthUser; password: string }> = {
  'company@example.com': {
    user: {
      id: 'user-1',
      email: 'company@example.com',
      firstName: 'Jane',
      lastName: 'Company',
      role: 'audited',
      phone: '+1234567890',
      company: 'Tech Corp',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2024-01-15'),
    },
    password: 'password123',
  },
  'auditor@example.com': {
    user: {
      id: 'user-2',
      email: 'auditor@example.com',
      firstName: 'John',
      lastName: 'Auditor',
      role: 'auditor',
      phone: '+1987654321',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2024-01-20'),
    },
    password: 'password123',
  },
  'verifier@example.com': {
    user: {
      id: 'user-3',
      email: 'verifier@example.com',
      firstName: 'Alex',
      lastName: 'Verifier',
      role: 'investor',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2024-02-01'),
    },
    password: 'password123',
  },
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; session: AuthSession } | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const userRecord = MOCK_USERS[credentials.email]
    if (!userRecord || userRecord.password !== credentials.password) {
      return null
    }

    const session: AuthSession = {
      accessToken: `token-${Date.now()}`,
      refreshToken: `refresh-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      user: userRecord.user,
    }

    return { user: userRecord.user, session }
  },

  async register(data: RegisterData): Promise<{ user: AuthUser; session: AuthSession } | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (MOCK_USERS[data.email]) {
      return null
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phone: data.phone,
      company: data.company,
      emailVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date(),
    }

    const session: AuthSession = {
      accessToken: `token-${Date.now()}`,
      refreshToken: `refresh-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      user: newUser,
    }

    MOCK_USERS[data.email] = { user: newUser, password: data.password }

    return { user: newUser, session }
  },

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
  },

  async getCurrentUser(token: string): Promise<AuthUser | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200))

    // In a real app, validate the token
    const users = Object.values(MOCK_USERS)
    if (users.length > 0) {
      return users[0].user
    }

    return null
  },

  async refreshSession(refreshToken: string): Promise<AuthSession | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const users = Object.values(MOCK_USERS)
    if (users.length > 0) {
      const user = users[0].user
      return {
        accessToken: `token-${Date.now()}`,
        refreshToken: `refresh-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        user,
      }
    }

    return null
  },
}
