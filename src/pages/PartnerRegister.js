import React, { useState } from 'react';

const PartnerRegister = () => {
  const [formData, setFormData] = useState({
    ownerName: '', firmName: '', vehicleType: '', vehicleNumber: '', route: '', contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Navin Partner Registration*%0A*Firm:* ${formData.firmName}%0A*Owner:* ${formData.ownerName}%0A*Vehicle:* ${formData.vehicleType} (${formData.vehicleNumber})%0A*Route:* ${formData.route}%0A*Contact:* ${formData.contact}`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 p-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
            <h2 className="fw-bold text-primary text-center mb-4">Partner With Us</h2>
            <p className="text-center text-muted mb-4">Tumche Trucks 'Apni Manzil' sobat joda ani business vadhva.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><input type="text" placeholder="Firm/Company Name" className="form-control" required onChange={(e)=>setFormData({...formData, firmName: e.target.value})} /></div>
              <div className="mb-3"><input type="text" placeholder="Owner Name" className="form-control" required onChange={(e)=>setFormData({...formData, ownerName: e.target.value})} /></div>
              <div className="mb-3">
                <select className="form-select" required onChange={(e)=>setFormData({...formData, vehicleType: e.target.value})}>
                  <option value="">Select Vehicle Type</option>
                  <option value="Tempo">Tempo (Small)</option>
                  <option value="Truck">Truck (Open/Container)</option>
                  <option value="Trailer">Trailer / Heavy</option>
                </select>
              </div>
              <div className="mb-3"><input type="text" placeholder="Vehicle Number (MH-XX-XXXX)" className="form-control" required onChange={(e)=>setFormData({...formData, vehicleNumber: e.target.value})} /></div>
              <div className="mb-3"><input type="text" placeholder="Preferred Route (e.g. Pune to Mumbai)" className="form-control" required onChange={(e)=>setFormData({...formData, route: e.target.value})} /></div>
              <div className="mb-3"><input type="number" placeholder="WhatsApp Contact Number" className="form-control" required onChange={(e)=>setFormData({...formData, contact: e.target.value})} /></div>
              
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-pill shadow">Register as Partner</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;