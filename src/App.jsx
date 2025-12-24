import React from 'react';
import Footer from './components/Footer';
import './App.css'
import Navbar from './components/Navbar';
import AuthPage from './pages/LoginPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostRoomPage from './pages/PostRoomPage.jsx';
import ManagePostPage from './pages/ManagePostPage.jsx';
import EditRoomPage from './pages/EditRoomPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FindRoomPage from './pages/FindRoomPage.jsx';
import RoommateListPage from './pages/RoommateListPage.jsx';
import RoommatePostPage from './pages/RoommatePostPage.jsx';
import RoommateManagePage from './pages/RoommateManagePage.jsx';
import RoommateEditPage from './pages/RoommateEditPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RoomDetailPage from './pages/RoomDetailPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoommateDetailPage from './pages/RoommateDetailPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import AdminPostsPage from './pages/admin/AdminPostsPage.jsx';
import { useLocation } from 'react-router-dom';
import SupportChat from './components/SupportChat.jsx';

function AppContent() {

  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <main className="main-content-wrapper">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path='/login' element={<AuthPage />} />
          <Route path="/" element={<FindRoomPage />} />
          <Route path="/roommate/list" element={<RoommateListPage />} />

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/posts" element={<AdminPostsPage />} />
          </Route>

          {/* --- LOGGED IN USER --- */}
          {/* Bao gồm cả Chủ trọ và Người tìm trọ */}
          <Route element={<ProtectedRoute allowedRoles={['LANDLORD', 'TENANT']} />}>
             <Route path="/profile" element={<ProfilePage />} />
             <Route path="/room/:id" element={<RoomDetailPage />} />
          </Route>

          {/* --- LANDLORD ONLY --- */}
          <Route element={<ProtectedRoute allowedRoles={['LANDLORD']} />}>
             <Route path="/dashboard" element={<DashboardPage />} />
             <Route path='/post-room' element={<PostRoomPage />} />
             <Route path='/manage-post' element={<ManagePostPage />} />
             <Route path='/edit-room/:id' element={<EditRoomPage />} />
          </Route>

          {/* --- TENANT ONLY --- */}
          <Route element={<ProtectedRoute allowedRoles={['TENANT']} />}>
             <Route path="/roommate/post" element={<RoommatePostPage />} />
             <Route path="/roommate/manage" element={<RoommateManagePage />} />
             <Route path="/roommate/edit/:id" element={<RoommateEditPage />} />
             <Route path="/roommate/:id" element={<RoommateDetailPage />} />
          </Route>
        </Routes>
      </main>

      <SupportChat />

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;