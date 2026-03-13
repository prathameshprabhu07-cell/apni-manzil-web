import React from 'react';

const LogisticsStats = () => {
  const stats = [
    { title: "Market Giant", desc: "Indian Logistics is a $400B+ industry by 2026.", icon: "📈" },
    { title: "Mode Split", desc: "70% Road, 25% Sea, and 5% Air transport share.", icon: "🚛" },
    { title: "Warehouse", desc: "Growth of 19% CAGR in smart warehousing.", icon: "🏗️" },
    { title: "Global Trade", desc: "Managing $1 Trillion+ of annual trade flow.", icon: "🌍" },
    { title: "Last Mile", desc: "The most crucial step for Customer Satisfaction.", icon: "📦" },
    { title: "Cold Chain", desc: "Vital for Healthcare & Fresh Food safety.", icon: "❄️" },
    { title: "Green Logistics", desc: "Shift towards EVs for zero emission delivery.", icon: "🌱" },
    { title: "Digitalization", desc: "Real-time tracking using AI & IoT technology.", icon: "💻" }
  ];

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#f8f9fa' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>Logistics Industry Insights</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {stats.map((item, index) => (
          <div key={index} style={{ 
            padding: '20px', 
            backgroundColor: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '18px', color: '#007bff', marginBottom: '10px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogisticsStats;