'use client'

import { trustedCompanies } from '@/lib/mock-data'
import { FadeIn } from '@/components/ds/animations'

export function TrustedSection() {
  return (
    <section className="py-16 sm:py-20 relative border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-sm font-semibold text-muted-foreground mb-8">
            TRUSTED BY LEADING PROTOCOLS
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {trustedCompanies.map((company) => (
            <FadeIn key={company.name}>
              <div className="group p-4 hover:bg-card/50 rounded-lg transition-all duration-300">
                <div className="text-muted-foreground group-hover:text-foreground transition-colors font-semibold text-sm">
                  {company.name}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
