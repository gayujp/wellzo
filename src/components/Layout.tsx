import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import FloatingChatbot from './FloatingChatbot';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav 
        onMenuClick={() => setSidebarOpen(true)} 
        user={user}
        onLogout={handleLogout}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-16">
        <Outlet />
      </main>
      
      <FloatingChatbot />
    </div>
  );
};

export default Layout;
