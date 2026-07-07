import { useState, useEffect, useCallback } from 'react';
import type { AuthUser, AuthSession } from './auth-types';
import { getStoredSession, getCurrentUser } from './auth-api';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = getStoredSession();
    if (storedSession) {
      setSession(storedSession);
      setUser(storedSession.user);
    }
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSession(null);
  }, []);

  return { user, session, loading, error, setUser, setSession, logout };
}

export function useFormState(initialValues: Record<string, any>) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    values,
    setValues,
    touched,
    setTouched,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    setFieldError,
    clearFieldError,
    clearErrors,
  };
}

export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
  };

  return { seconds, isActive, reset };
}

export function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    setRequirements({
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      special: hasSpecial,
    });

    const metRequirements = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
    if (metRequirements <= 2) {
      setStrength('weak');
    } else if (metRequirements <= 3) {
      setStrength('medium');
    } else {
      setStrength('strong');
    }
  }, [password]);

  return { strength, requirements };
}

export function useOTPInput(length: number = 6) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const inputs = document.querySelectorAll('[data-otp-input]');
      (inputs[index - 1] as HTMLInputElement)?.focus();
    } else if (e.key !== 'Backspace' && code[index] && index < length - 1) {
      const inputs = document.querySelectorAll('[data-otp-input]');
      (inputs[index + 1] as HTMLInputElement)?.focus();
    }
  };

  const fullCode = code.join('');
  const isFilled = code.every((digit) => digit !== '');

  return { code, fullCode, isFilled, handleChange, handleKeyDown };
}
