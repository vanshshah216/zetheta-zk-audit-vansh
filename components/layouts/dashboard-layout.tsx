'use client'

import { ReactNode } from 'react'
import { GlobalNav } from '@/components/navigation/global-nav'
import { useAuth } from '@/hooks/use-auth'

interface DashboardLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      <div className="flex">
        {sidebar && (
          <aside className="hidden md:block w-64 bg-card border-r border-border">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
