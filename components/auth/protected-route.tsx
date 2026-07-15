'use client'

import { useAuthStore } from '@/stores/auth-store'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

const ROLE_DASHBOARDS: Record<string, string> = {
  auditor: '/auditor/dashboard',
  audited: '/company/dashboard',
  investor: '/verifier/dashboard',
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  // Read directly from the Zustand store to avoid hook re-render races
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  const pathname = usePathname()
  const redirectedRef = useRef(false)

  useEffect(() => {
    // Guard: only redirect once per mount to prevent loops
    if (redirectedRef.current) return
    if (isLoading) return

    if (!isAuthenticated || !user) {
      redirectedRef.current = true
      router.replace('/auth/login')
      return
    }

    if (requiredRole && user.role !== requiredRole) {
      redirectedRef.current = true
      // Redirect the user to their correct dashboard, not to /auth/role
      const correctDashboard = ROLE_DASHBOARDS[user.role] ?? '/auth/login'
      // Avoid redirecting to the current page (would cause an infinite loop)
      if (pathname !== correctDashboard) {
        router.replace(correctDashboard)
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, pathname])

  if (isLoading) {
    return null
  }

  // While not authenticated, render nothing (redirect is in flight)
  if (!isAuthenticated || !user) {
    return null
  }

  // While role is wrong, render nothing
  if (requiredRole && user.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
