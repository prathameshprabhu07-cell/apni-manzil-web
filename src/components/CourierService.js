import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    weight: '0.5' 
  });

  const services = [
    { id: 1, name: "Domestic Courier", desc: "India madhe kuthehi" },
    { id: 2, name: "International Courier", desc: "Jagbhar kuthehi" },
    { id: 3, name: "Express / Same Day", desc: "Fastest delivery" },
    { id: 4, name: "Surface Courier", desc: "Economy (Truck/Road)" },
    { id: 5, name: "Air Courier", desc: "Fast (Flight)" },
    { id: 6, name: "Bulk Courier", desc: "Business & MSME" },
    { id: 7, name: "In-City Courier", desc: "Local delivery" },
    { id: 8, name: "Government Speed Post", desc: "Postal service" },
    { id: 9, name: "Safe Document Service", desc: "High security" },
  ];

  // नवीन फंक्शन: बटण क्लिक झाल्यावर नक्की काय व्हायला हवे
  const handleServiceSelection = (service) => {
    console.log("Service Selected:", service.name);
    setSelectedService(service);
    // फॉर्म निवडल्यावर पेज आपोआप वर जाईल जेणेकरून फॉर्म दिसेल
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: "AM-" + Date.now(),
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          pincode: formData.pincode,
          weight: formData.weight,
          service_name: selectedService.name,
          payment_method: "prepaid"
        })
      });

      const result = await response.json();

      if (response.ok && result.status) {
        alert(`यशस्वी! तुमची ऑर्डर बुक झाली. AWB: ${result.data.awb_number}`);
        setSelectedService(null);
      } else {
        alert("त्रुटी: " + (result.error || "ऑर्डर बुक होऊ शकली नाही."));
      }
    } catch (error) {
      alert("सर्व्हर एरर: बॅकएंड (Port 5000) सुरू आहे का तपासा!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#eef2f7', minHeight: '100vh' }}>
      {!selectedService ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#004080' }}>Select Your Courier Service</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {services.map((s) => (
              <div key={s.id} style={cardStyle}>
                <h3 style={{ color: '#008080' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{s.desc}</p>
                {/* बदललेले बटण: handleServiceSelection वापरले आहे */}
                <button 
                  onClick={() => handleServiceSelection(s)} 
                  style={{...bookBtnStyle, cursor: 'pointer', zIndex: 10}}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← मागे जा (Back)</button>
          <h2 style={{ textAlign: 'center' }}>Booking: {selectedService.name}</h2>
          
          <form style={formStyle} onSubmit={handleSubmit}>
              <p style={{ color: '#666' }}>ही सर्व्हिस बुक करण्यासाठी खालील माहिती भरा:</p>
              <input name="name" placeholder="Receiver Name" style={inputStyle} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" style={inputStyle} onChange={handleChange} required />
              <input name="pincode" placeholder="Pincode" style={inputStyle} onChange={handleChange} required />
              <input name="weight" placeholder="Weight in KG (e.g. 0.5)" type="number" step="0.1" style={inputStyle} onChange={handleChange} required />
              <textarea name="address" placeholder="Full Address" style={inputStyle} onChange={handleChange} required />
              
              <button type="submit" style={confirmBtn} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Booking & Dispatch'}
              </button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- STYLES (तुझेच ओरिजनल स्टाईल्स) ---
const cardStyle = { background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderTop: '4px solid #008080' };
const bookBtnStyle = { background: '#008080', color: '#fff', border: 'none', padding: '10px 0', width: '100%', borderRadius: '4px', fontWeight: 'bold' };
const formWrapper = { maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '10px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '20px' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default CourierService;