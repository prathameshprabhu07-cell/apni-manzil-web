import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });
  
  // Hover स्टेट सांभाळण्यासाठी नवीन स्टेट
  const [hoveredId, setHoveredId] = useState(null);

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
        alert("Error: " + (result.error || "Booking failed."));
      }
    } catch (error) {
      alert("Server Connection Error: Please ensure your Render backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa' }}>
      
      {/* नॅव्हबार */}
      <nav style={navStyle}>
        <div style={logoWrapper}>
          <span style={orangeAMLogo}>AM</span> Apni Manzil
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

      {!selectedService ? (
        <>
          <header style={heroBanner}>
            <p style={breadcrumb}>Home / Courier & Parcel Delivery</p>
            <h1 style={mainHeading}>Courier & Parcel Delivery Service</h1>
            <p style={subTagline}>Smart Courier Solutions for Your Needs</p>
          </header>

          <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h3 style={sectionTitle}>Select a Courier Service Category</h3>
            <div style={gridStyle}>
              {services.map((s) => (
                <div 
                  key={s.id} 
                  onMouseEnter={() => setHoveredId(s.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    ...cardBoxStyle,
                    transform: hoveredId === s.id ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hoveredId === s.id ? '0 12px 30px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
                    borderColor: hoveredId === s.id ? '#ff5e00' : '#eee',
                    transition: 'all 0.3s ease' // हाच तो स्मूथ इफेक्ट आहे
                  }}
                >
                  <div style={iconCircleStyle}>{s.icon}</div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <h4 style={cardTitleStyle}>{s.name}</h4>
                    <p style={cardDescStyle}>{s.desc}</p>
                  </div>
                  <button style={exploreBtnStyle} onClick={() => handleServiceSelection(s)}>
                    Explore
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={compareBanner}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '40px' }}>🤖</div>
              <div>
                <h2 style={{ margin: 0 }}>Compare Rates & Save!</h2>
                <p style={{ margin: 0, opacity: 0.9 }}>Get the <span style={{ color: '#ffdf00', fontWeight: 'bold' }}>Best Deals</span> on All Couriers.</p>
              </div>
            </div>
            <button style={compareNowBtn}>Compare Now</button>
          </div>
        </>
      ) : (
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

      {/* फुटर */}
      <footer style={blueFooterStyle}>
        <div style={footerGrid}>
          <div style={footerCol}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={orangeAMLogo}>AM</span> Apni Manzil
            </div>
            <p style={footerColText}>India's leading AI-powered logistics platform. One solution for all your special delivery needs.</p>
            <div style={socialRow}>
              <span style={socialIcon}>f</span> <span style={socialIcon}>📸</span> <span style={socialIcon}>in</span>
            </div>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Quick Links</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}><li>Our Services</li><li>Track Shipment</li><li>Become a Partner</li></ul>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Support</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}><li>Help Center</li><li>Terms & Conditions</li><li>Privacy Policy</li></ul>
          </div>
          <div style={footerCol}>
            <h4 style={footerColTitle}>Contact Us</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}><li>📞 +91 93703 43210</li><li>📧 support@apnimanzil.co.in</li><li>📍 Mumbai, India</li></ul>
          </div>
        </div>
        <div style={bottomBar}>© 2026 APNI MANZIL. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
};

// --- मूळ Styles तसेच ठेवले आहेत ---
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 60px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 };
const logoWrapper = { fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: '#004080' };
const orangeAMLogo = { backgroundColor: '#ff5e00', color: '#fff', padding: '2px 8px', borderRadius: '5px' };
const navLinks = { display: 'flex', gap: '25px', alignItems: 'center' };
const linkStyle = { textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' };
const loginBtn = { padding: '8px 25px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px' };
const signUpBtn = { padding: '8px 25px', borderRadius: '20px', border: 'none', backgroundColor: '#004080', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' };
const heroBanner = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #004080 0%, #007bff 100%)' };
const breadcrumb = { fontSize: '12px', opacity: 0.8, marginBottom: '10px' };
const mainHeading = { fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0' };
const subTagline = { fontSize: '16px', color: '#ffdf00', fontWeight: 'bold' };
const sectionTitle = { textAlign: 'center', marginBottom: '40px', color: '#333', fontSize: '18px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };
const cardBoxStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #eee' };
const iconCircleStyle = { width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#eef2f7', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' };
const cardTitleStyle = { margin: 0, color: '#004080', fontSize: '15px', fontWeight: 'bold' };
const cardDescStyle = { margin: '4px 0 0 0', color: '#777', fontSize: '12px' };
const exploreBtnStyle = { padding: '8px 20px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' };
const compareBanner = { backgroundColor: '#004080', color: '#fff', margin: '40px auto', padding: '30px 50px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1160px' };
const compareNowBtn = { padding: '12px 30px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };
const formWrapper = { maxWidth: '500px', margin: '60px auto', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const blueFooterStyle = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 60px 20px', marginTop: '60px' };
const footerGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' };
const footerCol = { display: 'flex', flexDirection: 'column', gap: '12px' };
const footerColTitle = { fontSize: '18px', fontWeight: 'bold', margin: 0 };
const orangeLine = { width: '35px', height: '2px', backgroundColor: '#ff5e00', marginTop: '-8px' };
const footerColList = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', opacity: 0.9 };
const footerColText = { fontSize: '13px', lineHeight: '1.6', opacity: 0.8, maxWidth: '240px' };
const socialRow = { display: 'flex', gap: '10px', marginTop: '10px' };
const socialIcon = { width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px' };
const bottomBar = { textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', opacity: 0.7 };
   
export default CourierService;