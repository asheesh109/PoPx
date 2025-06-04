import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

export const ProtectedRoute = () => {
  const { user } = useAuth()
  
  if (!user) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" replace />
  }

  // User authenticated, render child routes
  return <Outlet />
}