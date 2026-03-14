import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart3, Globe2, Truck, CheckCircle2 } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const sectionStyle = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const benefitCardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
    transition: 'transform 0.3s ease'
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', color: '#333' }}>
      
      {/* 1. Header/Hero Section */}
      <div style={{ 
        backgroundColor: '#004080', 
        color: 'white', 
        padding: '100px 20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #004080 0%, #002d59 100%)'
      }}>
        <h1 style={{ fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px' }}>Redefining Indian Logistics</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6', opacity: 0.9 }}>
          Apni Manzil is a tech-driven logistics platform dedicated to providing seamless, safe, and highly reliable supply chain solutions across the Indian subcontinent.
        </p>
      </div>

      {/* 2. Our Vision & Platform Strategy */}
      <div style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#004080', fontSize: '2.4rem', marginBottom: '25px', fontWeight: 'bold' }}>The Apni Manzil Edge</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              In a fragmented market like Indian logistics, **Apni Manzil** acts as a unified digital bridge. Our platform integrates advanced route optimization, real-time tracking, and a massive network of verified partners.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Our mission is to empower Indian businesses—from growing MSMEs to large corporations—by removing logistical hurdles and ensuring every shipment reaches its destination with absolute security.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ backgroundColor: '#eef4ff', height: '400px', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Truck size={150} color="#004080" opacity={0.2} />
               <div style={{ position: 'absolute', bottom: '30px', left: '-20px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 color="#008a5e" />
                    <span style={{ fontWeight: 'bold' }}>100% Secure Transit</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Customer Benefits Grid */}
      <div style={{ backgroundColor: '#f9fbff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#004080', fontSize: '2.2rem', marginBottom: '50px', fontWeight: 'bold' }}>Why Choose Our Platform?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={benefitCardStyle}>
              <ShieldCheck size={40} color="#008a5e" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '12px' }}>Safety First Policy</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>We implement strict packaging guidelines and secure handling protocols to ensure a zero-damage transit experience.</p>
            </div>

            <div style={benefitCardStyle}>
              <Zap size={40} color="#f57c00" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '12px' }}>Real-Time Visibility</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>Our advanced API-driven tracking system provides bird's-eye view updates from pick-up to the final mile.</p>
            </div>

            <div style={benefitCardStyle}>
              <BarChart3 size={40} color="#1976d2" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '12px' }}>Cost Efficiency</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>By optimizing routes and consolidating loads, we offer professional logistics at highly competitive market rates.</p>
            </div>

            <div style={benefitCardStyle}>
              <Globe2 size={40} color="#6a1b9a" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '12px' }}>Pan-India Network</h3>
              <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>A robust logistics infrastructure connecting remote villages to major metropolitan hubs seamlessly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Our Commitment */}
      <div style={{ ...sectionStyle, textAlign: 'center' }}>
        <h2 style={{ color: '#004080', fontSize: '2.2rem', marginBottom: '20px', fontWeight: 'bold' }}>Our Commitment</h2>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
          We don’t just deliver packages; we deliver trust. At **Apni Manzil**, we are building an ecosystem where safety, reliability, and speed are not just features—they are our core pillars.
        </p>
      </div>

      {/* 5. Call to Action */}
      <div style={{ 
        backgroundColor: '#004080', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>Grow Your Business With Us</h2>
        <p style={{ marginBottom: '40px', opacity: 0.8, fontSize: '1.1rem' }}>Experience the new standard of professional logistics in India.</p>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            backgroundColor: '#008a5e', 
            color: 'white', 
            border: 'none', 
            padding: '18px 45px', 
            borderRadius: '50px', 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#006d4a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#008a5e'}
        >
          Get a Quote Now
        </button>
      </div>

    </div>
  );
};

export default About;