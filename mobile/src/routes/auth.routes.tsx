import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/signIn'
import SingUp from '../pages/siginUp'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
    <Auth.Navigator 
        initialRouteName="signIn"
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#312e38' }
        }}
    >
        <Auth.Screen name="signIn" component={SignIn}></Auth.Screen>
        <Auth.Screen name="signUp" component={SingUp}></Auth.Screen>
    </Auth.Navigator>
)

export default AuthRoutes