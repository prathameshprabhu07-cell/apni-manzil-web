import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);

  // ८ सर्विसेस फोटोप्रमाणे
  const services = [
    { id: 1, name: "Domestic Courier", desc: "Nationwide Delivery", icon: "🇮🇳" },
    { id: 2, name: "Express Courier", desc: "Fast & Reliable", icon: "⏱️" },
    { id: 3, name: "Same Day Delivery", desc: "Delivery in 24 Hours", icon: "⚡" },
    { id: 4, name: "Next Day Delivery", desc: "Delivery by Next Day", icon: "📅" },
    { id: 5, name: "Document Courier", desc: "Secure Documents", icon: "📄" },
    { id: 6, name: "Parcel Delivery", desc: "All Size Parcels", icon: "📦" },
    { id: 7, name: "Bulk Shipping", desc: "Large Volume Shipping", icon: "🚛" },
    { id: 8, name: "Reverse Pickup", desc: "Easy Returns Service", icon: "🔄" },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. Navbar */}
      <nav style={navStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#004080' }}>
          <span style={{ backgroundColor: '#ff5e00', color: '#fff', padding: '2px 8px', borderRadius: '5px', marginRight: '5px' }}>AM</span> 
          Apni Manzil
        </div>
        <div style={navLinks}>
          <a href="#" style={linkStyle}>Services ▾</a>
          <a href="#" style={linkStyle}>Track Shipment</a>
          <a href="#" style={linkStyle}>Logistics Partner</a>
          <a href="#" style={linkStyle}>Help</a>
          <button style={loginBtn}>Login</button>
          <button style={signUpBtn}>Sign Up</button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header style={heroSection}>
        <p style={{ fontSize: '14px', marginBottom: '10px', opacity: 0.9 }}>Home / Courier & Parcel Delivery</p>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', fontWeight: 'bold' }}>Courier & Parcel Delivery Service</h1>
        <p style={{ color: '#ffdf00', fontSize: '18px', fontWeight: 'bold' }}>Smart Courier Solutions for Your Needs</p>
      </header>

      {/* 3. Service Category Grid */}
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '22px' }}>Select a Courier Service Category</h3>
        
        <div style={gridStyle}>
          {services.map((s) => (
            <div key={s.id} style={cardStyle}>
              <div style={iconCircle}>{s.icon}</div>
              <div style={{ textAlign: 'left', flexGrow: 1 }}>
                <h4 style={{ margin: '0', color: '#004080', fontSize: '16px' }}>{s.name}</h4>
                <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>{s.desc}</p>
              </div>
              <button style={exploreBtn} onClick={() => setSelectedService(s)}>Explore</button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Compare Rates Section */}
      <div style={compareBanner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '50px' }}>🤖</div>
          <div>
            <h2 style={{ margin: '0', fontSize: '24px' }}>Compare Rates & Save!</h2>
            <p style={{ margin: '0', opacity: 0.9 }}>Get the <span style={{ color: '#ffdf00', fontWeight: 'bold' }}>Best Deals</span> on All Couriers.</p>
          </div>
        </div>
        <button style={compareBtn}>Compare Now</button>
      </div>

      {/* 5. New Footer (Based on your image_327483.png) */}
      <footer style={newFooterStyle}>
        <div style={footerContainer}>
          {/* Column 1 */}
          <div style={footerCol}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '15px' }}>
               <span style={{ backgroundColor: '#ff5e00', padding: '2px 6px', borderRadius: '4px' }}>AM</span> Apni Manzil
            </div>
            <p style={footerText}>India's leading AI-powered logistics platform. One solution for all your special delivery needs.</p>
            <div style={socialRow}>
              <span style={socialCircle}>f</span>
              <span style={socialCircle}>📸</span>
              <span style={socialCircle}>in</span>
            </div>
          </div>

          {/* Column 2 */}
          <div style={footerCol}>
            <h4 style={footerHeading}>Quick Links</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}>
              <li>Our Services</li>
              <li>Track Shipment</li>
              <li>Become a Partner</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div style={footerCol}>
            <h4 style={footerHeading}>Support</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}>
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div style={footerCol}>
            <h4 style={footerHeading}>Contact Us</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}>
              <li>📞 +91 93703 43210</li>
              <li>📧 support@apnimanzil.co.in</li>
              <li>📍 Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div style={bottomBar}>
          © 2026 APNI MANZIL. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
};

// --- Updated Styles ---
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 };
const navLinks = { display: 'flex', gap: '25px', alignItems: 'center' };
const linkStyle = { textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' };
const loginBtn = { padding: '8px 25px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '14px' };
const signUpBtn = { padding: '8px 25px', borderRadius: '20px', border: 'none', backgroundColor: '#004080', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' };

const heroSection = { backgroundColor: '#0056b3', color: '#fff', padding: '70px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #004080 0%, #007bff 100%)' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' };
const cardStyle = { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #f0f0f0', transition: '0.3s' };
const iconCircle = { width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#eef2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' };
const exploreBtn = { padding: '8px 20px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' };

const compareBanner = { backgroundColor: '#004080', color: '#fff', margin: '40px auto', padding: '30px 50px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1160px' };
const compareBtn = { padding: '12px 35px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };

// Footer Styles from your Image
const newFooterStyle = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 20px 20px' };
const footerContainer = { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' };
const footerCol = { display: 'flex', flexDirection: 'column', gap: '12px' };
const footerHeading = { fontSize: '18px', fontWeight: 'bold', margin: 0 };
const orangeLine = { width: '35px', height: '2px', backgroundColor: '#ff5e00', marginTop: '-8px' };
const footerList = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', opacity: 0.9 };
const footerText = { fontSize: '13px', lineHeight: '1.6', opacity: 0.8, maxWidth: '240px' };
const socialRow = { display: 'flex', gap: '12px', marginTop: '10px' };
const socialCircle = { width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', cursor: 'pointer' };
const bottomBar = { textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', letterSpacing: '1px', opacity: 0.7 };

export default CourierService;