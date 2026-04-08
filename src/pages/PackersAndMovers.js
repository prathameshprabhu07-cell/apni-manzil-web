import React, { useState } from 'react';
import axios from 'axios';
import { Home, Building2, Sofa, Truck, ShieldCheck, X } from 'lucide-react';

// ✅ फिक्स: फाईल पाथ केस-सेन्सिटिव्हिटीनुसार बदलला आहे
import { sendWhatsAppNotification } from '../utils/whatsapp';

const PackersAndMovers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '', customerPhone: '', fromCity: '', toCity: '', houseType: '1BHK', moveDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // १. बॅकेंडला डेटा पोस्ट करणे
      const res = await axios.post('http://localhost:5000/api/packers/post-lead', formData);
      
      if (res.data.success) {
        // २. यशस्वी झाल्यावर व्हॉट्सॲप नोटिफिकेशन पाठवणे
        const serviceMsg = `Shifting: ${formData.houseType} from ${formData.fromCity} to ${formData.toCity}`;
        const orderId = "PM-" + Math.floor(Math.random() * 100000);
        
        // युजरच्या नंबरवर मेसेज जाईल
        sendWhatsAppNotification(formData.customerPhone, formData.customerName, serviceMsg, orderId);

        alert("तुमची रॅक्युयरमेंट सेव्ह झाली आहे आणि व्हॉट्सॲपवर माहिती पाठवली आहे! ✅");
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Error: Backend चालू आहे का ते तपासा.");
    } finally { setLoading(false); }
  };

  const services = [
    { id: 1, title: "House Shifting", desc: "Home Relocation", icon: <Home className="text-blue-600" size={32} /> },
    { id: 2, title: "Office Shifting", desc: "Office Relocation", icon: <Building2 className="text-orange-600" size={32} /> },
    { id: 3, title: "Furniture Moving", desc: "Heavy Item Moving", icon: <Sofa className="text-blue-500" size={32} /> },
    { id: 4, title: "Vehicle Transport", desc: "Car & Bike Moving", icon: <Truck className="text-indigo-600" size={32} /> },
    { id: 5, title: "Storage with Movers", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
    { id: 6, title: "Commercial Moving", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
      
      {/* --- FORM MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 cursor-pointer"><X /></button>
            <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase italic">Quick Quote Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold" onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
              <input required type="text" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold" onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="From City" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold text-sm" onChange={(e) => setFormData({...formData, fromCity: e.target.value})} />
                <input required type="text" placeholder="To City" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold text-sm" onChange={(e) => setFormData({...formData, toCity: e.target.value})} />
              </div>
              <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-500" onChange={(e) => setFormData({...formData, houseType: e.target.value})}>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Few Items">Few Items</option>
                <option value="Office">Office</option>
              </select>
              <input required type="date" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-500" onChange={(e) => setFormData({...formData, moveDate: e.target.value})} />
              <button disabled={loading} type="submit" className="w-full bg-[#ff5e00] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all active:scale-95 cursor-pointer">
                {loading ? "Posting..." : "Confirm & Get Rates"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Home / Truck & Movers</p>
            <h1 className="text-5xl font-black mb-4">Packers & Movers</h1>
            <p className="text-xl font-medium opacity-90 italic">Reliable Relocation Services for Your Home or Office</p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
             <img src="https://images.unsplash.com/photo-1600518464441-9154a4dba246?auto=format&fit=crop&q=80&w=800" 
                  alt="Relocation" className="rounded-2xl shadow-2xl border-4 border-white/20" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex-grow">
        <h2 className="text-2xl font-black text-slate-800 text-center mb-12 uppercase tracking-wide">Select a Relocation Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div 
              key={s.id} 
              onClick={() => setIsModalOpen(true)} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-center cursor-pointer"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform pointer-events-none">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg pointer-events-none">{s.title}</h3>
              <p className="text-sm text-slate-500 mb-6 pointer-events-none">{s.desc}</p>
              <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition uppercase tracking-wider cursor-pointer">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- फायनल ब्रँडेड ट्रक इमेज सेक्शन --- */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center pt-[60px] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/truck-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#002D5E'
        }}
      >
        <div className="max-w-5xl px-6 relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-[950] uppercase tracking-[3px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
            One Solution for All Logistics
          </h2>
        </div>
      </div>

    </div>
  );
};

export default PackersAndMovers;