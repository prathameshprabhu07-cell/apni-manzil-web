import React, { useState } from 'react';
import axios from 'axios';

const CourierDetail = () => {
  const [pincodes, setPincodes] = useState({ pickup: '', delivery: '' });
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkServiceability = async () => {
    if (!pincodes.pickup || !pincodes.delivery) {
      alert("कृपया दोन्ही पिनकोड भरा!");
      return;
    }
    setLoading(true);
    try {
      // हे आपल्या बॅकएंड API ला कॉल करेल जे आपण आधी डिस्कस केलं होतं
      const response = await axios.post('/api/shiprocket', {
        pickup_pincode: pincodes.pickup,
        delivery_pincode: pincodes.delivery,
        weight: "0.5", // साधारण वजन
        cod: 0
      });
      
      setRates(response.data.data.available_courier_companies);
    } catch (error) {
      console.error("Error:", error);
      alert("सर्विस चेक करताना एरर आला. वॉलेट बॅलन्स तपासा.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#004080', textAlign: 'center' }}>Apni Manzil Courier Services</h1>
      <p style={{ textAlign: 'center' }}>भारतात कुठेही पार्सल पाठवण्यासाठी सर्वोत्कृष्ट दरांची पडताळणी करा.</p>
      
      {/* Rate Check Form */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input 
            type="text" 
            placeholder="पिकअप पिनकोड (उदा. मुंबई: 400001)" 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
            onChange={(e) => setPincodes({ ...pincodes, pickup: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="डिलिव्हरी पिनकोड" 
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
            onChange={(e) => setPincodes({ ...pincodes, delivery: e.target.value })}
          />
          <button 
            onClick={checkServiceability}
            style={{ padding: '10px 30px', background: '#004080', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {loading ? 'चेक करत आहे...' : 'दर तपासा'}
          </button>
        </div>
      </div>

      {/* Display Rates */}
      {rates && (
        <div style={{ marginTop: '30px' }}>
          <h3>उपलब्ध सर्विसेस:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {rates.map((courier, index) => (
              <div key={index} style={{ padding: '15px', border: '2px solid #004080', borderRadius: '10px', background: '#fff' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{courier.courier_name}</h4>
                <p>रेट: <b>₹{parseFloat(courier.rate) + 20}</b></p> {/* तू इथे ₹20 तुझा प्रॉफिट ॲड केलायस */}
                <p>अंदाजे दिवस: {courier.etd}</p>
                <button style={{ width: '100%', background: '#28a745', color: 'white', border: 'none', padding: '8px', borderRadius: '5px' }}>बुक करा</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '50px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3>Domestic Delivery</h3>
          <p>Delivery across 27,000+ pincodes in India.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3>International Shipping</h3>
          <p>Global reach to 200+ countries.</p>
        </div>
      </div>
    </div>
  );
};

export default CourierDetail;