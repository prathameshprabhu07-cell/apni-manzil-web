import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });

  // तुझ्या मूळ ९ सर्विसेस
  const services = [
    { id: 1, name: "Domestic Courier", desc: "Delivery anywhere across India", icon: "🇮🇳" },
    { id: 2, name: "International Courier", desc: "Worldwide shipping services", icon: "✈️" },
    { id: 3, name: "Express / Same Day", desc: "Urgent fastest delivery", icon: "⚡" },
    { id: 4, name: "Surface Courier", desc: "Economy shipping (Road/Truck)", icon: "🚛" },
    { id: 5, name: "Air Courier", desc: "Priority flight delivery", icon: "✈️" },
    { id: 6, name: "Bulk Courier", desc: "Special rates for Business & MSMEs", icon: "📦" },
    { id: 7, name: "In-City Courier", desc: "Local same-city delivery", icon: "📍" },
    { id: 8, name: "Government Speed Post", desc: "Reliable postal services", icon: "📮" },
    { id: 9, name: "Safe Document Service", desc: "High-security document handling", icon: "📄" },
  ];

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://apni-manzil-web.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: "AM-" + Date.now(),
          ...formData,
          service_name: selectedService.name,
          payment_method: "prepaid"
        })
      });
      const result = await response.json();
      if (response.ok && result.status) {
        alert(`Success! Order booked. AWB: ${result.data.awb_number}`);
        setSelectedService(null);
      } else {
        alert("Error: " + (result.error || "Failed to book order."));
      }
    } catch (error) {
      alert("Server Connection Error: Please ensure your Render backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa' }}>
      
      {/* 1. Navbar */}
      <nav style={navStyle}>
        <div style={logoWrapper}>
          <span style={orangeAMLogo}>AM</span> Apni Manzil
        </div>
        <div style={navLinks}>
          <a href="#" style={linkStyle}>Services</a>
          <a href="#" style={linkStyle}>Track Shipment</a>
          <a href="#" style={linkStyle}>Help</a>
          <button style={loginBtn}>Login</button>
          <button style={signUpBtn}>Sign Up</button>
        </div>
      </nav>

      {!selectedService ? (
        <>
          {/* 2. Hero Section with Delivery Boy Photo Placeholder */}
          <header style={heroBanner}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <p style={breadcrumb}>HOME / COURIER SERVICES</p>
                <h1 style={mainHeading}>Courier & Parcel Delivery</h1>
                <p style={subTagline}>Smart & Reliable Solutions for Your Logistics Needs</p>
              </div>
              {/* Delivery Boy Photo Placeholder */}
              <div style={deliveryBoyImg}>🚚💨</div> 
            </div>
          </header>

          {/* 3. Box Grid Section */}
          <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={sectionTitle}>Select a Courier Shipping Service Category</h3>
            <div style={gridStyle}>
              {services.map((s) => (
                <div key={s.id} style={cardBoxStyle}>
                  <div style={iconCircle}>{s.icon}</div>
                  <h4 style={cardTitle}>{s.name}</h4>
                  <p style={cardDesc}>{s.desc}</p>
                  <button style={exploreBtn} onClick={() => handleServiceSelection(s)}>EXPLORE</button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* 4. Your Original Booking Form */
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← Back to Services</button>
          <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '20px' }}>Booking: {selectedService.name}</h2>
          <form style={formStyle} onSubmit={handleSubmit}>
              <input name="name" placeholder="Receiver Name" style={inputStyle} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" style={inputStyle} onChange={handleChange} required />
              <input name="pincode" placeholder="Pincode" style={inputStyle} onChange={handleChange} required />
              <input name="weight" placeholder="Weight (KG)" type="number" step="0.1" style={inputStyle} onChange={handleChange} required />
              <textarea name="address" placeholder="Complete Delivery Address" style={{...inputStyle, height: '80px'}} onChange={handleChange} required />
              <button type="submit" style={confirmBtn} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Order & Dispatch'}
              </button>
          </form>
        </div>
      )}

      {/* 5. Professional Blue Footer (image_327483.png) */}
      <footer style={blueFooter}>
        <div style={footerGrid}>
          <div style={footerCol}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={orangeAMLogo}>AM</span> Apni Manzil
            </div>
            <p style={footerText}>India's leading AI-powered logistics platform. One solution for all your delivery needs.</p>
            <div style={socialIcons}>
              <span style={socialCircle}>f</span> <span style={socialCircle}>📸</span> <span style={socialCircle}>in</span>
            </div>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Quick Links</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}><li>Our Services</li><li>Track Shipment</li><li>Become a Partner</li></ul>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Support</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}><li>Help Center</li><li>Terms & Conditions</li><li>Privacy Policy</li></ul>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Contact Us</h4>
            <div style={orangeLine}></div>
            <ul style={footerList}><li>📞 +91 93703 43210</li><li>📧 support@apnimanzil.co.in</li><li>📍 Mumbai, India</li></ul>
          </div>
        </div>
        <div style={bottomBar}>© 2026 APNI MANZIL. ALL RIGHTS RESERVED.</div>
      </footer>

    </div>
  );
};

// --- Styles ---
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 60px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 };
const logoWrapper = { fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: '#004080' };
const orangeAMLogo = { backgroundColor: '#ff5e00', color: '#fff', padding: '2px 8px', borderRadius: '5px' };
const navLinks = { display: 'flex', gap: '25px', alignItems: 'center' };
const linkStyle = { textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' };
const loginBtn = { padding: '8px 25px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px' };
const signUpBtn = { padding: '8px 25px', borderRadius: '20px', border: 'none', backgroundColor: '#004080', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' };

const heroBanner = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 60px', background: 'linear-gradient(100deg, #004080 0%, #007bff 100%)' };
const breadcrumb = { fontSize: '12px', opacity: 0.8, marginBottom: '10px' };
const mainHeading = { fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0' };
const subTagline = { fontSize: '16px', color: '#ffdf00', fontWeight: 'bold' };
const deliveryBoyImg = { fontSize: '80px', background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '50%' };

const sectionTitle = { textAlign: 'center', marginBottom: '40px', color: '#333' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' };
const cardBoxStyle = { backgroundColor: '#fff', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const iconCircle = { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', marginBottom: '15px', border: '1px solid #eee' };
const cardTitle = { margin: '0 0 8px 0', color: '#004080', fontSize: '17px' };
const cardDesc = { fontSize: '12px', color: '#777', marginBottom: '20px', lineHeight: '1.4' };
const exploreBtn = { padding: '8px 35px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' };

const formWrapper = { maxWidth: '500px', margin: '60px auto', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

const blueFooter = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 60px 20px', marginTop: '60px' };
const footerGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' };
const footerCol = { display: 'flex', flexDirection: 'column', gap: '12px' };
const footerColTitle = { fontSize: '18px', fontWeight: 'bold', margin: 0 };
const orangeLine = { width: '35px', height: '2px', backgroundColor: '#ff5e00', marginTop: '-8px' };
const footerList = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', opacity: 0.9 };
const footerText = { fontSize: '13px', lineHeight: '1.6', opacity: 0.8, maxWidth: '240px' };
const socialIcons = { display: 'flex', gap: '10px', marginTop: '10px' };
const socialCircle = { width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' };
const bottomBar = { textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', opacity: 0.7 };

export default CourierService;