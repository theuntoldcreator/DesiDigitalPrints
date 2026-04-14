import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GeneratorWizard from './components/GeneratorWizard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { pb } from './lib/pb';

function App() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch prebuilt templates from PocketBase
    pb.getFullList('templates')
      .then(data => setTemplates(data))
      .catch(err => console.error('Error fetching templates from PB:', err));

    // Check for existing admin session
    const session = JSON.parse(localStorage.getItem('admin_session'));
    if (session && session.isLoggedIn) {
      const hoursSinceLogin = (Date.now() - session.loginTime) / (1000 * 60 * 60);
      if (hoursSinceLogin < 1) {
        setIsAdminLoggedIn(true);
      } else {
        localStorage.removeItem('admin_session');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-base-100 font-sans text-base-content">
        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={
            <LandingPage 
              templates={templates} 
              onStart={(template) => setSelectedTemplate(template)} 
            />
          } />

          {/* Design Section (Can be a sub-route or handled via state on /design) */}
          <Route path="/design" element={
            selectedTemplate ? (
              <GeneratorWizard 
                selectedTemplate={selectedTemplate}
                onBack={() => window.location.href = '/'} 
              />
            ) : <Navigate to="/" />
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            !isAdminLoggedIn ? (
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            ) : <Navigate to="/admin/dashboard" />
          } />

          <Route path="/admin/dashboard" element={
            isAdminLoggedIn ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : <Navigate to="/admin" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
