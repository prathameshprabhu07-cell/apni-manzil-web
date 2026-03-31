import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  LifeBuoy, 
  Clock, 
  ArrowLeft 
} from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { 
      q: "My shipment is delayed. What should I do?", 
      a: "Delays can happen due to weather or technical issues. Please check your real-time status using the Tracking ID. If there's no update for 24 hours, contact our support team." 
    },
    { 
      q: "How do I calculate shipping costs?", 
      a: "Shipping costs are calculated based on weight, dimensions, and destination. You can use our 'Rate Calculator' on the specific service page." 
    },
    { 
      q: "What items are prohibited in international courier?", 
      a: "Liquids, flammables, currency, and perishable items are generally prohibited. Please check our 'Import & Export' guidelines for a full list." 
    },
    { 
      q: "Do you provide insurance for expensive goods?", 
      a: "Yes, we offer logistics insurance for high-value shipments. You can select this option while booking your service." 
    }
  ];

  const contactOptions = [
    { icon: <Phone size={24} />, title: "Call Us", detail: "+91 98765 43210", color: "#008a5e" },
    { icon: <Mail size={24} />, title: "Email Us", detail: "support@apnimanzil.com", color: "#e64a19" },
    { icon: <MessageCircle size={24} />, title: "Live Chat", detail: "Available 24/7", color: "#1976d2" }
  ];

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* Top Header Section - It acts as the page title area */}
      <div style={{ backgroundColor: '#004080', padding: '80px 20px', textAlign: 'center', color: 'white', position: 'relative' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>
        
        <LifeBuoy size={50} style={{ marginBottom: '15px', opacity: 0.9 }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>Help Center</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '10px', opacity: 0.8 }}>Search for solutions or get in touch with our experts</p>
        
        {/* Search Bar */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '500px', padding: '5px 15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <Search color="#999" size={20} />
            <input 
              type="text" 
              placeholder="Describe your issue..." 
              style={{ border: 'none', outline: 'none', padding: '12px', width: '100%', fontSize: '1rem' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '-40px auto 60px auto', padding: '0 20px' }}>
        
        {/* Contact Method Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {contactOptions.map((opt, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ color: opt.color, marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{opt.icon}</div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{opt.title}</h4>
              <p style={{ color: '#666', fontWeight: 'bold' }}>{opt.detail}</p>
              <span style={{ fontSize: '0.8rem', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Clock size={12} /> Response time: ~15 mins
              </span>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#004080' }}>Frequently Asked Questions</h3>
          <div style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: index === faqs.length - 1 ? 'none' : '1px solid #eee' }}>
                <div 
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  style={{ padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: activeIndex === index ? '#f9fbff' : 'transparent' }}
                >
                  <span style={{ fontWeight: '600', color: '#444' }}>{faq.q}</span>
                  {activeIndex === index ? <ChevronUp size={20} color="#004080" /> : <ChevronDown size={20} color="#999" />}
                </div>
                {activeIndex === index && (
                  <div style={{ padding: '0 25px 20px 25px', color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ADDITIONAL FOOTER REMOVED - Managed by Layout.js */}
      <div style={{ paddingBottom: '60px' }}></div>

    </div>
  );
};

export default HelpCenter;