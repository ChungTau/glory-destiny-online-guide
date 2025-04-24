import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isSidebarOpen: boolean;
  isMinimal: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (open: boolean) => void;
  setIsMinimal: (minimal: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: typeof window !== 'undefined' && window.innerWidth >= 768,
      isMinimal: false,
      toggleSidebar: () =>
        set((state) => {
          if (window.innerWidth >= 768) {
            return { isMinimal: !state.isMinimal };
          }
          return { isSidebarOpen: !state.isSidebarOpen };
        }),
      setIsSidebarOpen: (open) => set({ isSidebarOpen: open }),
      setIsMinimal: (minimal) => set({ isMinimal: minimal }),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({
        isMinimal: state.isMinimal,
        isSidebarOpen: window.innerWidth < 768 ? state.isSidebarOpen : true,
      }),
    }
  )
);
