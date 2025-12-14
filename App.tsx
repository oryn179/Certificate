import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClaimCertificate from './pages/ClaimCertificate';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { authService } from './services/auth';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div className="min-h-screen bg-hacker-black text-gray-100 font-sans selection:bg-hacker-red selection:text-white flex flex-col">
        <Navbar user={user} setUser={setUser} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            
            <Route 
              path="/claim" 
              element={user ? <ClaimCertificate /> : <Navigate to="/" />} 
            />
            
            <Route 
              path="/admin/login" 
              element={<AdminLogin user={user} />} 
            />
            
            <Route 
              path="/admin/dashboard" 
              element={<AdminDashboard user={user} />} 
            />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;