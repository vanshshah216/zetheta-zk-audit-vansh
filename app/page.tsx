'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { NavbarSection } from '@/components/sections/navbar-section'
import { HeroSection } from '@/components/sections/hero-section'
import { TrustedSection } from '@/components/sections/trusted-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { MarketplaceSection } from '@/components/sections/marketplace-section'
import { SecuritySection } from '@/components/sections/security-section'
import { StatsSection } from '@/components/sections/stats-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { FooterSection } from '@/components/sections/footer-section'

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardMap: Record<string, string> = {
        auditor: '/auditor/dashboard',
        audited: '/company/dashboard',
        investor: '/verifier/dashboard',
      }
      router.replace(dashboardMap[user.role] || '/auditor/dashboard')
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavbarSection />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Trusted By Section */}
        <TrustedSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Marketplace Section */}
        <MarketplaceSection />

        {/* Security Section */}
        <SecuritySection />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
