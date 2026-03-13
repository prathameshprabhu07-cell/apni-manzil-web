import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import PartnerRegister from './pages/PartnerRegister';
import AdminDashboard from './pages/AdminDashboard';
import Tracking from './pages/Tracking';
import BusinessMSME from './pages/BusinessMSME';
import About from './pages/About';
import AIChat from './components/AIChat'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      
      {/* 1. Header Navigation */}
      <nav className="navbar navbar-dark px-4 py-2" style={{ backgroundColor: '#0056b3' }}>
        <div className="container-fluid">
          <span 
            className="navbar-brand fw-bold fs-4" 
            style={{cursor:'pointer'}} 
            onClick={() => setCurrentPage('admin')}
          >
            Apni Manzil
          </span>
          
          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-white small d-none d-md-block" style={{cursor:'pointer'}} onClick={() => setCurrentPage('home')}>Home</span>
            <span className="text-white small d-none d-md-block" style={{cursor:'pointer'}} onClick={() => setCurrentPage('tracking')}>Tracking</span>
            <button onClick={() => setCurrentPage('login')} className="btn btn-success btn-sm px-3 rounded shadow-sm fw-bold">Login</button>
          </div>
        </div>
      </nav>

      {/* 2. Menu Bar */}
      <div className="bg-white border-bottom shadow-sm py-2 px-3 overflow-auto">
        <div className="container-fluid d-flex justify-content-center gap-4 text-nowrap">
          {["Home", "About Us", "Courier Services", "Transport", "International", "Business MSME", "Partner Registration", "Tracking"].map((item) => (
            <span 
              key={item} 
              style={{ 
                cursor: 'pointer', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: (
                  (currentPage === 'home' && item === "Home") ||
                  (currentPage === 'about' && item === "About Us") ||
                  (currentPage === 'partner' && item === "Partner Registration") || 
                  (currentPage === 'tracking' && item === "Tracking") ||
                  (currentPage === 'msme' && item === "Business MSME")
                ) ? "#0056b3" : "#333" 
              }} 
              className="hover-link" 
              onClick={() => {
                if(item === "About Us") setCurrentPage('about');
                else if(item === "Partner Registration") setCurrentPage('partner');
                else if(item === "Tracking") setCurrentPage('tracking');
                else if(item === "Business MSME") setCurrentPage('msme');
                else if(item === "Home") setCurrentPage('home');
                else setCurrentPage('home');
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '80vh'
      }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
        {currentPage === 'login' && <Login />}
        {currentPage === 'partner' && <PartnerRegister />}
        {currentPage === 'admin' && <AdminDashboard />}
        {currentPage === 'tracking' && <Tracking />}
        {currentPage === 'msme' && <BusinessMSME />}
      </main>

      {/* AI Chat Component - Visible on all pages */}
      <AIChat />

      {/* 3. Professional Footer */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row g-4 text-start">
            
            <div className="col-md-4">
              <h5 className="fw-bold text-primary mb-3">Apni Manzil</h5>
              <p className="small text-secondary" style={{ lineHeight: '1.8' }}>
                Apni Manzil is a centralized logistics platform based in Kudal (Sindhudurg), 
                providing efficient transport and courier solutions for MSMEs and individual customers.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-white me-2" style={{fontSize