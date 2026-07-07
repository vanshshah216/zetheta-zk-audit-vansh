'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, sticky, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'glass h-16 px-6 flex items-center justify-between border-b border-border/50 backdrop-blur-xl',
        sticky && 'sticky top-0 z-40',
        className
      )}
      {...props}
    />
  )
)
Navbar.displayName = 'Navbar'

const NavbarBrand = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  )
)
NavbarBrand.displayName = 'NavbarBrand'

const NavbarLogo = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue', className)}
      {...props}
    />
  )
)
NavbarLogo.displayName = 'NavbarLogo'

const NavbarNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-1', className)} {...props} />
  )
)
NavbarNav.displayName = 'NavbarNav'

const NavbarItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent hover:text-glow-cyan',
        className
      )}
      {...props}
    />
  )
)
NavbarItem.displayName = 'NavbarItem'

const NavbarActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  )
)
NavbarActions.displayName = 'NavbarActions'

export { Navbar, NavbarBrand, NavbarLogo, NavbarNav, NavbarItem, NavbarActions }
