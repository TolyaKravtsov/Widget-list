import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

// Mock authentication - accepts any credentials
const mockLogin = async (username: string, _password: string): Promise<{ token: string; user: User }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // Mock token generation
  const token = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  return {
    token,
    user: { username },
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (username: string, password: string) => {
        try {
          if (!username.trim() || !password.trim()) {
            return false
          }
          
          const { token, user } = await mockLogin(username, password)
          
          set({
            isAuthenticated: true,
            user,
            token,
          })
          
          return true
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        })
      },
      checkAuth: () => {
        const state = useAuthStore.getState()
        set({ isAuthenticated: !!(state.token && state.user) })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
