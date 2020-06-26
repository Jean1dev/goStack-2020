import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../pages/dashboard'
import Profile from '../pages/profile'
import AppointmentCreated from '../pages/appointment-created'
import CreateAppointment from '../pages/create-appointment'

const App = createStackNavigator()

const AuthRoutes: React.FC = () => (
    <App.Navigator 
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#312e38' }
        }}
    >
        <App.Screen name="dashboard" component={Dashboard}></App.Screen>
        <App.Screen name="profile" component={Profile}></App.Screen>
        <App.Screen name="createAppointment" component={CreateAppointment}></App.Screen>
        <App.Screen name="appointmentCreated" component={AppointmentCreated}></App.Screen>
    </App.Navigator>
)

export default AuthRoutes