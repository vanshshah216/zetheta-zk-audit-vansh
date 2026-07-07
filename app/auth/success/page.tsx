'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SuccessIllustration } from '@/components/auth/success-illustration';
import { Button } from '@/components/ds/button';
import { Badge } from '@/components/ds/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ds/animations';
import { getCurrentUser } from '@/lib/auth-api';
import { Zap, Shield, CheckCircle2, Rocket, Lock, User } from 'lucide-react';
import type { AuthUser } from '@/lib/auth-types';

export default function SuccessPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Auto-redirect after 5 seconds based on role
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const redirectPath = {
            auditor: '/auditor/dashboard',
            audited: '/company/dashboard',
            investor: '/verifier/dashboard',
          }[currentUser?.role || 'auditor'];
          router.push(redirectPath);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const roleDetails = {
    auditor: {
      title: 'Security Auditor',
      description: 'Start conducting zero-knowledge audits and build your reputation',
      icon: Shield,
      color: 'cyan',
    },
    audited: {
      title: 'Audited Project',
      description: 'Get your smart contracts audited by top security experts',
      icon: Zap,
      color: 'blue',
    },
    investor: {
      title: 'Investor',
      description: 'Invest in verified security audits and earn returns',
      icon: Shield,
      color: 'emerald',
    },
  };

  const details = user ? roleDetails[user.role] : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald" />
            <span className="text-sm font-semibold text-emerald">ACCOUNT CREATED</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple mb-2">
            Welcome to Zero Knowledge!
          </h1>
          <p className="text-lg text-muted-foreground">Your account is ready to use</p>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <FadeIn delay={0.1} className="hidden md:flex flex-col items-center justify-center">
            <SuccessIllustration />
            <div className="mt-8 text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Account Setup Complete</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your Zero Knowledge Audit account is fully configured and ready to go
              </p>
            </div>
          </FadeIn>

          {/* Right side - Info */}
          <FadeIn delay={0.2}>
            <StaggerContainer className="space-y-6">
              {/* User Info Card */}
              {user && (
                <StaggerItem>
                  <Card variant="glass">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-cyan/20">
                          <User className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Account Information</CardTitle>
                          <CardDescription>Your verified credentials</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Email</span>
                        <span className="text-sm font-semibold">{user.email}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Name</span>
                        <span className="text-sm font-semibold">{user.firstName} {user.lastName}</span>
                      </div>
                      {user.company && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Company</span>
                          <span className="text-sm font-semibold">{user.company}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
              )}

              {/* Role Card */}
              {details && (
                <StaggerItem>
                  <Card variant="neon">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-blue/20">
                          <Rocket className="w-5 h-5 text-blue" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{details.title}</CardTitle>
                          <CardDescription>{details.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              )}

              {/* Security Status */}
              <StaggerItem>
                <Card variant="glass">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-emerald/20">
                        <Lock className="w-5 h-5 text-emerald" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Security Status</CardTitle>
                        <CardDescription>Your account protection level</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Email Verification</span>
                      <Badge variant="success">Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Two-Factor Auth</span>
                      <Badge variant={user?.twoFactorEnabled ? 'success' : 'warning'}>
                        {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Wallet</span>
                      <Badge variant={user?.walletAddress ? 'success' : 'default'}>
                        {user?.walletAddress ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>

              {/* Next Steps */}
              <StaggerItem>
                <Card variant="glass" className="border-cyan/50 bg-cyan/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        'Complete your profile for better visibility',
                        'Set up additional security measures',
                        'Explore the marketplace and opportunities',
                      ].map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="text-cyan font-bold flex-shrink-0">{idx + 1}</span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>

              {/* CTA */}
              <StaggerItem>
                <Button
                  onClick={() => {
                    const redirectPath = {
                      auditor: '/auditor/dashboard',
                      audited: '/company/dashboard',
                      investor: '/verifier/dashboard',
                    }[user?.role || 'auditor'];
                    router.push(redirectPath);
                  }}
                  variant="cyan"
                  size="lg"
                  className="w-full h-12"
                >
                  Go to Dashboard
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Redirecting automatically in {countdown}s
                </p>
              </StaggerItem>
            </StaggerContainer>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
