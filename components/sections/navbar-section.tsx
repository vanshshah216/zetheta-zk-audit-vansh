'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollTransparency, useToggle } from '@/lib/hooks'
import { Button } from '@/components/ds/button'
import { Menu, X } from 'lucide-react'

export function NavbarSection() {
  const isTransparent = useScrollTransparency(50)
  const [mobileMenuOpen, toggleMobileMenu] = useToggle(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-background/0 backdrop-blur-0'
          : 'bg-background/80 backdrop-blur-md border-b border-border/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan to-blue rounded-lg" />
            <span className="hidden sm:inline">Zero Knowledge</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#marketplace"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="#security"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </Link>
            <Link
              href="#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="cyan" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => toggleMobileMenu()}
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border/30">
            <Link
              href="#features"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => toggleMobileMenu()}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => toggleMobileMenu()}
            >
              How It Works
            </Link>
            <Link
              href="#marketplace"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => toggleMobileMenu()}
            >
              Marketplace
            </Link>
            <Link
              href="#security"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => toggleMobileMenu()}
            >
              Security
            </Link>
            <Link
              href="#faq"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => toggleMobileMenu()}
            >
              FAQ
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" className="flex-1">
                <Button variant="cyan" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
