'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Badge } from '@/components/ds/badge'
import { Lock, Shield } from 'lucide-react'

interface AuthCardEnhancedProps {
  title: string
  description?: string
  children: React.ReactNode
  showSecurityBadges?: boolean
  variant?: 'default' | 'glass' | 'neon'
}

export function AuthCardEnhanced({
  title,
  description,
  children,
  showSecurityBadges = false,
  variant = 'glass',
}: AuthCardEnhancedProps) {
  return (
    <Card variant={variant} className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          <Lock className="w-5 h-5 text-cyan ml-2 flex-shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {children}

        {showSecurityBadges && (
          <div className="pt-4 border-t border-border/50 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" className="text-xs">
                256-bit SSL
              </Badge>
              <Badge variant="success" className="text-xs">
                SOC 2 Certified
              </Badge>
              <Badge variant="cyan" className="text-xs">
                Zero-Knowledge
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
