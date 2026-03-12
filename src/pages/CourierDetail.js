import React from 'react';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const CourierDetail = ({ onBack }) => {
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
    <div className="container py-5">
      <button className="btn btn-outline-primary mb-4" onClick={onBack}>
        <FiArrowLeft /> Back to Home
      </button>
      
      <h2 className="fw-bold mb-4">Select Your Courier Service</h2>
      <div className="row g-3">
        {courierOptions.map((opt, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 border-0 shadow-sm p-3 rounded-4 hover-shadow">
              <h6 className="fw-bold text-primary mb-1"><FiCheckCircle className="me-2"/>{opt.title}</h6>
              <p className="text-muted small mb-3">{opt.desc}</p>
              <button className="btn btn-success btn-sm w-100 rounded-pill">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourierDetail;