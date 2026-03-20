import React, { useState } from 'react';

const Tracking = () => {
  const [awbNumber, setAwbNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!awbNumber) return alert("Please enter AWB number!");

    setLoading(true);
    setError('');

    try {
      // Calling your Node.js backend on Port 5000
      const response = await fetch(`http://localhost:5000/api/track/${awbNumber}`);
      const result = await response.json();

      if (response.ok && result.status) {
        setTrackingData(result.data); 
      } else {
        setError("Tracking number not found or technical issue.");
      }
    } catch (err) {
      setError("Could not connect to server. Check if backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-main">
      <h2>Track Your Shipment</h2>
      <form onSubmit={handleTrack}>
        <input 
          type="text" 
          placeholder="Enter AWB Number..." 
          value={awbNumber}
          onChange={(e) => setAwbNumber(e.target.value)}
        />
        <button type="submit">
          {loading ? 'Searching...' : 'Track Now'}
        </button>
      </form>

      {/* Logic to display data if found */}
      {trackingData && (
        <div className="status-card">
          <h3>Status: {trackingData.status}</h3>
          <p>Location: {trackingData.current_location}</p>
        </div>
      )}
    </div>
  );
};

export default Tracking;