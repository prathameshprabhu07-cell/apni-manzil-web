import React, { useState } from 'react';
import { Globe, ShieldCheck, Ship, Plane, FileText } from 'lucide-react';

// ✅ WhatsApp Utility Import केली आहे
import { sendWhatsAppNotification } from '../utils/WhatsApp';

const ImportExportDetail = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Import',
    country: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ व्हॉट्सॲप नोटिफिकेशन ट्रिगर करा
    const serviceName = `${formData.type} to/from ${formData.country}`;
    const orderId = "EXIM-" + Math.floor(Math.random() * 100000);
    
    // टेस्टसाठी तुझा नंबर किंवा युजरचा नंबर (सध्या आपण ७३७८५०२३५६ वापरतोय)
    sendWhatsAppNotification("7378502356", formData.name, serviceName, orderId);

    alert("Thank you! Our Export-Import experts will contact you soon on WhatsApp.");
    console.log(formData);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Segoe UI' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Globe size={50} color="#6a1b9a" />
        <h1 style={{ color: '#004080' }}>Global Import & Export Solutions</h1>
        <p>Seamless cross-border logistics for your business</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Left Side: Services Info */}
        <div>
          <h3 style={{ borderBottom: '2px solid #6a1b9a', paddingBottom: '10px' }}>Our Services</h3>
          <div style={{ marginTop: '20px' }}>
            <p><Ship size={18} /> Ocean & Air Freight Management</p>
            <p><ShieldCheck size={18} /> Customs Clearance & Documentation</p>
            <p><FileText size={18} /> Licensing & Compliance Support</p>
            <p><Globe size={18} /> Door-to-Door Delivery (Global)</p>
          </div>
        </div>

        {/* Right Side: Enquiry Form */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
          <h4 style={{ marginBottom: '20px' }}>Request a Quote</h4>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" placeholder="Your Name" required 
              style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" placeholder="Email Address" required 
              style={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <select style={inputStyle} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option value="Import">Import</option>
              <option value="Export">Export</option>
            </select>
            <input 
              type="text" placeholder="Target Country" required 
              style={inputStyle} onChange={(e) => setFormData({...formData, country: e.target.value})}
            />
            <textarea 
              placeholder="Tell us about your cargo..." rows="4" 
              style={inputStyle} onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
            <button type="submit" style={btnStyle}>Send Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none'
};

const btnStyle = {
  width: '100%', padding: '15px', backgroundColor: '#6a1b9a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
};

export default ImportExportDetail;