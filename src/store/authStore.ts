import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (username: string, password: string) => {
        if (!username.trim() || !password.trim()) {
          return false
        }
        
        const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        set({
          isAuthenticated: true,
          user: { username },
          token,
        })
        
        return true
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
