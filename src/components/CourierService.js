import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });

  // तुझ्या मूळ ९ सर्विसेस (मी त्यांची नावे ठेवली आहेत, आयकॉन्स फोटोसारखे लावलेत)
  const services = [
    { id: 1, name: "Domestic Courier", desc: "Delivery anywhere across India", icon: "🇮🇳" },
    { id: 2, name: "International Courier", desc: "Worldwide shipping services", icon: "✈️" },
    { id: 3, name: "Express / Same Day", desc: "Urgent fastest delivery", icon: "⚡" },
    { id: 4, name: "Surface Courier", desc: "Economy shipping (Road/Truck)", icon: "🚛" },
    { id: 5, name: "Air Courier", desc: "Priority flight delivery", icon: "Priority" },
    { id: 6, name: "Bulk Courier", desc: "Rates for Business & MSMEs", icon: "📦" },
    { id: 7, name: "In-City Courier", desc: "Local same-city delivery", icon: "📍" },
    { id: 8, name: "Safe Document Service", desc: "High-security document handling", icon: "📄" },
    { id: 9, name: "Government Speed Post", desc: "Reliable postal services", icon: "Speed" },
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
        alert("Error: " + (result.error || "Order creation failed."));
      }
    } catch (error) {
      alert("Server Connection Error: Ensure your Render backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>
      
      {/* 1. Navbar (As seen in image_2.png) */}
      <nav style={navStyle}>
        <div style={logoWrapper}>
          <span style={orangeAMLogo}>AM</span> Apni Manzil
        </div>
        <div style={navLinks}>
          <a href="#" style={linkStyle}>Services</a>
          <a href="#" style={linkStyle}>Track Shipment</a>
          <a href="#" style={linkStyle}>Logistics Partner</a>
          <a href="#" style={linkStyle}>Help</a>
          <button style={loginBtn}>Login</button>
          <button style={signUpBtn}>Sign Up</button>
        </div>
      </nav>

      {!selectedService ? (
        <>
          {/* 2. Blue Hero Banner (Exact match to image_2.png) */}
          <header style={heroBanner}>
            <p style={breadcrumb}>HOME / COURIER SERVICES</p>
            <h1 style={mainHeading}>Courier Services</h1>
            <p style={subTagline}>Efficient & Reliable Courier Solutions for All Your Needs</p>
          </header>

          {/* 3. Category Section (Neat Grid, Icon + Text) */}
          <div style={gridSection}>
            <h3 style={sectionTitle}>Select a Courier Shipping Service Category</h3>
            <div style={gridStyle}>
              {services.map((s) => (
                <div key={s.id} style={cardStyle}>
                  {/* Icon Circle */}
                  <div style={iconCircleStyle}>
                    <div style={iconInner}>
                      {s.icon === "Priority" ? "✈️" : 
                       s.icon === "Speed" ? "🚴‍♂️" : s.icon}
                    </div>
                  </div>
                  {/* Text */}
                  <h4 style={cardTitle}>{s.name}</h4>
                  <p style={cardDesc}>{s.desc}</p>
                  {/* Explore Button */}
                  <button style={exploreBtnStyle} onClick={() => handleServiceSelection(s)}>
                    EXPLORE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        {/* 4. Booking Form (Your original form, styled within the new layout) */}
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
                {loading ? 'Processing...' : 'Confirm Order & dispatch'}
              </button>
          </form>
        </div>
      )}

      {/* 5. Blue Footer (As seen in image_3.png) */}
      <footer style={blueFooterStyle}>
        <div style={footerContainer}>
          {/* Col 1 */}
          <div style={footerCol}>
            <div style={{ fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ backgroundColor: '#ff5e00', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>AM</span> Apni Manzil
            </div>
            <p style={footerColText}>India's leading AI-powered logistics platform. One solution for all your special delivery needs.</p>
            <div style={socialRow}>
              <span style={socialIconStyle}>f</span>
              <span style={socialIconStyle}>📸</span>
              <span style={socialIconStyle}>in</span>
            </div>
          </div>
          {/* Col 2 */}
          <div style={footerCol}>
            <h4 style={footerColTitle}>Quick Links</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}>
              <li>Our Services</li>
              <li>Track Shipment</li>
              <li>Become a Partner</li>
            </ul>
          </div>
          {/* Col 3 */}
          <div style={footerCol}>
            <h4 style={footerColTitle}>Support</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}>
              <li>Help Center</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          {/* Col 4 */}
          <div style={footerCol}>
            <h4 style={footerColTitle}>Contact Us</h4>
            <div style={orangeLine}></div>
            <ul style={footerColList}>
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

// --- Tantotant Styles ---

const pageWrapper = { fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' };

// Navbar
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 60px', backgroundColor: '#fff', boxShadow: '0 2px 15px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 };
const logoWrapper = { fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: '#004080' };
const orangeAMLogo = { backgroundColor: '#ff5e00', color: '#fff', padding: '2px 8px', borderRadius: '5px' };
const navLinks = { display: 'flex', gap: '25px', alignItems: 'center' };
const linkStyle = { textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' };
const loginBtn = { padding: '8px 25px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '13px' };
const signUpBtn = { padding: '8px 25px', borderRadius: '20px', border: 'none', backgroundColor: '#004080', color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' };

// Hero Banner
const heroBanner = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 60px', textAlign: 'left', background: 'linear-gradient(100deg, #004080 0%, #007bff 100%)' };
const breadcrumb = { fontSize: '12px', opacity: 0.8, marginBottom: '10px', textTransform: 'uppercase' };
const mainHeading = { fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0' };
const subTagline = { fontSize: '16px', color: '#ffdf00', fontWeight: 'bold', margin: 0 };

// Grid Section
const gridSection = { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', flexGrow: 1 };
const sectionTitle = { textAlign: 'center', marginBottom: '50px', color: '#333', fontSize: '22px', fontWeight: '500' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' };

// Card Style
const cardStyle = { backgroundColor: '#fff', padding: '30px 20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: 'none' };
const iconCircleStyle = { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #eee', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' };
const iconInner = { color: '#007bff', fontSize: '20px' };
const cardTitle = { margin: '0 0 8px 0', color: '#004080', fontSize: '16px', fontWeight: '600' };
const cardDesc = { fontSize: '12px', color: '#777', margin: '0 0 20px 0', lineHeight: '1.4' };
const exploreBtnStyle = { padding: '8px 40px', backgroundColor: '#ff5e00', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' };

// Form Wrapper
const formWrapper = { maxWidth: '500px', margin: '60px auto', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

// Footer (image_3.png)
const blueFooterStyle = { backgroundColor: '#0056b3', color: '#fff', padding: '60px 60px 20px', marginTop: '60px' };
const footerContainer = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' };
const footerCol = { display: 'flex', flexDirection: 'column', gap: '12px' };
const footerColTitle = { fontSize: '18px', fontWeight: 'bold', margin: 0 };
const orangeLine = { width: '35px', height: '2px', backgroundColor: '#ff5e00', marginTop: '-8px' };
const footerColList = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', opacity: 0.9 };
const footerColText = { fontSize: '13px', lineHeight: '1.6', opacity: 0.8, maxWidth: '240px' };
const socialRow = { display: 'flex', gap: '12px', marginTop: '10px' };
const socialIconStyle = { width: '30px', height: '30px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', cursor: 'pointer' };
const bottomBar = { textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', letterSpacing: '1px', opacity: 0.7 };

export default CourierService;