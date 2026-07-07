'use client'

import { ReactNode } from 'react'
import { ErrorBoundary } from '@/providers/error-boundary'
import { NotificationsDisplay } from '@/components/notifications/notifications-display'
import { CommandPalette } from '@/components/search/command-palette'

interface RootProviderProps {
  children: ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ErrorBoundary>
      {children}
      <NotificationsDisplay />
      <CommandPalette />
    </ErrorBoundary>
  )
}
