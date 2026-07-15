import type { AuthUser, RegisterData, UserRole } from '@/lib/auth-types'

interface StoredUser {
  user: AuthUser
  password: string
}

const DEMO_USERS: Record<string, StoredUser> = {
  'demo@example.com': {
    user: {
      id: 'demo-user',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      role: 'auditor',
      phone: '+919999999999',
      company: 'Demo Security',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2025-01-01'),
    },
    password: 'Demo@1234567890',
  },
  'company@example.com': {
    user: {
      id: 'company-user',
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
      id: 'auditor-user',
      email: 'auditor@example.com',
      firstName: 'John',
      lastName: 'Auditor',
      role: 'auditor',
      phone: '+1987654321',
      company: 'Audit Labs',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2024-01-20'),
    },
    password: 'password123',
  },
  'verifier@example.com': {
    user: {
      id: 'verifier-user',
      email: 'verifier@example.com',
      firstName: 'Alex',
      lastName: 'Verifier',
      role: 'investor',
      company: 'Verifier DAO',
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date('2024-02-01'),
    },
    password: 'password123',
  },
}

/** Runtime registrations (demo only; resets on cold start in serverless). */
const runtimeUsers: Record<string, StoredUser> = {}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function getUserById(id: string): AuthUser | null {
  for (const record of Object.values(DEMO_USERS)) {
    if (record.user.id === id) return record.user
  }
  for (const record of Object.values(runtimeUsers)) {
    if (record.user.id === id) return record.user
  }
  return null
}

export function getUserByEmail(email: string): AuthUser | null {
  const key = normalizeEmail(email)
  return DEMO_USERS[key]?.user ?? runtimeUsers[key]?.user ?? null
}

export function validateLoginCredentials(
  email: string,
  password: string
): AuthUser | null {
  const key = normalizeEmail(email)
  const record = DEMO_USERS[key] ?? runtimeUsers[key]
  if (!record || record.password !== password.trim()) {
    return null
  }
  return record.user
}

export function registerUser(data: RegisterData): AuthUser | null {
  const key = normalizeEmail(data.email)
  if (DEMO_USERS[key] || runtimeUsers[key]) {
    return null
  }

  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    email: key,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    phone: data.phone,
    company: data.company,
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: new Date(),
  }

  runtimeUsers[key] = {
    user: newUser,
    password: data.password,
  }

  return newUser
}

export function toPublicUser(user: AuthUser): Omit<AuthUser, never> {
  return user
}

export function isDemoAccount(email: string): boolean {
  return normalizeEmail(email) in DEMO_USERS
}

export function getProfileSeedData(user: AuthUser): {
  id: string
  email: string
  role: UserRole
  company_name: string | null
} {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    company_name: user.company ?? null,
  }
}
