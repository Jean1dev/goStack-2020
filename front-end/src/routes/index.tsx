import React from 'react'
import { Switch } from 'react-router-dom'
import SignIn from '../pages/singIn'
import SignUp from '../pages/signUp'
import Dashboard from '../pages/dashboard'
import Router from './Route'

const Routes: React.FC = () => (
    <Switch>
        <Router path="/" exact component={SignIn}></Router>
        <Router path="/signup" component={SignUp}></Router>
        <Router path="/dashboard" component={Dashboard} isPrivate></Router>
    </Switch>
)

export default Routes