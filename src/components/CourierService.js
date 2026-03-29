import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });

  const services = [
    { id: 1, name: "Domestic Courier", desc: "Delivery anywhere across India" },
    { id: 2, name: "International Courier", desc: "Worldwide shipping services" },
    { id: 3, name: "Express / Same Day", desc: "Urgent fastest delivery" },
    { id: 4, name: "Surface Courier", desc: "Economy shipping (Road/Truck)" },
    { id: 5, name: "Air Courier", desc: "Priority flight delivery" },
    { id: 6, name: "Bulk Courier", desc: "Special rates for Business & MSMEs" },
    { id: 7, name: "In-City Courier", desc: "Local same-city delivery" },
    { id: 8, name: "Government Speed Post", desc: "Reliable postal services" },
    { id: 9, name: "Safe Document Service", desc: "High-security document handling" },
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
        alert(`Success! Your order has been booked. AWB: ${result.data.awb_number}`);
        setSelectedService(null);
      } else {
        alert("Error: " + (result.error || "Failed to book order. Please try again."));
      }
    } catch (error) {
      alert("Server Connection Error: Please ensure your Render backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#eef2f7', minHeight: '100vh' }}>
      {!selectedService ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#004080', fontWeight: 'bold' }}>
            Select Your Courier Service
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
            {services.map((s) => (
              <div 
                key={s.id} 
                onClick={() => handleServiceSelection(s)}
                style={cardStyle}
              >
                <h3 style={{ color: '#008080' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{s.desc}</p>
                <button style={bookBtnStyle}>Book Now</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← Back to Services</button>
          <h2 style={{ textAlign: 'center', color: '#004080' }}>Booking: {selectedService.name}</h2>
          <form style={formStyle} onSubmit={handleSubmit}>
              <input name="name" placeholder="Receiver Name" style={inputStyle} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" style={inputStyle} onChange={handleChange} required />
              <input name="pincode" placeholder="Pincode" style={inputStyle} onChange={handleChange} required />
              <input name="weight" placeholder="Weight (KG)" type="number" step="0.1" style={inputStyle} onChange={handleChange} required />
              <textarea name="address" placeholder="Complete Delivery Address" style={inputStyle} onChange={handleChange} required />
              <button type="submit" style={confirmBtn} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Order & Dispatch'}
              </button>
          </form>
        </div>
      )}
    </div>
  );
};

const cardStyle = { background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderTop: '4px solid #008080', cursor: 'pointer' };
const bookBtnStyle = { background: '#008080', color: '#fff', border: 'none', padding: '10px 0', width: '100%', borderRadius: '4px', fontWeight: 'bold', marginTop: '10px' };
const formWrapper = { maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

export default CourierService;