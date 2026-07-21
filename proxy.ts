import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME, parseSessionToken } from '@/lib/auth-session'

const PROTECTED_PREFIXES = ['/company', '/auditor', '/verifier', '/security'] as const

const ROLE_PREFIX: Record<string, string> = {
  audited: '/company',
  auditor: '/auditor',
  investor: '/verifier',
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function getRequiredRole(pathname: string): string | null {
  if (pathname.startsWith('/company')) return 'audited'
  if (pathname.startsWith('/auditor')) return 'auditor'
  if (pathname.startsWith('/verifier')) return 'investor'
  if (pathname.startsWith('/security')) return 'auditor'
  return null
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const session = token ? await parseSessionToken(token) : null

  if (!session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const requiredRole = getRequiredRole(pathname)
  if (requiredRole && session.role !== requiredRole) {
    const correctPrefix = ROLE_PREFIX[session.role]
    if (correctPrefix) {
      return NextResponse.redirect(new URL(`${correctPrefix}/dashboard`, request.url))
    }
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/company/:path*', '/auditor/:path*', '/verifier/:path*', '/security/:path*'],
}
