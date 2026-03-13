import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, HomeIcon, Building2, Globe, Search, Cpu, PlaneTakeoff, Ship, Receipt, Handshake } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // Services Data - Updated to Include Import-Export and Other New Sections
  const services = [
    { 
      id: 'courier', 
      title: 'Courier Services', 
      desc: 'Domestic & International', 
      icon: <Package size={30} color="#008a5e" />, 
      btnColor: '#008a5e' 
    },
    { 
      id: 'transport', 
      title: 'Transport', 
      desc: 'Heavy & Full Truck', 
      icon: <Truck size={30} color="#e64a19" />, 
      btnColor: '#e64a19' 
    },
    { 
      id: 'packers', 
      title: 'Packers & Movers', 
      desc: 'Safe Home Shifting', 
      icon: <HomeIcon size={30} color="#f57c00" />, 
      btnColor: '#f57c00' 
    },
    { 
      id: 'msme', 
      title: 'Business MSME', 
      desc: 'Bulk B2B Solutions', 
      icon: <Building2 size={30} color="#1976d2" />, 
      btnColor: '#1976d2' 
    },
    { 
      id: 'importexport', 
      title: 'Import & Export', 
      desc: 'Global Trade & Logistics', 
      icon: <Globe size={30} color="#6a1b9a" />, // Premium Purple
      btnColor: '#6a1b9a' 
    },
    { 
      id: 'airfreight', 
      title: 'Air Freight', 
      desc: 'Fast Cargo Services', 
      icon: <PlaneTakeoff size={30} color="#4fc3f7" />, 
      btnColor: '#4fc3f7' 
    },
    { 
      id: 'seafreight', 
      title: 'Sea Freight', 
      desc: 'Cost-Effective Cargo', 
      icon: <Ship size={30} color="#1a237e" />, 
      btnColor: '#1a237e' 
    },
    { 
      id: 'customs', 
      title: 'Customs Clearance', 
      desc: 'Hassle-Free Documentation', 
      icon: <Receipt size={30} color="#ffd600" />, 
      btnColor: '#ffd600' 
    },
    { 
      id: 'tradefinance', 
      title: 'Trade Finance', 
      desc: 'Funding for International Trade', 
      icon: <Handshake size={30} color="#d32f2f" />, 
      btnColor: '#d32f2f' 
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Navbar Section */}
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
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', margin: 0 }}>Apni Manzil Services</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '10px' }}>Fast, Secure, and Reliable Logistics Solutions</p>
        
        {/* Tracking ID Bar */}
        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '30px', display: 'flex', width: '100%', maxWidth: '600px', padding: '5px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              placeholder="Enter Tracking ID to follow your shipment..." 
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 20px', borderRadius: '30px' }}
            />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div style={{ maxWidth: '1200px', margin: '-40px auto 50px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          {services.map((s) => (
            <div key={s.id} style={{ 
              backgroundColor: 'white', 
              padding: '25px 15px', 
              borderRadius: '10px', 
              textAlign: 'center', 
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate(`/${s.id}`)}
            >
              <div style={{ marginBottom: '10px' }}>{s.icon}</div>
              <h5 style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem', margin: '0' }}>{s.title}</h5>
              <p style={{ color: '#777', fontSize: '0.8rem', marginBottom: '15px', marginTop: '5px' }}>{s.desc}</p>
              <button 
                style={{ 
                  backgroundColor: s.btnColor, 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 20px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Tech Icons Section */}
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', paddingBottom: '40px', color: '#777' }}>
        <div style={{ textAlign: 'center' }}>
          <Globe size={20} />
          <p style={{ fontSize: '0.75rem', marginTop: '5px', margin: '0' }}>International</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Search size={20} />
          <p style={{ fontSize: '0.75rem', marginTop: '5px', margin: '0' }}>Tracking</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Cpu size={20} />
          <p style={{ fontSize: '0.75rem', marginTop: '5px', margin: '0' }}>AI Logistics</p>
        </div>
      </div>

    </div>
  );
};

export default Home;