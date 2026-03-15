import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
// Firebase Imports
import { db } from '../firebase'; 
import { ref, get, child } from "firebase/database";

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const dbRef = ref(db);
      // 'bookings' नोडमधून डेटा मिळवणे
      const snapshot = await get(child(dbRef, `bookings`));

      if (snapshot.exists()) {
        const bookings = snapshot.val();
        // युजरने टाकलेला ID डेटाबेसमध्ये शोधणे
        const foundOrder = Object.values(bookings).find(
          (order) => order.orderId === trackingId.trim()
        );

        if (foundOrder) {
          setTrackingData(foundOrder);
        } else {
          setError('Invalid Tracking ID. Please check and try again.');
        }
      } else {
        setError('No shipments found in our records.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again.');
    }
    setLoading(false);
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
                placeholder="Ex: AMZ123456" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                required
              />
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                {loading ? '...' : <><FiSearch /> Track</>}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger rounded-4">
                <FiAlertCircle /> {error}
              </div>
            )}

            {/* Shipment Status Display */}
            {trackingData && (
              <div className="text-start animate-fade-in">
                <h5 className="fw-bold text-primary mb-4 border-bottom pb-2">
                  Shipment Status: {trackingData.orderId}
                </h5>
                <div className="position-relative ps-4 border-start border-2 border-primary ms-2">
                  
                  {/* Status 1: Order Placed */}
                  <div className="mb-4 position-relative">
                    <FiCheckCircle className="position-absolute text-success bg-white" style={{left: '-32px', fontSize: '20px'}} />
                    <p className="mb-0 fw-bold">Order Placed</p>
                    <small className="text-muted">{trackingData.bookingDate}</small>
                  </div>

                  {/* Status 2: Current Status (In Transit / Pending etc) */}
                  <div className="mb-4 position-relative">
                    <FiMapPin className="position-absolute text-primary bg-white" style={{left: '-32px', fontSize: '20px'}} />
                    <p className="mb-0 fw-bold">{trackingData.status || 'Processing'}</p>
                    <small className="text-muted">Receiver: {trackingData.receiverName}</small>
                    <br />
                    <small className="text-muted">Destination: {trackingData.deliveryAddress}</small>
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