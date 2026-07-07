'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  CheckCircle,
  Eye,
  Award,
  Database,
  History,
  FileText,
  BarChart3,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarNav, SidebarNavItem, SidebarFooter } from '@/components/ds/sidebar'
import { Navbar, NavbarActions } from '@/components/ds/navbar'
import { Button } from '@/components/ds/button'

export default function VerifierLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push('/auth/logout')
  }

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/verifier/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Verify Proof',
      href: '/verifier/verify-proof',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      label: 'Proof Explorer',
      href: '/verifier/proofs',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      label: 'Certificates',
      href: '/verifier/certificates',
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: 'Blockchain',
      href: '/verifier/blockchain',
      icon: <Database className="w-5 h-5" />,
    },
    {
      label: 'History',
      href: '/verifier/history',
      icon: <History className="w-5 h-5" />,
    },
    {
      label: 'Reports',
      href: '/verifier/reports',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Analytics',
      href: '/verifier/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: 'Profile',
      href: '/verifier/profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/verifier/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white hidden sm:inline">AuditChain</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav>
            {navigationItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                active={pathname.includes(item.href)}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <Navbar>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-surface rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <NavbarActions>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  AJ
                </div>
                <span className="hidden sm:inline text-sm">Alice Johnson</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg border border-cyan-500/20 shadow-lg p-2 z-50">
                  <Link
                    href="/verifier/profile"
                    className="block px-4 py-2 hover:bg-cyan-500/10 rounded text-sm"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/verifier/settings"
                    className="block px-4 py-2 hover:bg-cyan-500/10 rounded text-sm"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-500/10 rounded text-sm text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </NavbarActions>
        </Navbar>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
