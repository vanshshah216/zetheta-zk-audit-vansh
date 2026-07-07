'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { ProgressStepper } from '@/components/auth/progress-stepper';
import { PasswordStrength } from '@/components/auth/password-strength';
import { Button } from '@/components/ds/button';
import { Input } from '@/components/ds/input';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormState } from '@/lib/auth-hooks';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validatePhone,
} from '@/lib/auth-validation';
import { register } from '@/lib/auth-api';
import { AlertTriangle, Mail, User, Phone, Building2 } from 'lucide-react';
import type { UserRole } from '@/lib/auth-types';

const steps = [
  { label: 'Account' },
  { label: 'Password' },
  { label: 'Profile' },
  { label: 'Company' },
  { label: 'Agree' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('auditor');

  const form = useFormState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    agreeToTerms: false,
  });

  // Load selected role from localStorage on client side
  useEffect(() => {
    const role = (localStorage.getItem('selectedRole') as UserRole) || 'auditor';
    setSelectedRole(role);
  }, []);

  const handleNext = async () => {
    setApiError(null);
    form.clearErrors();

    // Step-by-step validation
    if (currentStep === 0) {
      const emailValidation = validateEmail(form.values.email);
      if (!emailValidation.valid) {
        form.setFieldError('email', emailValidation.error || '');
        return;
      }
    } else if (currentStep === 1) {
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
    } else if (currentStep === 2) {
      const firstNameValidation = validateName(form.values.firstName);
      if (!firstNameValidation.valid) {
        form.setFieldError('firstName', firstNameValidation.error || '');
        return;
      }

      const lastNameValidation = validateName(form.values.lastName);
      if (!lastNameValidation.valid) {
        form.setFieldError('lastName', lastNameValidation.error || '');
        return;
      }
    } else if (currentStep === 3) {
      const phoneValidation = validatePhone(form.values.phone);
      if (!phoneValidation.valid) {
        form.setFieldError('phone', phoneValidation.error || '');
        return;
      }
    } else if (currentStep === 4) {
      if (!form.values.agreeToTerms) {
        form.setFieldError('agreeToTerms', 'You must agree to the terms');
        return;
      }

      // Submit registration
      form.setIsSubmitting(true);
      try {
        const result = await register({
          email: form.values.email,
          password: form.values.password,
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          role: selectedRole,
          phone: form.values.phone,
          company: form.values.company,
          agreeToTerms: form.values.agreeToTerms,
        });

        if (result.error) {
          setApiError(result.error);
        } else {
          router.push('/auth/verify-email');
        }
      } catch (error) {
        setApiError('An unexpected error occurred. Please try again.');
      } finally {
        form.setIsSubmitting(false);
      }
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setApiError(null);
    }
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Join the Zero Knowledge Audit Marketplace">
      <AuthCard title="Sign Up" description="Complete your registration">
        <ProgressStepper steps={steps} currentStep={currentStep} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="space-y-4"
        >
          {apiError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          {currentStep === 0 && (
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
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.values.password}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.password && !!form.errors.password}
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
                />
                {form.touched.confirmPassword && form.errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">{form.errors.confirmPassword}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={form.values.firstName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.firstName && !!form.errors.firstName}
                  icon={<User className="w-4 h-4" />}
                />
                {form.touched.firstName && form.errors.firstName && (
                  <p className="text-xs text-destructive mt-1">{form.errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.values.lastName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.lastName && !!form.errors.lastName}
                  icon={<User className="w-4 h-4" />}
                />
                {form.touched.lastName && form.errors.lastName && (
                  <p className="text-xs text-destructive mt-1">{form.errors.lastName}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone Number (Optional)</label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={form.values.phone}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.phone && !!form.errors.phone}
                  icon={<Phone className="w-4 h-4" />}
                />
                {form.touched.phone && form.errors.phone && (
                  <p className="text-xs text-destructive mt-1">{form.errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Company Name (Optional)</label>
                <Input
                  name="company"
                  type="text"
                  placeholder="Your Company"
                  value={form.values.company}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  icon={<Building2 className="w-4 h-4" />}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-card/50 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={form.values.agreeToTerms}
                    onCheckedChange={(checked) =>
                      form.setValues({
                        ...form.values,
                        agreeToTerms: checked === true,
                      })
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
                    I agree to the{' '}
                    <Link href="#" className="text-cyan hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className="text-cyan hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {form.errors.agreeToTerms && (
                  <p className="text-xs text-destructive">{form.errors.agreeToTerms}</p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                By creating an account, you acknowledge that you have read and agree to the terms and conditions.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="cyan"
              className="flex-1"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting
                ? 'Creating...'
                : currentStep === steps.length - 1
                  ? 'Create Account'
                  : 'Next'}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-cyan hover:text-cyan/80 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
