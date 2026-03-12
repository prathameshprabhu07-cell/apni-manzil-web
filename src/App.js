import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import PartnerRegister from './pages/PartnerRegister';
import AdminDashboard from './pages/AdminDashboard';
import Tracking from './pages/Tracking';
import BusinessMSME from './pages/BusinessMSME';
import About from './pages/About'; // About page import kelay
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

      {/* 3. Professional Footer with Social Links */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row g-4 text-start">
            
            <div className="col-md-4">
              <h5 className="fw-bold text-primary mb-3">Apni Manzil</h5>
              <p className="small text-secondary" style={{ lineHeight: '1.8' }}>
                Apni Manzil he Kudal (Sindhudurg) madhye MSMEs ani individual customers sathi ek centralized logistics platform aahe. 
              </p>
              {/* Social Media Icons */}
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-white me-2" style={{fontSize: '20px'}}><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-white me-2" style={{fontSize: '20px'}}><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white me-2" style={{fontSize: '20px'}}><i className="fab fa-linkedin"></i></a>
                <a href="https://wa.me/919405862356" target="_blank" rel="noreferrer" className="text-white" style={{fontSize: '20px'}}><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Contact Us</h6>
              <p className="small text-secondary mb-1">📍 Kudal, Sindhudurg - 416520, Maharashtra.</p>
              <p className="small text-secondary mb-1">📞 +91 9405862356</p>
              <p className="small text-secondary mb-1">📞 +91 7218582356</p>
              <p className="small text-secondary mb-4">📧 help@apnimanzil.co.in</p>
            </div>

            <div className="col-md-4 text-md-end">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled small text-secondary">
                <li className="mb-2" style={{cursor:'pointer'}} onClick={() => setCurrentPage('home')}>Home</li>
                <li className="mb-2" style={{cursor:'pointer'}} onClick={() => setCurrentPage('about')}>About Us</li>
                <li className="mb-2" style={{cursor:'pointer'}} onClick={() => setCurrentPage('tracking')}>Track Parcel</li>
              </ul>
            </div>

          </div>
          <hr className="my-4 border-secondary" />
          <div className="text-center">
            <small className="text-secondary">© 2026 Apni Manzil Logistics | Built for Sindhudurg 🚩</small>
          </div>
        </div>
      </footer>

      <style>{`
        .hover-link:hover { color: #0056b3 !important; transition: 0.3s; }
      `}</style>

    </div>
  );
}

export default App;