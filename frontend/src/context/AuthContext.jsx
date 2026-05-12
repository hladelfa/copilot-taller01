import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const SESSION_KEY = 'auth_tokens'

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(tokens) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens))
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(loadSession)

  const login = useCallback((tokenData) => {
    saveSession(tokenData)
    setTokens(tokenData)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setTokens(null)
  }, [])

  const isAuthenticated = tokens !== null

  return (
    <AuthContext.Provider value={{ tokens, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
