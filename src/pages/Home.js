import React, { useState } from 'react';

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const mainServices = [
    { id: 1, title: "Courier & Parcel", icon: "📦", subs: ["Domestic", "Express", "Same Day", "Document", "Bulk"] },
    { id: 2, title: "Bike Delivery", icon: "🏍", subs: ["Grocery", "Food", "Medicine", "Pickup & Drop"] },
    { id: 3, title: "Truck & Transport", icon: "🚛", subs: ["Mini Truck", "Tempo", "PTL", "FTL", "Container"] },
    { id: 4, title: "Packers & Movers", icon: "🏠", subs: ["Home", "Office", "Furniture", "Vehicle"] },
    { id: 5, title: "Warehouse", icon: "🏭", subs: ["Inventory", "E-commerce", "Cold Storage"] },
    { id: 6, title: "International", icon: "🌍", subs: ["Air Cargo", "Sea Cargo", "Export", "Import"] },
    { id: 7, title: "E-commerce", icon: "📦", subs: ["COD Shipping", "Return Mgt", "Packaging"] },
    { id: 8, title: "Special Logistics", icon: "❄️", subs: ["Cold Chain", "Pharma", "Fragile Goods"] },
    { id: 9, title: "AI Smart Logistics", icon: "🤖", subs: ["Smart Selection", "Route Optm", "Price Optm"] }
  ];

  return (
    <section style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h2>Our Logistics Services</h2>
      <p>Select a category to see sub-services</p>

      <div style={gridStyle}>
        {mainServices.map(service => (
          <div key={service.id} 
               onClick={() => setActiveCategory(activeCategory === service.id ? null : service.id)}
               style={cardStyle}>
            <div style={{fontSize: '40px'}}>{service.icon}</div>
            <h3 style={{fontSize: '18px', margin: '10px 0'}}>{service.title}</h3>
            
            {/* Sub-services list (Active झाल्यावरच दिसेल) */}
            {activeCategory === service.id && (
              <div style={subListStyle}>
                {service.subs.map(sub => (
                  <div key={sub} style={subItemStyle}>• {sub}</div>
                ))}
              </div>
            )}
            <button style={btnStyle}>{activeCategory === service.id ? 'Close' : 'View Details'}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- CSS Styles ---
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  maxWidth: '1200px',
  margin: '40px auto'
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '20px',
  borderRadius: '12px',
  cursor: 'pointer',
  background: '#fff',
  transition: '0.3s'
};

const subListStyle = {
  textAlign: 'left',
  background: '#f9f9f9',
  padding: '10px',
  borderRadius: '8px',
  marginTop: '10px'
};

const subItemStyle = { fontSize: '14px', color: '#555', padding: '3px 0' };
const btnStyle = { marginTop: '15px', padding: '8px 15px', cursor: 'pointer', background: '#004080', color: '#fff', border: 'none', borderRadius: '5px' };

export default ServicesSection;