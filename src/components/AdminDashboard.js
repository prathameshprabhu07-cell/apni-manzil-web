import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, update } from "firebase/database";
import { Users, Package, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [msmeUsers, setMsmeUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. ऑर्डर्सचा डेटा मिळवणे
    const ordersRef = ref(db, 'bookings');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setOrders(list.reverse());
      }
      setLoading(false);
    });

    // 2. MSME युजर्सची संख्या मोजणे
    const msmeRef = ref(db, 'msme_profile');
    onValue(msmeRef, (snapshot) => {
      if (snapshot.exists()) {
        // जर एकच प्रोफाईल असेल तर १, अनेक असतील तर त्यांची संख्या
        const data = snapshot.val();
        setMsmeUsers(Object.keys(data).length || 1);
      }
    });
  }, []);

  // स्टेटस अपडेट करण्यासाठी फंक्शन
  const updateStatus = (orderKey, newStatus) => {
    const orderRef = ref(db, `bookings/${orderKey}`);
    update(orderRef, { status: newStatus })
      .then(() => alert("Status Updated!"))
      .catch((err) => console.error(err));
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Admin Panel...</div>;

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h2 style={{ color: '#004080', marginBottom: '25px' }}>Apni Manzil - Super Admin</h2>

      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '8px', color: '#1976d2' }}><Users /></div>
          <div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total MSMEs</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{msmeUsers}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#fff3e0', padding: '10px', borderRadius: '8px', color: '#f57c00' }}><Package /></div>
          <div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Orders</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{orders.length}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '8px', color: '#388e3c' }}><TrendingUp /></div>
          <div>
            <div style={{ fontSize: '14px', color: '#666' }}>Site Visits</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Active</div>
          </div>
        </div>
      </div>

      {/* Order Management Table */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '20px' }}>Manage All Bookings</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', color: '#666' }}>
              <th style={{ padding: '12px' }}>Order ID</th>
              <th style={{ padding: '12px' }}>Sender</th>
              <th style={{ padding: '12px' }}>Receiver</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.orderId}</td>
                <td style={{ padding: '12px' }}>{order.senderName} <br/><small>{order.senderPhone}</small></td>
                <td style={{ padding: '12px' }}>{order.receiverName} <br/><small>{order.deliveryAddress?.substring(0, 20)}...</small></td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: order.status === 'Delivered' ? '#e8f5e9' : '#fff3e0',
                    color: order.status === 'Delivered' ? '#2e7d32' : '#ef6c00'
                  }}>
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <select 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    defaultValue={order.status || 'Pending'}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;