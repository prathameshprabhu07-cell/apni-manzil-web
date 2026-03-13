import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Home as HomeIcon, 
  Building2, 
  Globe, 
  Search, 
  Cpu, 
  PlaneTakeoff, 
  Ship, 
  Receipt, 
  Handshake 
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'courier', title: 'Courier Services', desc: 'Domestic & International', icon: <Package size={30} color="#008a5e" />, btnColor: '#008a5e' },
    { id: 'transport', title: 'Transport', desc: 'Heavy & Full Truck', icon: <Truck size={30} color="#e64a19" />, btnColor: '#e64a19' },
    { id: 'packers', title: 'Packers & Movers', desc: 'Safe Home Shifting', icon: <HomeIcon size={30} color="#f57c00" />, btnColor: '#f57c00' },
    { id: 'msme', title: 'Business MSME', desc: 'Bulk B2B Solutions', icon: <Building2 size={30} color="#1976d2" />, btnColor: '#1976d2' },
    { id: 'importexport', title: 'Import & Export', desc: 'Global Trade & Logistics', icon: <Globe size={30} color="#6a1b9a" />, btnColor: '#6a1b9a' },
    { id: 'airfreight', title: 'Air Freight', desc: 'Fast Cargo Services', icon: <PlaneTakeoff size={30} color="#4fc3f7" />, btnColor: '#4fc3f7' },
    { id: 'seafreight', title: 'Sea Freight', desc: 'Cost-Effective Cargo', icon: <Ship size={30} color="#1a237e" />, btnColor: '#1a237e' },
    { id: 'customs', title: 'Customs Clearance', desc: 'Hassle-Free Documentation', icon: <Receipt size={30} color="#ffd600" />, btnColor: '#ffd600' },
    { id: 'tradefinance', title: 'Trade Finance', desc: 'Funding for Global Trade', icon: <Handshake size={30} color="#d32f2f" />, btnColor: '#d32f2f' }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#004080', fontWeight: 'bold', margin: 0 }}>Apni Manzil</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#555' }}>Home</span>
          <span style={{ cursor: 'pointer', color: '#555' }}>Tracking</span>
          <button style={{ backgroundColor: '#004080', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }}>Apni Manzil</h1>
        
        {/* हा तो मुख्य बदल जो तुम्ही सांगितलात */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginTop: '15px', color: '#ffffff', textTransform: 'uppercase' }}>
          One Solution For All Deliveries — Serving All Over India
        </h2>
        
        <p style={{ fontSize: '1.2rem', marginTop: '10px', opacity: 0.9 }}>
          Reliable Logistics & Global Supply Chain Solutions
        </p>
        
        {/* Tracking Bar */}
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '35px', display: 'flex', width: '100%', maxWidth: '650px', padding: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. AMZ12345)" 
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '35px', fontSize: '1rem' }}
            />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 35px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: '0.3s' }}>
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: '1240px', margin: '-50px auto 50px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '20px' 
        }}>
          {services.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '30px 20px', 
              borderRadius: '15px', 
              textAlign: 'center', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderBottom: `4px solid ${s.btnColor}`
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate(`/${s.id}`)}
            >
              <div style={{ marginBottom: '15px' }}>{s.icon}</div>
              <h5 style={{ fontWeight: 'bold', color: '#222', fontSize: '1.1rem', margin: '0' }}>{s.title}</h5>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px', marginTop: '8px', lineHeight: '1.4' }}>{s.desc}</p>
              <button 
                style={{ 
                  backgroundColor: s.btnColor, 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '25px', 
                  fontSize: '0.85rem', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                Explore Service
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ textAlign: 'center', paddingBottom: '40px', color: '#888' }}>
        <p>© 2026 Apni Manzil Logistics Solutions. All India Network.</p>
      </div>

    </div>
  );
};

export default Home;