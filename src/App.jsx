import React from 'react';
import Footer from './components/Footer';
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

      <Navbar />

      <main className="main-content-wrapper">
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      
    </Router>
  );
}

export default App
