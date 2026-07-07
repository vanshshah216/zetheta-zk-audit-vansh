'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ds/input'

interface CommandItem {
  id: string
  title: string
  description?: string
  category: string
  action: () => void
  icon?: React.ReactNode
}

const commands: CommandItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Go to your dashboard',
    category: 'Navigation',
    action: () => window.location.href = '/dashboard',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Open settings page',
    category: 'Navigation',
    action: () => window.location.href = '/settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    description: 'Open help documentation',
    category: 'Resources',
    action: () => window.location.href = '/help',
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<CommandItem[]>(commands)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    const query = search.toLowerCase()
    setFiltered(
      commands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(query) ||
          cmd.description?.toLowerCase().includes(query)
      )
    )
  }, [search])

  const handleSelect = (command: CommandItem) => {
    command.action()
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-1/2 left-1/2 w-full max-w-2xl z-50 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <Input
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-0 bg-transparent focus-visible:ring-0 p-0 placeholder-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filtered.length > 0 ? (
                  <div className="p-2">
                    {filtered.map((cmd, idx) => (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd)}
                        className="w-full px-3 py-2 rounded-md text-left hover:bg-muted transition-colors mb-1 last:mb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm text-foreground">{cmd.title}</div>
                            {cmd.description && (
                              <div className="text-xs text-muted-foreground">{cmd.description}</div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No commands found.</div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground text-center bg-muted/50">
                Press <kbd className="px-2 py-0.5 bg-card border border-border rounded text-foreground mx-1">Esc</kbd> to
                close
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcut Indicator */}
      <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-card border border-border rounded px-2 py-1">
        <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-foreground mr-1">Cmd</kbd>+
        <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-foreground ml-1">K</kbd>
      </div>
    </>
  )
}
