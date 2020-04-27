import React from 'react';
import GlobalStyle from './styles/global'
import AppProvider from './hooks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

