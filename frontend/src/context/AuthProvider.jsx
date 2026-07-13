import React, { createContext, useEffect, useState } from 'react'
import api from '../utils/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    // `user` looks like { id, firstName, email, role } once logged in, or null when logged out.
    const [user, setUser] = useState(null)

    // While we're checking "is there already a valid login cookie?" on page load,
    // we don't want to flash the Login screen for a split second - so we track this.
    const [checkingAuth, setCheckingAuth] = useState(true)

    // On first render, ask the backend "who am I?". If the browser still has a
    // valid token cookie from a previous visit, this logs the user back in
    // automatically. If not, the request fails and we just show the Login page.
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await api.get('/auth/me')
                setUser(res.data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setCheckingAuth(false)
            }
        }
        checkLoggedIn()
    }, [])

    // Returns { success, message } so the Login form can show a helpful error.
    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password })
            setUser(res.data.user)
            return { success: true }
        } catch (err) {
            const message = err.response?.data?.message || 'Something went wrong. Please try again.'
            return { success: false, message }
        }
    }

    const logout = async () => {
        try {
            await api.post('/auth/logout')
        } catch (err) {
            // even if the request fails, clear the user out locally
        }
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, checkingAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
