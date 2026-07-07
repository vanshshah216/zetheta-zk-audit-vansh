'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { PasswordStrength } from '@/components/auth/password-strength';
import { Button } from '@/components/ds/button';
import { Input } from '@/components/ds/input';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { useFormState } from '@/lib/auth-hooks';
import {
  validatePassword,
  validatePasswordMatch,
} from '@/lib/auth-validation';
import { resetPassword } from '@/lib/auth-api';
import { AlertTriangle, Lock, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const form = useFormState({ password: '', confirmPassword: '' });
  const [apiError, setApiError] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Get reset token from URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const storedToken = localStorage.getItem('resetPasswordToken');
    
    setToken(urlToken || storedToken || `token_${Date.now()}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    form.clearErrors();

    const passwordValidation = validatePassword(form.values.password);
    if (!passwordValidation.valid) {
      form.setFieldError('password', passwordValidation.error || '');
      return;
    }

    const matchValidation = validatePasswordMatch(
      form.values.password,
      form.values.confirmPassword
    );
    if (!matchValidation.valid) {
      form.setFieldError('confirmPassword', matchValidation.error || '');
      return;
    }

    form.setIsSubmitting(true);

    try {
      const result = await resetPassword({
        token,
        password: form.values.password,
      });

      if (result.error) {
        setApiError(result.error);
      } else {
        // Clear stored data
        localStorage.removeItem('resetPasswordEmail');
        localStorage.removeItem('resetPasswordToken');
        setRedirecting(true);
        // Redirect to login
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      form.setIsSubmitting(false);
    }
  };

  if (redirecting) {
    return (
      <AuthLayout title="Password Reset Successful" subtitle="You can now log in with your new password">
        <AuthCard title="Success" description="Redirecting to login...">
          <div className="space-y-4 text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/20 mb-4">
              <Lock className="w-8 h-8 text-emerald" />
            </div>
            <p className="text-foreground">Your password has been successfully reset.</p>
            <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Your Password" subtitle="Create a new password for your account">
      <AuthCard title="New Password" description="Choose a strong password">
        <form onSubmit={handleSubmit} className="space-y-4">
          {apiError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.password && !!form.errors.password}
              icon={<Lock className="w-4 h-4" />}
            />
            {form.touched.password && form.errors.password && (
              <p className="text-xs text-destructive mt-1">{form.errors.password}</p>
            )}
          </div>

          <PasswordStrength password={form.values.password} />

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.confirmPassword && !!form.errors.confirmPassword}
              icon={<Lock className="w-4 h-4" />}
            />
            {form.touched.confirmPassword && form.errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1">{form.errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="cyan"
            className="w-full"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>

        <div className="pt-4 border-t border-border">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-cyan hover:text-cyan/80 transition-colors text-center w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
