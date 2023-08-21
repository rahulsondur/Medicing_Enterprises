import React from 'react';
import './App.css';
import Header from './components/header'; 
import Footer from './components/footer'; 
import MainContent from './components/main_content';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
