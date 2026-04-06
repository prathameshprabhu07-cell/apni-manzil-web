import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Ship, Package, FileCheck, MapPin, LogOut, Globe, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const EXIMDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/exim-login');
      return;
    }

    // १. फक्त या लॉगिन असलेल्या व्यापाऱ्याच्या (uid) ऑर्डर्स दाखवणे
    const q = query(
      collection(db, "bookings"), 
      where("userId", "==", user.uid),
      where("serviceType", "==", "Import-Export")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShipments(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/exim-login');
  };

  const statCard = (title, value, icon, color) => (
    <div style={{ ...cardStyle, borderLeft: `6px solid ${color}` }}>
      <div style={{ color: color }}>{icon}</div>
      <div>
        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '20px', fontWeight: '900' }}>{value}</div>
      </div>
    </div>
  );

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading EXIM Data...</div>;

  return (
    <div style={{ padding: '30px', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#002D5E', margin: 0, fontWeight: '900' }}>
            <Globe size={28} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
            EXIM <span style={{ color: '#FF5E00' }}>CLIENT PORTAL</span>
          </h1>
          <p style={{ color: '#64748b' }}>Welcome back, {user?.email}</p>
        </div>
        <button onClick={handleLogout} style={logoutBtnStyle}><LogOut size={18} /> Logout</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {statCard("TOTAL SHIPMENTS", shipments.length, <Ship />, "#002D5E")}
        {statCard("IN TRANSIT", shipments.filter(s => s.status === "In Transit").length, <Package />, "#FF5E00")}
        {statCard("CUSTOMS CLEARED", shipments.filter(s => s.status === "Delivered").length, <FileCheck />, "#10b981")}
      </div>

      {/* Shipment Table */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '20px' }}>Active Global Shipments</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '12px', borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '15px' }}>SHIPMENT DETAILS</th>
                <th style={{ padding: '15px' }}>ORIGIN ➔ DESTINATION</th>
                <th style={{ padding: '15px' }}>STATUS</th>
                <th style={{ padding: '15px' }}>DOCUMENTS</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>No shipments found. Start a new trade booking!</td></tr>
              ) : (
                shipments.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ fontWeight: 'bold' }}>{s.cargoType || 'General Cargo'}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: {s.id.slice(0, 10)}</div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ fontSize: '13px' }}>{s.pickupAddress} ➔ {s.dropAddress}</div>
                      <div style={{ fontSize: '11px', color: '#FF5E00' }}><Clock size={10} /> ETA: {s.eta || 'Pending'}</div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', backgroundColor: '#E0F2FE', color: '#0369a1' }}>
                        {s.status || 'PROCESSING'}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <button style={{ color: '#002D5E', border: '1px solid #002D5E', background: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px' }}>
                        View Invoice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  backgroundColor: 'white', padding: '20px', borderRadius: '15px', 
  display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
};

const logoutBtnStyle = {
  backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px 20px', 
  borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'
};

export default EXIMDashboard;