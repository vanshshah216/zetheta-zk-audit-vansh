import { ReactNode } from 'react';
import { FloatingParticles, FadeIn } from '@/components/ds/animations';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackground?: boolean;
}

export function AuthLayout({ children, title, subtitle, showBackground = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      {showBackground && (
        <>
          <FloatingParticles particleCount={30} />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-blue/5 pointer-events-none" />
        </>
      )}

      {/* Content */}
      <FadeIn className="w-full max-w-md relative z-10">
        {title && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue to-purple mb-2">
              {title}
            </h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {children}
      </FadeIn>
    </div>
  );
}
