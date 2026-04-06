import React, { useState, useEffect } from 'react';
// १. इंपोर्ट नीट तपासा (तुमच्या फोल्डर स्ट्रक्चरनुसार ../firebase असावा)
import { db } from '../firebase'; 
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Users, Package, Truck, Trash2, Phone, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [msmeUsers, setMsmeUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    // --- सुरक्षा चेक ---
    const isAdmin = localStorage.getItem('isSuperAdmin');
    if (isAdmin !== 'true') {
      navigate('/'); // जर लॉगिन नसेल तर होम पेजला पाठवा
      return;
    }

    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    
    const unsubscribeOrders = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(list);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Error:", err);
      setLoading(false);
    });

    const msmeQuery = collection(db, "msme_profile");
    const unsubscribeMsme = onSnapshot(msmeQuery, (snapshot) => {
      setMsmeUsers(snapshot.size);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeMsme();
    };
  }, [navigate]);

  // --- लॉगआउट फंक्शन ---
  const handleLogout = () => {
    localStorage.removeItem('isSuperAdmin');
    alert("Admin Logged Out Safely!");
    navigate('/');
    window.location.reload(); // सेशन पूर्ण क्लिअर करण्यासाठी
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "bookings", orderId);
      await updateDoc(orderRef, { status: newStatus });
      alert("✅ Status updated to: " + newStatus);
    } catch (err) {
      alert("❌ Update Failed!");
    }
  };

  const deleteOrder = async (id) => {
    if(window.confirm("ही ऑर्डर डिलीट करायची का?")) {
      await deleteDoc(doc(db, "bookings", id));
    }
  };

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '4px solid #FF5E00'
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontWeight: 'bold', color: '#001D3D' }}>
      APNI MANZIL - LOADING...
    </div>
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#001D3D', margin: 0, fontWeight: '900', fontSize: '28px', fontStyle: 'italic' }}>
            APNI MANZIL <span style={{ color: '#FF5E00' }}>SUPER ADMIN</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>LOGISTICS CONTROL CENTER</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <option value="All">All Bookings</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>

          {/* ✅ लॉगआउट बटन */}
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 15px', 
              borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' 
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#DBEAFE', padding: '12px', borderRadius: '12px', color: '#1E40AF' }}><Users /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>MSME USERS</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{msmeUsers}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#FFEDD5', padding: '12px', borderRadius: '12px', color: '#9A3412' }}><Package /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>TOTAL ORDERS</div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{orders.length}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ backgroundColor: '#DCFCE7', padding: '12px', borderRadius: '12px', color: '#166534' }}><Truck /></div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>SYSTEM</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#166534' }}>LIVE</div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <h3 style={{ marginBottom: '20px', fontWeight: '800' }}>Live Bookings List</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '15px' }}>Customer & Service</th>
                <th style={{ padding: '15px' }}>Route (From-To)</th>
                <th style={{ padding: '15px' }}>Partner & Price</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#001D3D' }}>
                      <User size={14} /> {order.customerName || "No Name"}
                    </div>
                    <div style={{ fontSize: '12px', color: '#FF5E00', fontWeight: 'bold' }}>{order.serviceType}</div>
                    <div style={{ fontSize: '10px', color: '#cbd5e1' }}>ID: {order.id.slice(0, 8)}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700' }}>
                      {order.pickupAddress} ➔ {order.dropAddress}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                      <Phone size={12}/> {order.customerPhone || "No Number"}
                    </div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{order.courierName}</div>
                    <div style={{ color: '#FF5E00', fontWeight: '900' }}>₹{order.price}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '900',
                      backgroundColor: order.status === 'Paid' ? '#DCFCE7' : '#FEF3C7',
                      color: order.status === 'Paid' ? '#166534' : '#92400E'
                    }}>
                      {order.status || 'PENDING'}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        defaultValue={order.status || 'Pending'}
                        style={{ padding: '5px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 'bold' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button onClick={() => deleteOrder(order.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;