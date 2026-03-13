import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, Home, Building2, Globe, Search } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'courier', title: 'Courier & Parcel', icon: <Package size={40} />, desc: 'Swift door-to-door delivery' },
    { id: 'transport', title: 'Full Truck / Tempo', icon: <Truck size={40} />, desc: 'B2B & Industrial transport' },
    { id: 'packers', title: 'Packers & Movers', icon: <Home size={40} />, desc: 'Safe home & office shifting' },
    { id: 'msme', title: 'MSME & Business', icon: <Building2 size={40} />, desc: 'Bulk logistics for industries' },
    { id: 'trade', title: 'Import & Export', icon: <Globe size={40} />, desc: 'Global trade & sea freight' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #003366 0%, #004080 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Apni Manzil Services</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>One Solution for All Your Logistics Needs</p>
        
        {/* Tracking Bar */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', background: 'white', borderRadius: '30px', padding: '5px 15px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. AM123456)" 
              style={{ border: 'none', outline: 'none', flex: 1, padding: '10px', borderRadius: '30px' }}
            />
            <button style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Our Premium Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => navigate(`/${service.id}`)}
              style={{
                background: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ color: '#004080', marginBottom: '15px' }}>{service.icon}</div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{service.title}</h5>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <footer style={{ textAlign: 'center', padding: '20px', color: '#888', fontSize: '0.8rem' }}>
        © 2026 Apni Manzil Logistics Solutions. All Rights Reserved.
      </footer>
    </div>
  );
};

export default HomePage;