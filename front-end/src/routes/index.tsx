import React from 'react'
import { Switch } from 'react-router-dom'
import SignIn from '../pages/singIn'
import SignUp from '../pages/signUp'
import Dashboard from '../pages/dashboard'
import Router from './Route'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import Profile from '../pages/profile'

const Routes: React.FC = () => (
    <Switch>
        <Router path="/" exact component={SignIn}></Router>
        <Router path="/signup" component={SignUp}></Router>
        <Router path="/forgot-password" component={ForgotPassword}></Router>
        <Router path="/reset_password" component={ResetPassword}></Router>
        <Router path="/dashboard" component={Dashboard} isPrivate></Router>
        <Router path="/profile" component={Profile} isPrivate></Router>
    </Switch>
)

export default Routes