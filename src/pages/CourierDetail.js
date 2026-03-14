import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const CourierDetail = () => {
  const navigate = useNavigate(); // Back जाण्यासाठी navigate वापरूया

  const courierOptions = [
    { title: "Domestic Courier", desc: "India madhe kuthehi" },
    { title: "International Courier", desc: "Jagbharat kuthehi" },
    { title: "Express / Same Day", desc: "Fastest delivery" },
    { title: "Surface Courier", desc: "Economy (Truck/Road)" },
    { title: "Air Courier", desc: "Fast (Flight)" },
    { title: "Bulk Courier", desc: "Business & MSME" },
    { title: "In-City Courier", desc: "Local delivery" },
    { title: "Government Speed Post", desc: "Postal service" },
    { title: "Safe Document Service", desc: "High security" }
  ];

  return (
    <div className="container py-5" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Back to Home Button */}
      <button 
        className="btn btn-outline-primary mb-4" 
        onClick={() => navigate('/')} // Home वर परत जाण्यासाठी
        style={{ borderRadius: '20px' }}
      >
        <FiArrowLeft /> Back to Home
      </button>
      
      <h2 className="fw-bold mb-4" style={{ color: '#004080' }}>Select Your Courier Service</h2>
      
      <div className="row g-3">
        {courierOptions.map((opt, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 border-0 shadow-sm p-4 rounded-4" style={{ transition: '0.3s', backgroundColor: '#fff' }}>
              <h6 className="fw-bold text-primary mb-2">
                <FiCheckCircle className="me-2" color="#008a5e"/>
                {opt.title}
              </h6>
              <p className="text-muted small mb-3">{opt.desc}</p>
              <button 
                className="btn btn-success btn-sm w-100 rounded-pill"
                style={{ backgroundColor: '#008a5e', border: 'none' }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourierDetail;