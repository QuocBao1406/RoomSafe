import React from 'react';
import Footer from './components/Footer';
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/LoginPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostRoomPage from './pages/PostRoomPage.jsx';
import ManagePostPage from './pages/ManagePostPage.jsx';
import EditRoomPage from './pages/EditRoomPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FindRoomPage from './pages/FindRoomPage.jsx';

function App() {
  return (
    <Router>

      <Navbar />

      <main className="main-content-wrapper">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/post-room' element={<PostRoomPage />} />
          <Route path='/manage-post' element={<ManagePostPage />} />
          <Route path='/edit-room/:id' element={<EditRoomPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/find-room" element={<FindRoomPage />} />
        </Routes>
      </main>

      <Footer />
      
    </Router>
  );
}

export default App
