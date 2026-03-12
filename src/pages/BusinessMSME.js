import React, { useState } from 'react';
import { FiBriefcase, FiSend, FiCheckCircle } from 'react-icons/fi';

const BusinessMSME = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Ithe nantar apan email logic add karu shakto
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4">
          <h1 className="fw-bold text-primary display-5 mb-3">MSME Logistics Solutions</h1>
          <p className="lead text-dark fw-bold">Tumchya Vyaparala dya 'Apni Manzil' chi saath!</p>
          <ul className="list-unstyled mt-4">
            <li className="mb-3"><FiCheckCircle className="text-success me-2" /> Bulk Shipment Discounts</li>
            <li className="mb-3"><FiCheckCircle className="text-success me-2" /> Monthly Billing Cycle</li>
            <li className="mb-3"><FiCheckCircle className="text-success me-2" /> Dedicated Relationship Manager</li>
            <li className="mb-3"><FiCheckCircle className="text-success me-2" /> Integrated API for E-commerce</li>
          </ul>
        </div>
        
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            {submitted ? (
              <div className="text-center py-5">
                <FiSend size={50} className="text-success mb-3" />
                <h3 className="fw-bold">Request Sent!</h3>
                <p>Amchi team tumhala lavkarach sampark karel.</p>
                <button className="btn btn-primary rounded-pill px-4" onClick={() => setSubmitted(false)}>Back</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 className="fw-bold mb-4">Get a Business Quote</h4>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Company Name" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Business Email ID" required />
                </div>
                <div className="mb-3">
                  <select className="form-select">
                    <option>Monthly Shipment Volume</option>
                    <option>Less than 100 kg</option>
                    <option>100kg - 500kg</option>
                    <option>Above 500kg (Bulk)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="3" placeholder="Tumchi garaj sanga (Details)"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-2 rounded-pill shadow">
                  Submit Business Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMSME;