'use client'

import Link from 'next/link'
import { Code2, Share2, Users, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Security', href: '/#security' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Documentation', href: '/#docs' },
  ],
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Careers', href: '/#careers' },
    { label: 'Contact', href: '/#contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/#privacy' },
    { label: 'Terms', href: '/#terms' },
    { label: 'Cookie Policy', href: '/#cookies' },
    { label: 'Compliance', href: '/#compliance' },
  ],
  Application: [
    { label: 'Company Portal', href: '/company/dashboard' },
    { label: 'Auditor Portal', href: '/auditor/dashboard' },
    { label: 'Verifier Portal', href: '/verifier/dashboard' },
    { label: 'Status Page', href: '/#status' },
  ],
}

export function FooterSection() {
  return (
    <footer className="relative border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan to-blue rounded-lg" />
              <span className="font-bold">Zero Knowledge</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Decentralized smart contract auditing for Web3.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href="#twitter"
                className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#github"
                className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="#community"
                className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Community"
              >
                <Users className="w-4 h-4" />
              </a>
              <a
                href="#email"
                className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Zero Knowledge Audit. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
