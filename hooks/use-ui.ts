'use client'

import { useUIStore } from '@/stores/ui-store'
import { useEffect } from 'react'

export function useUI() {
  const { sidebarOpen, theme, isMobile, loading, toggleSidebar, setSidebarOpen, setTheme, setIsMobile, setLoading } =
    useUIStore()

  // Detect mobile on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsMobile])

  // Sync theme with localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [setTheme])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return {
    sidebarOpen,
    theme,
    isMobile,
    loading,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setLoading,
  }
}
