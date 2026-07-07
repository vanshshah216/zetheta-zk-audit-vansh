export interface ValidationError {
  field: string;
  message: string;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) return { valid: false, error: 'Email is required' };
  if (!emailRegex.test(email)) return { valid: false, error: 'Invalid email format' };
  return { valid: true };
}

export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
  strength: 'weak' | 'medium' | 'strong';
} {
  if (!password) return { valid: false, error: 'Password is required', strength: 'weak' };
  if (password.length < 8) return { valid: false, error: 'Password must be at least 8 characters', strength: 'weak' };

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  const strength = hasLower && hasUpper && hasNumber && hasSpecial ? 'strong' : hasNumber && (hasLower || hasUpper) ? 'medium' : 'weak';

  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)',
      strength,
    };
  }

  return { valid: true, strength };
}

export function validatePasswordMatch(password: string, confirmPassword: string): { valid: boolean; error?: string } {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name) return { valid: false, error: 'Name is required' };
  if (name.length < 2) return { valid: false, error: 'Name must be at least 2 characters' };
  if (name.length > 50) return { valid: false, error: 'Name must be less than 50 characters' };
  return { valid: true };
}

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone) return { valid: true }; // Optional field
  if (!phoneRegex.test(phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }
  return { valid: true };
}

export function validateOTP(code: string): { valid: boolean; error?: string } {
  if (!code) return { valid: false, error: 'OTP code is required' };
  if (!/^\d{6}$/.test(code)) {
    return { valid: false, error: 'OTP must be 6 digits' };
  }
  return { valid: true };
}

export function validateWalletAddress(address: string): { valid: boolean; error?: string } {
  if (!address) return { valid: false, error: 'Wallet address is required' };
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: 'Invalid Ethereum wallet address' };
  }
  return { valid: true };
}
