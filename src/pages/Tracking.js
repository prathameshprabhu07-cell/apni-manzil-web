import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if(trackingId) setShowStatus(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-lg border-0 rounded-4 p-5 text-center" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <h2 className="fw-bold text-dark mb-4">Track Your Shipment</h2>
            <p className="text-muted">Tumcha Docket Number kiva Tracking ID taka.</p>
            
            <form onSubmit={handleTrack} className="d-flex gap-2 mb-5">
              <input 
                type="text" 
                className="form-control form-control-lg rounded-pill px-4 shadow-sm" 
                placeholder="Ex: AM12345678" 
                onChange={(e) => setTrackingId(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                <FiSearch /> Track
              </button>
            </form>

            {showStatus && (
              <div className="text-start animate-fade-in">
                <h5 className="fw-bold text-primary mb-4 border-bottom pb-2">Shipment Status: {trackingId}</h5>
                <div className="position-relative ps-4 border-start border-2 border-primary ms-2">
                  <div className="mb-4 position-relative">
                    <FiCheckCircle className="position-absolute text-success bg-white" style={{left: '-32px', fontSize: '20px'}} />
                    <p className="mb-0 fw-bold">Order Placed</p>
                    <small className="text-muted">Today - 10:30 AM</small>
                  </div>
                  <div className="mb-4 position-relative">
                    <FiMapPin className="position-absolute text-primary bg-white" style={{left: '-32px', fontSize: '20px'}} />
                    <p className="mb-0 fw-bold">In Transit</p>
                    <small className="text-muted">Location: Mumbai Warehouse</small>
                  </div>
                </div>
                <div className="alert alert-info border-0 rounded-4 mt-4">
                  <small><strong>Note:</strong> He status 10-15 minutani update hote.</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;