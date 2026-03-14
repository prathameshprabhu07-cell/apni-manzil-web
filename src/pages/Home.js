import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Home as HomeIcon, 
  Building2, 
  Globe, 
  PlaneTakeoff, 
  Ship, 
  Receipt, 
  Handshake,
  CheckCircle
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

  const statCardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 1. Main Navbar */}
      <nav style={{ backgroundColor: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 onClick={() => navigate('/')} style={{ color: '#004080', fontWeight: 'bold', margin: 0, cursor: 'pointer' }}>Apni Manzil</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#555' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ cursor: 'pointer', color: '#555' }}>Tracking</span>
          <button style={{ backgroundColor: '#004080', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </div>
      </nav>

      {/* 2. Secondary Services Bar - Corrected Paths */}
      <div style={{ 
        backgroundColor: '#fff', 
        borderBottom: '1px solid #eee', 
        padding: '12px 0', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '25px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
      }}>
        {[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '#' },
          { name: 'Courier Services', path: '/courier' },
          { name: 'Transport', path: '/transport' },
          { name: 'International', path: '/importexport' },
          { name: 'Business MSME', path: '/msme' },
          { name: 'Partner Registration', path: '/partner-registration' },
          { name: 'Help Centre', path: '/help' }
        ].map((item, index) => (
          <span 
            key={index}
            onClick={() => item.path !== '#' && navigate(item.path)}
            style={{ 
              cursor: 'pointer', 
              fontSize: '0.85rem', 
              color: '#444', 
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => e.target.style.color = '#004080'}
            onMouseOut={(e) => e.target.style.color = '#444'}
          >
            {item.name}
          </span>
        ))}
      </div>

      {/* 3. Hero Section */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }}>Apni Manzil</h1>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginTop: '15px', color: '#ffffff', textTransform: 'uppercase' }}>
          One Solution For All Deliveries — Serving All Over India
        </h2>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', opacity: 0.9 }}>
          Reliable Logistics & Global Supply Chain Solutions
        </p>
        
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '35px', display: 'flex', width: '100%', maxWidth: '650px', padding: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. AMZ12345)" 
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '35px', fontSize: '1rem', color: '#333' }}
            />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 35px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* 4. Services Grid */}
      <div style={{ maxWidth: '1240px', margin: '-50px auto 50px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '20px' 
        }}>
          {services.map((s) => (
            <div key={s.id} 
            onClick={() => navigate(`/${s.id}`)}
            style={{ 
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
                  width: '100%'
                }}>
                Explore Service
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Logistics Details Section */}
      <div style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            
            <div>
              <h2 style={{ color: '#004080', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '20px' }}>India's Trusted Logistics Network</h2>
              <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>
                Apni Manzil provides end-to-end supply chain solutions. From local courier deliveries to complex international freight, we ensure your cargo reaches its destination safely and on time.
              </p>
              <div style={{ marginTop: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} />
                  <span>24/7 Real-time Asset Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} />
                  <span>Optimized Route Planning for Faster Delivery</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} />
                  <span>Secure Warehousing and Distribution</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={statCardStyle}>
                <h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>15k+</h3>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>Pincodes Covered</p>
              </div>
              <div style={statCardStyle}>
                <h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>500+</h3>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>Trucks on Road</p>
              </div>
              <div style={statCardStyle}>
                <h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>1M+</h3>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>Deliveries Completed</p>
              </div>
              <div style={statCardStyle}>
                <h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>99%</h3>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>On-Time Rate</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', backgroundColor: '#f8f9fa' }}>
        <p>© 2026 Apni Manzil Logistics Solutions. All India Network.</p>
      </div>

    </div>
  );
};

export default Home;