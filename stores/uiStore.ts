import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UIState {
  isMobileMenuOpen: boolean;
  isUserMenuOpen: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark' | 'system';
  currentLanguage: string;
  notifications: {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }[];
  
  // Actions
  toggleMobileMenu: () => void;
  toggleUserMenu: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    // Initial state
    isMobileMenuOpen: false,
    isUserMenuOpen: false,
    activeModal: null,
    theme: 'system',
    currentLanguage: 'en',
    notifications: [],
    
    // Actions
    toggleMobileMenu: () => {
      set(state => {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
      });
    },
    
    toggleUserMenu: () => {
      set(state => {
        state.isUserMenuOpen = !state.isUserMenuOpen;
      });
    },
    
    openModal: (modalId) => {
      set(state => {
        state.activeModal = modalId;
      });
    },
    
    closeModal: () => {
      set(state => {
        state.activeModal = null;
      });
    },
    
    setTheme: (theme) => {
      set(state => {
        state.theme = theme;
      });
    },
    
    setLanguage: (language) => {
      set(state => {
        state.currentLanguage = language;
      });
    },
    
    addNotification: (type, message) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      set(state => {
        state.notifications.push({ id, type, message });
      });
      
      return id;
    },
    
    removeNotification: (id) => {
      set(state => {
        state.notifications = state.notifications.filter(notification => notification.id !== id);
      });
    },
    
    clearNotifications: () => {
      set(state => {
        state.notifications = [];
      });
    }
  }))
);