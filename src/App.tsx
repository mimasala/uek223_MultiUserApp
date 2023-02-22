import React from 'react';

import './App.css';
import Footer from './components/molecules/Footer/Footer';
import NavBar from './components/molecules/NavBar/NavBar';

import { ActiveUserContextProvider } from './Contexts/ActiveUserContext';
import Router from './Router/Router';

function App() {
  return (
    <ActiveUserContextProvider>
      <NavBar/>
      <Router />
      <Footer/>
    </ActiveUserContextProvider>
  );
}

export default App;
