import type { LoginCredentials, RegisterData, AuthSession, AuthUser, PasswordResetData, NewPasswordData, TwoFactorData, WalletConnectionData } from './auth-types';

// Mock delay for realistic API behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user database
const mockUsers: Record<string, AuthUser & { password: string }> = {
  'demo@example.com': {
    id: 'user-1',
    email: 'demo@example.com',
    password: 'Demo@1234567890',
    firstName: 'Demo',
    lastName: 'User',
    role: 'auditor',
    company: 'Acme Corp',
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: new Date('2025-01-01'),
  },
};

// Mock session storage
let mockSession: AuthSession | null = null;

export async function loginWithEmail(credentials: LoginCredentials): Promise<{ session: AuthSession; error?: null } | { session?: null; error: string }> {
  await delay(1500);

  const user = mockUsers[credentials.email];
  if (!user || user.password !== credentials.password) {
    return { error: 'Invalid email or password' };
  }

  if (!user.emailVerified) {
    return { error: 'Please verify your email before logging in' };
  }

  const session: AuthSession = {
    accessToken: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    refreshToken: `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      company: user.company,
      walletAddress: user.walletAddress,
      emailVerified: user.emailVerified,
      twoFactorEnabled: user.twoFactorEnabled,
      createdAt: user.createdAt,
    },
  };

  mockSession = session;
  localStorage.setItem('authSession', JSON.stringify(session));

  return { session };
}

export async function register(data: RegisterData): Promise<{ user: AuthUser; error?: null } | { user?: null; error: string }> {
  await delay(2000);

  if (mockUsers[data.email]) {
    return { error: 'Email already registered' };
  }

  const newUser: AuthUser & { password: string } = {
    id: `user_${Date.now()}`,
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    phone: data.phone,
    company: data.company,
    emailVerified: false,
    twoFactorEnabled: false,
    createdAt: new Date(),
  };

  mockUsers[data.email] = newUser;

  // Store pending verification email in localStorage
  localStorage.setItem('pendingEmailVerification', data.email);

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      phone: newUser.phone,
      company: newUser.company,
      emailVerified: newUser.emailVerified,
      twoFactorEnabled: newUser.twoFactorEnabled,
      createdAt: newUser.createdAt,
    },
  };
}

export async function verifyEmail(email: string, code: string): Promise<{ verified: boolean; error?: null } | { verified?: null; error: string }> {
  await delay(1000);

  // Mock: accept any 6-digit code
  if (!/^\d{6}$/.test(code)) {
    return { error: 'Invalid verification code' };
  }

  const user = mockUsers[email];
  if (!user) {
    return { error: 'User not found' };
  }

  user.emailVerified = true;
  localStorage.removeItem('pendingEmailVerification');

  return { verified: true };
}

export async function requestPasswordReset(data: PasswordResetData): Promise<{ sent: boolean; error?: null } | { sent?: null; error: string }> {
  await delay(1000);

  const user = mockUsers[data.email];
  if (!user) {
    // Don't reveal if email exists for security
    return { sent: true };
  }

  // Store reset token in localStorage for demo
  localStorage.setItem(`passwordReset_${data.email}`, `token_${Date.now()}`);

  return { sent: true };
}

export async function resetPassword(data: NewPasswordData): Promise<{ reset: boolean; error?: null } | { reset?: null; error: string }> {
  await delay(1500);

  // Mock: accept any valid token format for demo
  if (!data.token.startsWith('token_')) {
    return { error: 'Invalid or expired reset token' };
  }

  const email = Object.keys(localStorage)
    .find((key) => key === `passwordReset_${data.token}`)
    ?.replace('passwordReset_', '');

  if (!email) {
    return { error: 'Invalid or expired reset token' };
  }

  const user = mockUsers[email];
  if (!user) {
    return { error: 'User not found' };
  }

  user.password = data.password;
  localStorage.removeItem(`passwordReset_${email}`);

  return { reset: true };
}

export async function setupTwoFactor(userId: string): Promise<{ secret: string; qrCode: string; error?: null } | { secret?: null; qrCode?: null; error: string }> {
  await delay(800);

  // Mock: return a fake secret and QR code
  const secret = 'JBSWY3DPEBLW64TMMQ======';
  const qrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  return { secret, qrCode };
}

export async function verifyTwoFactor(code: TwoFactorData): Promise<{ verified: boolean; error?: null } | { verified?: null; error: string }> {
  await delay(800);

  // Mock: accept any 6-digit code
  if (!/^\d{6}$/.test(code.code)) {
    return { error: 'Invalid verification code' };
  }

  return { verified: true };
}

export async function enableTwoFactor(userId: string): Promise<{ enabled: boolean; error?: null } | { enabled?: null; error: string }> {
  await delay(800);

  if (mockSession?.user.id === userId) {
    mockSession.user.twoFactorEnabled = true;
  }

  const user = Object.values(mockUsers).find((u) => u.id === userId);
  if (user) {
    user.twoFactorEnabled = true;
  }

  return { enabled: true };
}

export async function connectWallet(data: WalletConnectionData): Promise<{ connected: boolean; error?: null } | { connected?: null; error: string }> {
  await delay(2000);

  if (!data.signature) {
    return { error: 'Wallet signature verification failed' };
  }

  if (mockSession) {
    mockSession.user.walletAddress = data.walletAddress;
  }

  const user = Object.values(mockUsers).find((u) => u.id === mockSession?.user.id);
  if (user) {
    user.walletAddress = data.walletAddress;
  }

  return { connected: true };
}

export async function logout(): Promise<void> {
  mockSession = null;
  localStorage.removeItem('authSession');
}

export function getStoredSession(): AuthSession | null {
  const stored = localStorage.getItem('authSession');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return mockSession;
}

export function getCurrentUser(): AuthUser | null {
  const session = getStoredSession();
  return session?.user || null;
}
