'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/auth-layout';
import { AuthCardEnhanced } from '@/components/auth/auth-card-enhanced';
import { OAuthButton } from '@/components/auth/oauth-button';
import { BlockchainVisualization } from '@/components/auth/blockchain-visualization';
import { Button } from '@/components/ds/button';
import { Input } from '@/components/ds/input';
import { Badge } from '@/components/ds/badge';
import { Alert, AlertDescription } from '@/components/ds/alert';
import { useFormState } from '@/lib/auth-hooks';
import { validateEmail } from '@/lib/auth-validation';
import { useAuth } from '@/hooks/use-auth';
import { AlertTriangle, Mail, Lock, Shield } from 'lucide-react';
import { FadeIn } from '@/components/ds/animations';

export default function LoginPage() {
  const router = useRouter();
  const form = useFormState({ email: '', password: '' });
  const [apiError, setApiError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    form.clearErrors();

    // Validate
    const emailValidation = validateEmail(form.values.email);

    if (!emailValidation.valid) {
      form.setFieldError('email', emailValidation.error || '');
      return;
    }

    if (!form.values.password.trim()) {
      form.setFieldError('password', 'Password is required');
      return;
    }

    const user = await login({
      email: form.values.email,
      password: form.values.password,
    });

    if (user) {
      if (user.role === 'audited') {
        router.push('/company/dashboard');
      } else if (user.role === 'auditor') {
        router.push('/auditor/dashboard');
      } else if (user.role === 'investor') {
        router.push('/verifier/dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      setApiError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-cyan" />
            <span className="text-sm font-semibold text-cyan">SECURE LOGIN</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple mb-2">
            Welcome Back
          </h1>
          <p className="text-lg text-muted-foreground">Access your Zero Knowledge Audit account securely</p>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Visualization */}
          <FadeIn delay={0.1} className="hidden md:flex flex-col items-center justify-center">
            <BlockchainVisualization />
            <div className="mt-8 space-y-4 text-center">
              <h3 className="text-xl font-semibold text-foreground">Enterprise-Grade Security</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="success">256-bit SSL</Badge>
                <Badge variant="cyan">Zero-Knowledge</Badge>
                <Badge variant="emerald">SOC 2 Certified</Badge>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Your data is protected with military-grade encryption and zero-knowledge proof technology
              </p>
            </div>
          </FadeIn>

          {/* Right side - Form */}
          <FadeIn delay={0.2}>
            <AuthCardEnhanced 
              title="Sign In" 
              description="Enter your credentials to access your account"
              showSecurityBadges={false}
              variant="glass"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {apiError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <div className="bg-cyan-900/20 border border-cyan-500/20 p-4 rounded-lg text-sm space-y-2 mb-4">
                  <p className="font-semibold text-cyan-400 mb-2 border-b border-cyan-500/20 pb-2">Demo Credentials (Click to fill)</p>
                  <div className="flex justify-between items-center group cursor-pointer" onClick={() => form.setValues({ email: 'company@example.com', password: 'password123' })}>
                    <span className="text-muted-foreground group-hover:text-cyan-300 transition-colors">Company:</span> 
                    <span className="font-mono text-cyan-300 group-hover:text-cyan-100 transition-colors">company@example.com</span>
                  </div>
                  <div className="flex justify-between items-center group cursor-pointer" onClick={() => form.setValues({ email: 'auditor@example.com', password: 'password123' })}>
                    <span className="text-muted-foreground group-hover:text-cyan-300 transition-colors">Auditor:</span> 
                    <span className="font-mono text-cyan-300 group-hover:text-cyan-100 transition-colors">auditor@example.com</span>
                  </div>
                  <div className="flex justify-between items-center group cursor-pointer" onClick={() => form.setValues({ email: 'verifier@example.com', password: 'password123' })}>
                    <span className="text-muted-foreground group-hover:text-cyan-300 transition-colors">Verifier:</span> 
                    <span className="font-mono text-cyan-300 group-hover:text-cyan-100 transition-colors">verifier@example.com</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-cyan-500/10 italic text-center">Password for all accounts is: password123</p>
                </div>

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

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Link href="/auth/forgot-password" className="text-xs text-cyan hover:text-cyan/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={form.touched.password && !!form.errors.password}
                    icon={<Shield className="w-4 h-4" />}
                  />
                  {form.touched.password && form.errors.password && (
                    <p className="text-xs text-destructive mt-1">{form.errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="cyan"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-card text-muted-foreground">or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <OAuthButton provider="google" />
                <OAuthButton provider="github" />
              </div>

              <p className="text-center text-sm text-muted-foreground pt-4">
                Don't have an account?{' '}
                <Link href="/auth/role" className="text-cyan hover:text-cyan/80 font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </AuthCardEnhanced>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
