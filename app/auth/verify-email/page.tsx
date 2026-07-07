'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OTPInput } from '@/components/auth/otp-input';
import { VerificationIllustration } from '@/components/auth/verification-illustration';
import { AuthCardEnhanced } from '@/components/auth/auth-card-enhanced';
import { Button } from '@/components/ds/button';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { Badge } from '@/components/ds/badge';
import { useCountdown } from '@/lib/auth-hooks';
import { verifyEmail } from '@/lib/auth-api';
import { AlertTriangle, Mail, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/ds/animations';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { seconds, isActive: canResend, reset: resetCountdown } = useCountdown(60);

  const pendingEmail = typeof window !== 'undefined' ? localStorage.getItem('pendingEmailVerification') : '';

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setApiError(null);
    setIsVerifying(true);

    try {
      const result = await verifyEmail(pendingEmail || '', code);

      if (result.error) {
        setApiError(result.error);
      } else {
        // Clear pending email
        localStorage.removeItem('pendingEmailVerification');
        // Redirect to login
        router.push('/auth/login');
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    resetCountdown();
    // Mock resend
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald" />
            <span className="text-sm font-semibold text-emerald">VERIFY EMAIL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple mb-2">
            Verify Your Email
          </h1>
          <p className="text-lg text-muted-foreground">
            We&apos;ve sent a 6-digit code to {pendingEmail}
          </p>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <FadeIn delay={0.1} className="hidden md:flex flex-col items-center justify-center">
            <VerificationIllustration />
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Real-time Verification</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your email will be instantly verified once you enter the correct code
              </p>
            </div>
          </FadeIn>

          {/* Right side - Form */}
          <FadeIn delay={0.2}>
            <AuthCardEnhanced
              title="Email Verification"
              description={`Enter the code sent to ${pendingEmail}`}
              showSecurityBadges={false}
            >
              <div className="space-y-6">
                {apiError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-4 block text-center">
                    Verification Code
                  </label>
                  <OTPInput
                    length={6}
                    onChange={(fullCode) => setCode(fullCode)}
                    onComplete={(fullCode) => {
                      setCode(fullCode);
                      // Auto-submit when filled
                      setTimeout(handleVerify, 300);
                    }}
                  />
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Check your email for the 6-digit verification code
                  </p>
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={code.length !== 6 || isVerifying}
                  variant="cyan"
                  className="w-full h-11"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Email'}
                </Button>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">didn&apos;t receive?</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={!canResend}
                    className="text-cyan hover:text-cyan/80"
                  >
                    {canResend ? 'Resend Code' : `Resend in ${seconds}s`}
                  </Button>
                </div>

                <div className="bg-card/50 p-4 rounded-lg flex gap-3 border border-border/50">
                  <Mail className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Check your spam folder or{' '}
                    <Link href="/auth/login" className="text-cyan hover:underline font-semibold">
                      try a different email
                    </Link>
                  </p>
                </div>
              </div>
            </AuthCardEnhanced>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
