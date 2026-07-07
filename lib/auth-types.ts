export type UserRole = 'auditor' | 'audited' | 'investor';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  company?: string;
  walletAddress?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  company?: string;
  agreeToTerms: boolean;
}

export interface PasswordResetData {
  email: string;
}

export interface NewPasswordData {
  token: string;
  password: string;
}

export interface TwoFactorData {
  code: string;
}

export interface WalletConnectionData {
  walletAddress: string;
  walletType: 'metamask' | 'walletconnect';
  signature: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}
