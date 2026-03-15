import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  CreditCard, 
  PlusCircle
} from 'lucide-react';

// Firebase Imports
import { database } from '../firebase'; 
import { ref, onValue } from "firebase/database";

const MSMEDashboard = ({ businessName }) => {
  // --- नवीन स्टेट: डेटाबेस मधून येणाऱ्या व्हॅल्यूज ---
  const [dbStats, setDbStats] = useState({
    totalOrders: "0",
    inTransit: "0",
    pendingPayments: "₹0"
  });

  useEffect(() => {
    // समजा आपण युजरचे आकडे 'msme_profile/stats' मध्ये ठेवणार आहोत
    const statsRef = ref(database, 'msme_profile/stats');
    
    const unsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDbStats({
          totalOrders: data.totalOrders || "0",
          inTransit: data.inTransit || "0",
          pendingPayments: data.pendingPayments || "₹0"
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const stats = [
    { title: "Total Orders", value: dbStats.totalOrders, icon: <Package size={24} />, color: "#004080" },
    { title: "In Transit", value: dbStats.inTransit, icon: <Truck size={24} />, color: "#f39c12" },
    { title: "Pending Payments", value: dbStats.pendingPayments, icon: <CreditCard size={24} />, color: "#e74c3c" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#004080', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' }}>Apni Manzil</h2>
        <nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer', opacity: 1 }}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer', opacity: 0.7 }}>
            <Package size={20} /> My Shipments
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer', opacity: 0.7 }}>
            <CreditCard size={20} /> Payments
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ margin: 0, color: '#333' }}>Welcome, {businessName || "Business Owner"}!</h1>
            <p style={{ color: '#666', marginTop: '5px' }}>Here is your business logistics overview.</p>
          </div>
          
          <button style={{ 
            backgroundColor: '#004080', 
            color: 'white', 
            padding: '12px 24px', 
            borderRadius: '8px', 
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <PlusCircle size={20} /> New Shipment
          </button>
        </header>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              borderLeft: `5px solid ${stat.color}`
            }}>
              <div style={{ color: '#888', marginBottom: '10px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }}>{stat.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{stat.value}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Placeholder */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Shipments</h3>
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#999' }}>No active shipments found. Start by creating a new shipment!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSMEDashboard;