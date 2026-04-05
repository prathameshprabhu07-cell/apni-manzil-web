import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });
  
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
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
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
                    transition: 'all 0.3s ease'
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

          {/* --- फक्त ट्रक इमेज आणि तुमची नवीन टॅगलाईन --- */}
          <div 
            style={{
              width: '100%',
              height: '550px', 
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 20px',
              marginTop: '60px',
              backgroundColor: '#002D5E', 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/truck-bg.png')`,
              backgroundSize: 'contain', 
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <h2 style={{ 
                color: '#fff', 
                fontSize: '42px', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                textShadow: '3px 3px 10px rgba(0,0,0,0.8)' 
              }}>
                One Solution for All Logistics
              </h2>
            </div>
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
    </div>
  );
};

// Styles
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

export default CourierService;