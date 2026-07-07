'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ds/button';
import { Input } from '@/components/ds/input';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { useFormState } from '@/lib/auth-hooks';
import { validateEmail } from '@/lib/auth-validation';
import { requestPasswordReset } from '@/lib/auth-api';
import { AlertTriangle, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const form = useFormState({ email: '' });
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    form.clearErrors();

    const emailValidation = validateEmail(form.values.email);
    if (!emailValidation.valid) {
      form.setFieldError('email', emailValidation.error || '');
      return;
    }

    form.setIsSubmitting(true);

    try {
      const result = await requestPasswordReset({
        email: form.values.email,
      });

      if (result.error) {
        setApiError(result.error);
      } else {
        setSuccess(true);
        // Store email for next step
        localStorage.setItem('resetPasswordEmail', form.values.email);
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/auth/reset-password');
        }, 2000);
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      form.setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Check Your Email" subtitle="We sent password reset instructions">
        <AuthCard title="Email Sent" description="Check your inbox for reset link">
          <div className="space-y-4 text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/20 mb-4">
              <Mail className="w-8 h-8 text-emerald" />
            </div>
            <p className="text-foreground">We've sent password reset instructions to:</p>
            <p className="font-semibold text-cyan">{form.values.email}</p>
            <p className="text-sm text-muted-foreground">
              Click the link in the email to reset your password. The link expires in 1 hour.
            </p>
            <Button variant="cyan" className="w-full" onClick={() => router.push('/auth/reset-password')}>
              Continue to Reset
            </Button>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Your Password" subtitle="We'll help you regain access to your account">
      <AuthCard title="Forgot Password" description="Enter your email to receive reset instructions">
        <form onSubmit={handleSubmit} className="space-y-4">
          {apiError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email && !!form.errors.email}
              icon={<Mail className="w-4 h-4" />}
            />
            {form.touched.email && form.errors.email && (
              <p className="text-xs text-destructive mt-1">{form.errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="cyan"
            className="w-full"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? 'Sending...' : 'Send Reset Link'}
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
