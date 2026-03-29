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
          <span style={{ color: '#ff8c00' }}>AM</span> Apni Manzil
        </div>
        <div style={navLinks}>
          <a href="#">Services ▾</a>
          <a href="#">Track Shipment</a>
          <a href="#">Logistics Partner</a>
          <a href="#">Help</a>
          <button style={loginBtn}>Login</button>
          <button style={signUpBtn}>Sign Up</button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header style={heroSection}>
        <p style={{ fontSize: '14px', marginBottom: '10px' }}>Home / Courier & Parcel Delivery</p>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>Courier & Parcel Delivery Service</h1>
        <p style={{ color: '#ffdf00', fontSize: '18px', fontWeight: 'bold' }}>Smart Courier Solutions for Your Needs</p>
      </header>

      {/* 3. Service Category Grid */}
      <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Select a Courier Service Category</h3>
        
        <div style={gridStyle}>
          {services.map((s) => (
            <div key={s.id} style={cardStyle}>
              <div style={iconCircle}>{s.icon}</div>
              <div style={{ textAlign: 'left', flexGrow: 1 }}>
                <h4 style={{ margin: '0', color: '#004080' }}>{s.name}</h4>
                <p style={{ fontSize: '12px', color: '#777' }}>{s.desc}</p>
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
            <h2 style={{ margin: '0' }}>Compare Rates & Save!</h2>
            <p style={{ margin: '0' }}>Get the <span style={{ color: '#ffdf00' }}>Best Deals</span> on All Couriers.</p>
          </div>
        </div>
        <button style={compareBtn}>Compare Now</button>
      </div>

      {/* 5. Footer */}
      <footer style={footerStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h4>Apni Manzil</h4>
            <p style={{ fontSize: '13px' }}>Your trusted partner for all logistics needs across India.</p>
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={footerCol}>
              <b>Company</b>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
            <div style={footerCol}>
              <b>Services</b>
              <a href="#">Domestic</a>
              <a href="#">International</a>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px', fontSize: '12px' }}>
          © 2026 Apni Manzil Logistics Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

// --- STYLES ---
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 50px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const navLinks = { display: 'flex', gap: '20px', alignItems: 'center' };
const loginBtn = { padding: '8px 25px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer' };
const signUpBtn = { padding: '8px 25px', borderRadius: '20px', border: 'none', backgroundColor: '#004080', color: '#fff', cursor: 'pointer' };

const heroSection = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 50px', textAlign: 'center', background: 'linear-gradient(to right, #004080, #007bff)' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' };
const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #eee' };
const iconCircle = { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#eef2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', marginBottom: '15px' };
const exploreBtn = { marginTop: '15px', padding: '8px 40px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' };

const compareBanner = { backgroundColor: '#004080', color: '#fff', margin: '50px 20px', padding: '30px 50px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' };
const compareBtn = { padding: '12px 30px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };

const footerStyle = { backgroundColor: '#111', color: '#fff', padding: '50px 20px', marginTop: '50px' };
const footerCol = { display: 'flex', flexDirection: 'column', gap: '10px' };

export default CourierService;