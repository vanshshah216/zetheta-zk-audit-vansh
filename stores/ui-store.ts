import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  isMobile: boolean
  loading: boolean
  
  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
  setIsMobile: (isMobile: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  isMobile: false,
  loading: false,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTheme: (theme) => set({ theme }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setLoading: (loading) => set({ loading }),
}))
