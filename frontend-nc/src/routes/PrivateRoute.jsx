import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Cargando sesión...</div>
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}
