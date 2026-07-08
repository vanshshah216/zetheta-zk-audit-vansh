'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Lock,
  Award,
  CreditCard,
  Bell,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarNav, SidebarNavItem, SidebarFooter } from '@/components/ds/sidebar'
import { Navbar, NavbarActions } from '@/components/ds/navbar'
import { Button } from '@/components/ds/button'

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
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
      href: '/company/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Request Audit',
      href: '/company/request-audit',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'My Audits',
      href: '/company/my-audits',
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      label: 'Proof Vault',
      href: '/company/proof-vault',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: 'Certificates',
      href: '/company/certificates',
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: 'Payments',
      href: '/company/payments',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: 'Notifications',
      href: '/company/notifications',
      icon: <Bell className="w-5 h-5" />,
    },
    {
      label: 'Organization',
      href: '/company/profile',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/company/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar collapsed={!sidebarOpen} className="max-md:fixed max-md:z-40 max-md:h-screen">
        <SidebarHeader>
          <Link href="/company/dashboard" className="flex items-center gap-2 text-lg font-bold text-gradient">
            {sidebarOpen && 'AuditChain'}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1 hover:bg-card/50 rounded"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav>
            {navigationItems.map((item) => (
              <SidebarNavItem key={item.href} href={item.href} active={isActive(item.href)} icon={item.icon}>
                {sidebarOpen && item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-950/20"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && 'Logout'}
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden max-md:ml-0">
        {/* Top Navbar */}
        <Navbar sticky className="max-md:flex max-md:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-card/50 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold hidden md:block">
              {navigationItems.find((item) => isActive(item.href))?.label}
            </h1>
          </div>

          <NavbarActions>
            <button className="relative p-2 hover:bg-card/50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1 hover:bg-card/50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan to-blue rounded-lg"></div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-lg border border-border/50 shadow-lg z-50 p-2">
                  <Link href="/company/profile" className="block px-4 py-2 hover:bg-card/50 rounded text-sm">
                    Profile
                  </Link>
                  <Link href="/company/settings" className="block px-4 py-2 hover:bg-card/50 rounded text-sm">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-950/30 rounded text-sm text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </NavbarActions>
        </Navbar>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
