import React from 'react'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useAuth } from '../hooks/AuthContext'
import { ActivityIndicator, View } from 'react-native'

const Routes: React.FC = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <ActivityIndicator size="large" color="#999"></ActivityIndicator>
            </View>
        )
    }
    
    return user ? <AppRoutes/> : <AuthRoutes/>
}

export default Routes