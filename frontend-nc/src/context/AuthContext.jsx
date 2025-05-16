import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const username = localStorage.getItem('username')

    if (accessToken && username) {
      setUser({ username })
      setToken(accessToken)
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const login = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password })

      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      localStorage.setItem('username', username)

      setUser({ username })
      setToken(data.access)
      setIsAuthenticated(true)

      navigate('/dashboard')
    } catch (error) {
      console.error('Login fallido', error)
      alert('Usuario o contraseña incorrectos')
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
