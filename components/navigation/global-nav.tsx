'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ds/button'
import { Logo } from '@/components/branding/logo'
import {
  LogOut,
  User,
  Settings,
  Loader2,
} from 'lucide-react'

export function GlobalNav() {
  const router = useRouter()
  const {
    isAuthenticated,
    user,
  } = useAuth()

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!isAuthenticated || !user) {
    return null
  }

  const roleRoutes: Record<
    string,
    {
      dashboard: string
      profile: string
      settings: string
    }
  > = {
    auditor: {
      dashboard: '/auditor/dashboard',
      profile: '/auditor/profile',
      settings: '/auditor/settings',
    },

    audited: {
      dashboard: '/company/dashboard',
      profile: '/company/profile',
      settings: '/company/settings',
    },

    investor: {
      dashboard: '/verifier/dashboard',
      profile: '/verifier/profile',
      settings: '/verifier/settings',
    },
  }

  const routes = roleRoutes[user.role] ?? {
    dashboard: '/',
    profile: '/',
    settings: '/',
  }

  const handleLogout = () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    router.push('/auth/logout')
  }

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link
            href={routes.dashboard}
            className="flex items-center gap-2"
          >
            <Logo />

            <span className="font-bold text-lg text-foreground hidden sm:inline">
              ZKA
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.firstName} {user.lastName}
            </span>

            <div className="flex items-center gap-2">

              <Link href={routes.profile}>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open profile"
                >
                  <User className="w-4 h-4" />
                  <span className="sr-only">
                    Profile
                  </span>
                </Button>
              </Link>

              <Link href={routes.settings}>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open settings"
                >
                  <Settings className="w-4 h-4" />
                  <span className="sr-only">
                    Settings
                  </span>
                </Button>
              </Link>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Logout"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}

                <span className="sr-only">
                  Logout
                </span>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}