import React, { useContext } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const { user, checkingAuth } = useContext(AuthContext)

  // Show a simple loading state while we check for an existing login session
  if (checkingAuth) {
    return (
      <div className='flex h-screen w-screen items-center justify-center text-lg font-medium'>
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  if (user.role === 'admin') {
    return <AdminDashboard />
  }

  return <EmployeeDashboard />
}

export default App
