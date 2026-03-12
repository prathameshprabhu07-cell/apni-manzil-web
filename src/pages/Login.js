import React, { useState } from 'react';

const Login = () => {
  const [role, setRole] = useState('User');
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ color: '#0056b3', fontWeight: 'bold' }}>Login</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#eee', padding: '5px', borderRadius: '30px' }}>
          <button onClick={() => setRole('User')} style={{ flex: 1, border: 'none', padding: '10px', borderRadius: '25px', background: role === 'User' ? '#0056b3' : 'transparent', color: role === 'User' ? 'white' : 'black' }}>User</button>
          <button onClick={() => setRole('Partner')} style={{ flex: 1, border: 'none', padding: '10px', borderRadius: '25px', background: role === 'Partner' ? '#0056b3' : 'transparent', color: role === 'Partner' ? 'white' : 'black' }}>Partner</button>
        </div>
        <input type="text" placeholder="Mobile / Email" style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd' }} />
        <input type="password" placeholder="Password" style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd' }} />
        <button style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold' }}>Login as {role}</button>
      </div>
    </div>
  );
};

export default Login;