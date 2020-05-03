import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from 'src/pages/dashboard'

const App = createStackNavigator()

const AuthRoutes: React.FC = () => (
    <App.Navigator 
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#312e38' }
        }}
    >
        <App.Screen name="dashboard" component={Dashboard}></App.Screen>
    </App.Navigator>
)

export default AuthRoutes