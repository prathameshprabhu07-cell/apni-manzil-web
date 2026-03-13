import React, { useState } from 'react';

const Partner = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    vehicleType: 'Truck',
    service: 'Transport'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // WhatsApp lead generation logic
    const message = `Hi Apni Manzil, I want to join as a Partner.%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*City:* ${formData.city}%0A*Vehicle:* ${formData.vehicleType}%0A*Service:* ${formData.service}`;
    window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${message}`, '_blank');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="fw-bold text-center text-primary mb-4">Partner with Apni Manzil</h2>
            <p className="text-center text-muted mb-4">Join India's largest logistics network and grow your business 3x.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name / Company Name</label>
                <input type="text" className="form-control p-3 bg-light border-0" placeholder="Enter name" required 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Mobile Number (WhatsApp)</label>
                <input type="tel" className="form-control p-3 bg-light border-0" placeholder="Enter WhatsApp number" required 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Your City (Main Operating Area)</label>
                <input type="text" className="form-control p-3 bg-light border-0" placeholder="e.g. Kudal, Mumbai, Delhi" required 
                  onChange={(e) => setFormData({...formData, city: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Service Type</label>
                <select className="form-select p-3 bg-light border-0" 
                  onChange={(e) => setFormData({...formData, service: e.target.value})}>
                  <option value="Transport">Transport (FTL/LTL)</option>
                  <option value="Courier">Courier / Parcel Agency</option>
                  <option value="Movers">Packers & Movers</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-3 fw-bold mt-3 rounded-pill shadow">
                Submit Application via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;