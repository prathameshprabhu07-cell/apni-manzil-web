import React from 'react';
import { FiUsers, FiTruck, FiActivity, FiPieChart } from 'react-icons/fi';

const AdminDashboard = () => {
  // Temporary data (Nantar apan yala live karu)
  const stats = [
    { label: 'Total Visits', count: '1,250', icon: <FiUsers />, color: '#3498db' },
    { label: 'Service Bookings', count: '85', icon: <FiActivity />, color: '#2ecc71' },
    { label: 'Partner Requests', count: '12', icon: <FiTruck />, color: '#e67e22' },
  ];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-dark">Admin Control Center</h2>
      
      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div className="card border-0 shadow-sm p-4 rounded-4 text-white" style={{ backgroundColor: stat.color }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-uppercase mb-1" style={{ opacity: 0.8 }}>{stat.label}</h6>
                  <h2 className="fw-bold mb-0">{stat.count}</h2>
                </div>
                <div style={{ fontSize: '2.5rem', opacity: 0.5 }}>{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Business Overview Section */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
            <h5 className="fw-bold mb-3"><FiPieChart className="me-2" /> Service Analysis</h5>
            <div className="p-5 text-center bg-light rounded-4">
              <p className="text-muted">Ithe tumhala konti service (Courier, Transport, etc.) jasta chaltiye tyacha graph disel.</p>
              <div className="progress mb-3" style={{ height: '10px' }}>
                <div className="progress-bar bg-success" style={{ width: '70%' }}>Courier (70%)</div>
              </div>
              <div className="progress mb-3" style={{ height: '10px' }}>
                <div className="progress-bar bg-warning" style={{ width: '45%' }}>Transport (45%)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100 bg-white">
            <h5 className="fw-bold mb-3 text-primary">Recent Alerts</h5>
            <ul className="list-unstyled">
              <li className="pb-2 border-bottom mb-2 small">✅ Navin Partner Registration: Shanti Logistics</li>
              <li className="pb-2 border-bottom mb-2 small">📦 Navin Booking: Courier (Pune to Delhi)</li>
              <li className="small">👤 5 Navin visitors last 10 minutat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;