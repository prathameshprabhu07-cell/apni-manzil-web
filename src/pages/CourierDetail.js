import React from 'react';

const CourierDetail = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#004080' }}>Courier Services</h1>
      <p>We provide the fastest domestic and international courier services.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3>Domestic Delivery</h3>
          <p>Delivery across 27,000+ pincodes in India.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h3>International Shipping</h3>
          <p>Global reach to 200+ countries.</p>
        </div>
      </div>
      {/* तू इथे तुझा रेट कॅल्क्युलेटर पुन्हा कॉल करू शकतोस */}
    </div>
  );
};

export default CourierDetail;