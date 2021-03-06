import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface IUser {
    id: string
    name: string
    email: string
    avatar_url: string
}

interface AuthState {
    token: string
    user: IUser
}

interface SignInCredentials {
    email: string
    password: string
}

interface AuthContextProps {
    loading: boolean
    user: IUser
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
    updateUser(user: IUser): void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user'
            ])

            if (user[1] && token[1]) {
                api.defaults.headers.authorization = `Bearer ${token[1]}`
                setData({ user: JSON.parse(user[1]), token: token[1] })
            }
            setLoading(false)
        }

        loadStorageData()
    }, [])

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessao', { email, password })

        const { token, user } = response.data

        if (!user.avatar_url) {
            user.avatar_url = 'https://api.adorable.io/avatars/285/abott@adorable.png'
        }
        
        await AsyncStorage.setItem('@GoBarber:token', token)
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
        api.defaults.headers.authorization = `Bearer ${token}`
        setData({
            token,
            user
        })
    }, [])

    const updateUser = useCallback(async (user: IUser) => {
        setData({
            token: data.token,
            user,
        })
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
    }, [data.token])

    const signOut = useCallback(async () => {
        await AsyncStorage.clear()
        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value= {{ loading, user: data.user, signIn, signOut, updateUser }}>
            { children }
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