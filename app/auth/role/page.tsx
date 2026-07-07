'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RoleCard } from '@/components/auth/role-card';
import { Button } from '@/components/ds/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card';
import { Badge } from '@/components/ds/badge';
import { Shield, Zap, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ds/animations';
import type { UserRole } from '@/lib/auth-types';

const roles: Array<{ id: UserRole; icon: typeof Shield; title: string; description: string }> = [
  {
    id: 'auditor',
    icon: Shield,
    title: 'Security Auditor',
    description: 'Conduct zero-knowledge audits and build your reputation',
  },
  {
    id: 'audited',
    icon: Zap,
    title: 'Audited Project',
    description: 'Get your smart contracts audited by top security experts',
  },
  {
    id: 'investor',
    icon: TrendingUp,
    title: 'Investor',
    description: 'Invest in verified security audits and earn returns',
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    // Store selected role in localStorage for registration
    localStorage.setItem('selectedRole', selectedRole);
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push('/auth/register');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-cyan" />
            <span className="text-sm font-semibold text-cyan">GET STARTED</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple mb-2">
            Choose Your Role
          </h1>
          <p className="text-lg text-muted-foreground">
            Pick how you want to participate in the Zero Knowledge Audit Marketplace
          </p>
        </FadeIn>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <StaggerContainer>
            {roles.map((role, idx) => (
              <StaggerItem key={role.id}>
                <RoleCard
                  icon={role.icon}
                  title={role.title}
                  description={role.description}
                  selected={selectedRole === role.id}
                  onClick={() => setSelectedRole(role.id)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Features */}
        <FadeIn delay={0.3} className="mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle2, label: 'Verified Identity' },
              { icon: Shield, label: 'Enterprise Security' },
              { icon: Zap, label: 'Instant Verification' },
              { icon: TrendingUp, label: 'Growth Potential' },
            ].map((feature, idx) => (
              <div key={idx} className="glass rounded-lg p-4 text-center">
                <feature.icon className="w-6 h-6 text-cyan mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{feature.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Action */}
        <FadeIn delay={0.4} className="text-center space-y-6">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            variant="cyan"
            size="lg"
            className="min-w-64"
          >
            {isLoading ? 'Loading...' : 'Continue to Registration'}
          </Button>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="success">SOC 2 Certified</Badge>
            <Badge variant="success">ISO 27001</Badge>
            <Badge variant="cyan">GDPR Compliant</Badge>
            <Badge variant="emerald">Bug Bounty Insured</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-cyan hover:text-cyan/80 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
