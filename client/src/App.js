import React from'react';
import { BrowserRouter } from'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App"><div className="app">
        <Navbar />
        <AuthPage/>
      </div></div>
    </BrowserRouter>
    
  );
}

export default App;
