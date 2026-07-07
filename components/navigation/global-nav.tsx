'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ds/button'
import { Logo } from '@/components/branding/logo'
import { LogOut, User, Settings } from 'lucide-react'

export function GlobalNav() {
  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  const getDashboardLink = () => {
    const roleMap: Record<string, string> = {
      auditor: '/auditor/dashboard',
      audited: '/company/dashboard',
      investor: '/verifier/dashboard',
    }
    return roleMap[user.role] || '/dashboard'
  }

  const dashboardLink = getDashboardLink()

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={dashboardLink} className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-lg text-foreground hidden sm:inline">ZKA</span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
