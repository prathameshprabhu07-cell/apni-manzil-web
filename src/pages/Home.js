import React, { useState } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('courier');

  const services = {
    courier: {
      title: "Courier & Parcel",
      desc: "Door-to-door delivery for documents and small parcels across 19,000+ pincodes.",
      icon: "📦"
    },
    transport: {
      title: "Full Truck / Tempo",
      desc: "Reliable fleet for heavy loads. Full truck (FTL) and Part load (LTL) services.",
      icon: "🚛"
    },
    msme: {
      title: "MSME & B2B",
      desc: "Dedicated logistics for businesses with GST billing and recurring shipments.",
      icon: "🏢"
    },
    movers: {
      title: "Packers & Movers",
      desc: "Stress-free home and office shifting with professional handling.",
      icon: "🏠"
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* 1. Hero Section - The "Trust" Builder */}
      <section className="text-center py-5 text-white" style={{
        background: 'linear-gradient(45deg, #0056b3, #002d5b)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h1 className="display-4 fw-bold mb-3">Apni Manzil</h1>
        <p className="fs-4 mb-4">One Solution for All Deliveries — Serving All Over India</p>
        
        <div className="container mt-2">
          <div className="row justify-content-center">
            <div className="col-md-8 bg-white p-2 rounded-pill shadow-lg d-flex align-items-center">
              <input 
                type="text" 
                className="form-control border-0 px-4 rounded-pill" 
                placeholder="Enter Tracking ID to follow your shipment..." 
              />
              <button className="btn btn-success rounded-pill px-4 fw-bold">Track Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Aggregator Dashboard - The "Easy to Use" Hub */}
      <div className="container mt-n5" style={{ marginTop: '-50px' }}>
        <div className="card shadow border-0 rounded-4">
          <div className="card-body p-0">
            {/* Service Tabs */}
            <div className="d-flex border-bottom overflow-auto bg-light rounded-top-4">
              {Object.keys(services).map((key) => (
                <button 
                  key={key}
                  className={`flex-fill py-3 px-4 border-0 fw-bold text-nowrap ${activeTab === key ? 'bg-white text-primary border-bottom border-primary border-3' : 'text-secondary'}`}
                  onClick={() => setActiveTab(key)}
                  style={{ transition: '0.3s' }}
                >
                  <span className="me-2">{services[key].icon}</span> {services[key].title}
                </button>
              ))}
            </div>

            {/* Dynamic Booking Form Area */}
            <div className="p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h2 className="fw-bold mb-3 text-primary">{services[activeTab].title}</h2>
                  <p className="text-muted mb-4 fs-5">{services[activeTab].desc}</p>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="small fw-bold text-uppercase text-secondary">Pickup Pincode</label>
                      <input type="text" className="form-control bg-light p-3" placeholder="From (e.g. 416520)" />
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold text-uppercase text-secondary">Delivery Pincode</label>
                      <input type="text" className="form-control bg-light p-3" placeholder="To (e.g. 400001)" />
                    </div>
                    <div className="col-12 mt-3">
                      <button className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-3">
                        Get Instant Quote on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block text-center">
                   <div style={{ fontSize: '150px' }}>{services[activeTab].icon}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Scale-Up Section (For Partners) */}
      <section className="container my-5 py-5 text-center">
        <h2 className="fw-bold mb-4">Grow Your Business with Apni Manzil</h2>
        <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '700px' }}>
          Are you a Transporter, Courier Agent, or Packer & Mover? Join India's fastest-growing logistics network and get more leads daily.
        </p>
        <button className="btn btn-outline-primary btn-lg px-5 rounded-pill fw-bold">
          Register as a Partner
        </button>
      </section>

      {/* 4. Trust Indicators */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-3">
              <h3 className="fw-bold text-primary">19,000+</h3>
              <p className="small text-muted text-uppercase">Pincodes Covered</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-primary">500+</h3>
              <p className="small text-muted text-uppercase">Verified Partners</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-primary">24/7</h3>
              <p className="small text-muted text-uppercase">Support Available</p>
            </div>
            <div className="col-md-3">
              <h3 className="fw-bold text-primary">100%</h3>
              <p className="small text-muted text-uppercase">Safe Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;