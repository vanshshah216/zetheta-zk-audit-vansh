'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsed, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'glass h-screen border-r border-border/50 backdrop-blur-xl transition-all duration-300 overflow-y-auto',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
      {...props}
    />
  )
)
Sidebar.displayName = 'Sidebar'

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-b border-border/50 px-4 py-4 flex items-center justify-between', className)}
      {...props}
    />
  )
)
SidebarHeader.displayName = 'SidebarHeader'

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 px-2 py-4', className)} {...props} />
  )
)
SidebarContent.displayName = 'SidebarContent'

const SidebarNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn('space-y-1', className)} {...props} />
  )
)
SidebarNav.displayName = 'SidebarNav'

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean
    icon?: React.ReactNode
  }
>(({ className, active, icon, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
      active
        ? 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
        : 'text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent'
    )}
    {...props}
  >
    {icon && <div className="flex-shrink-0">{icon}</div>}
    <span>{props.children}</span>
  </a>
))
SidebarNavItem.displayName = 'SidebarNavItem'

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-t border-border/50 px-4 py-4 space-y-2', className)}
      {...props}
    />
  )
)
SidebarFooter.displayName = 'SidebarFooter'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
}
