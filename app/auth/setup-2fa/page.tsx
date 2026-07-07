'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCard } from '@/components/auth/auth-card';
import { OTPInput } from '@/components/auth/otp-input';
import { Button } from '@/components/ds/button';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { Badge } from '@/components/ds/badge';
import { useFormState } from '@/lib/auth-hooks';
import { setupTwoFactor, verifyTwoFactor, enableTwoFactor } from '@/lib/auth-api';
import { AlertTriangle, Shield, Copy, Check } from 'lucide-react';

export default function Setup2FAPage() {
  const router = useRouter();
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const initSetup = async () => {
      setIsLoading(true);
      try {
        const result = await setupTwoFactor('user-1');
        if (result.secret && result.qrCode) {
          setSecret(result.secret);
          setQrCode(result.qrCode);
        }
      } catch (error) {
        setApiError('Failed to setup 2FA');
      } finally {
        setIsLoading(false);
      }
    };

    initSetup();
  }, []);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setApiError(null);
    setIsLoading(true);

    try {
      const result = await verifyTwoFactor({ code });

      if (result.error) {
        setApiError(result.error);
      } else {
        // Enable 2FA for user
        await enableTwoFactor('user-1');
        setStep('complete');
      }
    } catch (error) {
      setApiError('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'complete') {
    return (
      <AuthLayout title="2FA Enabled" subtitle="Your account is now more secure">
        <AuthCard title="Setup Complete" description="Two-factor authentication is enabled">
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/20 mb-4">
                <Shield className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="text-lg font-semibold mb-2">You're All Set!</h3>
              <p className="text-sm text-muted-foreground">
                Two-factor authentication is now enabled on your account
              </p>
            </div>

            <div className="bg-card/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">Keep your authenticator app safe</p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex gap-2">
                  <span className="text-cyan">•</span>
                  <span>Back up your recovery codes in a secure location</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">•</span>
                  <span>You'll need your authenticator app to sign in</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">•</span>
                  <span>Store recovery codes if you lose access to your app</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => router.push('/auth/wallet-connect')}
              variant="cyan"
              className="w-full"
            >
              Next: Connect Wallet
            </Button>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set Up Two-Factor Authentication" subtitle="Add extra security to your account">
      <AuthCard title="2FA Setup" description="Scan the QR code or enter the key manually">
        <div className="space-y-6">
          {apiError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          {step === 'setup' && (
            <>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator, then scan this QR code:
                </p>

                <div className="flex justify-center p-6 bg-card rounded-lg">
                  {qrCode ? (
                    <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                  ) : (
                    <div className="w-48 h-48 bg-border rounded-lg animate-pulse" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Can't scan? Enter this key manually:</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-card p-3 rounded-lg font-mono text-sm break-all">
                      {secret}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCopySecret}
                      className="flex-shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep('verify')}
                variant="cyan"
                className="w-full"
              >
                I've Scanned the Code
              </Button>
            </>
          )}

          {step === 'verify' && (
            <>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app to confirm setup:
                </p>

                <div className="py-4">
                  <OTPInput
                    length={6}
                    onChange={(fullCode) => setCode(fullCode)}
                    onComplete={(fullCode) => {
                      setCode(fullCode);
                      setTimeout(handleVerify, 300);
                    }}
                  />
                </div>
              </div>

              <Button
                onClick={handleVerify}
                disabled={code.length !== 6 || isLoading}
                variant="cyan"
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify & Enable 2FA'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep('setup')}
                disabled={isLoading}
              >
                Back
              </Button>
            </>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
