import React from 'react';
import GlobalStyle from './styles/global'
import SignIn from './pages/singIn';
import { AuthProvider } from './hooks/AuthContext'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  );
}

