'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Shield,
  LayoutDashboard,
  FileText,
  Lock,
  Key,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarNav, SidebarNavItem, SidebarFooter } from '@/components/ds/sidebar'
import { Navbar, NavbarActions } from '@/components/ds/navbar'
import { Button } from '@/components/ds/button'

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
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
      href: '/security/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Audit Logs',
      href: '/security/audit-logs',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Access Control',
      href: '/security/access-control',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      label: 'Sessions',
      href: '/security/sessions',
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      label: 'API Keys',
      href: '/security/api-keys',
      icon: <Key className="w-5 h-5" />,
    },
    {
      label: 'Devices',
      href: '/security/devices',
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      label: 'Threat Monitor',
      href: '/security/threat-monitor',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      label: 'Compliance',
      href: '/security/compliance',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      label: 'Incidents',
      href: '/security/incident-response',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      label: 'System Logs',
      href: '/security/system-logs',
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar className="hidden lg:flex border-r border-border">
        <SidebarHeader className="border-b border-border px-4 py-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan" />
            <h1 className="text-sm font-bold text-foreground">Security Center</h1>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav>
            {navigationItems.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                active={pathname === item.href}
                icon={item.icon}
              >
                {item.label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter className="border-t border-border px-4 py-4">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full justify-start gap-2" 
            size="sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar>
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan" />
              Security Center
            </h1>
          </div>

          <NavbarActions className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan to-blue rounded-full flex items-center justify-center text-xs font-bold">
                  SA
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <p className="text-xs font-semibold">Security Admin</p>
                    <p className="text-xs text-muted-foreground">admin@security.com</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </NavbarActions>
        </Navbar>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-40">
          <Sidebar className="absolute left-0 top-0 h-full w-64">
            <SidebarHeader className="border-b border-border px-4 py-6">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan" />
                <h1 className="text-sm font-bold">Security Center</h1>
              </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto px-3 py-4">
              <SidebarNav>
                {navigationItems.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    href={item.href}
                    active={pathname === item.href}
                    icon={item.icon}
                  >
                    {item.label}
                  </SidebarNavItem>
                ))}
              </SidebarNav>
            </SidebarContent>
          </Sidebar>
        </div>
      )}
    </div>
  )
}
