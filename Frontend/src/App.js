import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/footer'; 
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Navbar from './components/layout/Navbar';
import AdminTable from './components/adminTable/Table';

function App() {
  return (
    <div className="App">
     <Navbar/>
      <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/admin' element={<AdminTable/>}/>
      </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
