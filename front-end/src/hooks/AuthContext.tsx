import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface User {
    id: string
    avatar_url: string
    name: string
}

interface AuthState {
    token: string
    user: User
}

interface SignInCredentials {
    email: string
    password: string
}

interface AuthContextProps {
    user: User
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token')
        const user = localStorage.getItem('@GoBarber:user')

        if (token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthState
    })

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessao', { email, password })

        const { token, user } = response.data
        localStorage.setItem('@GoBarber:token', token)
        localStorage.setItem('@GoBarber:user', JSON.stringify(user))
        setData({
            token,
            user
        })

    }, [])

    const signOut = useCallback(() => {
        localStorage.clear()
        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextProps {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Contexto nao inicializado')
    }

    return context
}

export { AuthProvider, useAuth }