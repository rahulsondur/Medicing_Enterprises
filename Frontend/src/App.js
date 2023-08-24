import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header'; 
import Footer from './components/footer'; 
import MainContent from './components/main_content';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
      </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
