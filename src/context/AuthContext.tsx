import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthUser {
  email: string
  nickname: string
  role: string
  token: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('token')
    const nickname = localStorage.getItem('nickname')
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')
    if (token && nickname && email && role) {
      return { token, nickname, email, role }
    }
    return null
  })

  const login = (user: AuthUser) => {
    localStorage.setItem('token', user.token)
    localStorage.setItem('nickname', user.nickname)
    localStorage.setItem('email', user.email)
    localStorage.setItem('role', user.role)
    setUser(user)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
