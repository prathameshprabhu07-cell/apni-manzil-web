import React from 'react';

const ServiceBanner = () => {
  return (
    <div style={{
      width: '100%',
      height: '350px',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/assets/img/truck-bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>आपली मंझिल - सुरक्षित आणि जलद वाहतूक</h2>
      <p style={{ fontSize: '1.1rem' }}>संपूर्ण भारतात आमची सेवा उपलब्ध आहे.</p>
      <button style={{ padding: '10px 20px', background: '#ffcc00', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>आता संपर्क करा</button>
    </div>
  );
};

export default ServiceBanner;