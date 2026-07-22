import React, { useState } from 'react';
import axios from 'axios';
import { Home, Building2, Sofa, Truck, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

// Firebase Imports
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";

import { sendWhatsAppNotification } from '../utils/whatsapp';

const PackersAndMovers = () => {
  const navigate = useNavigate(); 
  
  // n8n प्रोडक्शन URL
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '', customerPhone: '', fromCity: '', toCity: '', houseType: '1BHK', moveDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // १. फायरबेसमध्ये डेटा सेव्ह करा
      await addDoc(collection(db, "leads"), {
        ...formData,
        service: "Packers and Movers",
        createdAt: new Date().toISOString()
      });

      // २. n8n ला डेटा पाठवा (Production URL)
      try {
        await axios.post(n8nUrl, {
          ...formData,
          service: "Packers and Movers",
          timestamp: new Date().toISOString()
        });
      } catch (n8nErr) {
        console.error("n8n Webhook Error:", n8nErr);
      }

      // ३. व्हॉट्सॲप नोटिफिकेशन
      const serviceMsg = `Shifting: ${formData.houseType} from ${formData.fromCity} to ${formData.toCity}`;
      const orderId = "PM-" + Math.floor(Math.random() * 100000);
      sendWhatsAppNotification(formData.customerPhone, formData.customerName, serviceMsg, orderId);
      
      alert("तुमची रॅक्युयरमेंट सेव्ह झाली आहे आणि व्हॉट्सॲपवर माहिती पाठवली आहे! ✅");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error: काहीतरी तांत्रिक अडचण आली, कृपया पुन्हा प्रयत्न करा.");
    } finally { 
      setLoading(false); 
    }
  };

  const services = [
    { id: 1, title: "House Shifting", desc: "Home Relocation", icon: <Home className="text-blue-600" size={32} /> },
    { id: 2, title: "Office Shifting", desc: "Office Relocation", icon: <Building2 className="text-orange-600" size={32} /> },
    { id: 3, title: "Furniture Moving", desc: "Heavy Item Moving", icon: <Sofa className="text-blue-500" size={32} /> },
    { id: 4, title: "Vehicle Transport", desc: "Car & Bike Moving", icon: <Truck className="text-indigo-600" size={32} /> },
    { id: 5, title: "Storage with Movers", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
    { id: 6, title: "Commercial Moving", desc: "Industrial Relocation", icon: <ShieldCheck className="text-green-600" size={32} /> },
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
                <option value="Commercial">Commercial</option>
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
              onClick={() => {
                if(s.title === "House Shifting") { navigate('/home-shifting'); }
                else if(s.title === "Office Shifting") { navigate('/office-shifting'); }
                else if(s.title === "Furniture Moving") { navigate('/furniture-shifting'); }
                else if(s.title === "Vehicle Transport") { navigate('/vehicle-transport'); }
                else if(s.title === "Commercial Moving") { navigate('/commercial-moving'); }
                else { setIsModalOpen(true); }
              }} 
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

      {/* DETAILED SERVICES INFORMATION */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-12">
          {[
            { title: "House Shifting", desc: "Make your house shifting process stress-free with our expert packing and moving solutions. We handle your belongings with the utmost care, ensuring a safe and smooth transition to your new home." },
            { title: "Office Shifting", desc: "Minimize downtime and ensure a seamless move for your business with our professional office relocation services. Our team is trained to handle office equipment, furniture, and critical documents with precision and efficiency." },
            { title: "Furniture Moving", desc: "Safely transport your valuable furniture and heavy items without the hassle. We use specialized equipment and protective techniques to ensure your heavy assets are moved securely and reach their destination in perfect condition." },
            { title: "Vehicle Transport", desc: "Trust us for the safe and secure transportation of your car or bike. Whether local or long-distance, we ensure your vehicles are handled with professional care throughout the moving process." },
            { title: "Storage with Movers", desc: "Need extra space during your move? We provide secure, flexible storage solutions to keep your goods protected for as long as you need, giving you peace of mind during your transition." },
            { title: "Commercial Moving", desc: "Expertly managed commercial and industrial relocation services designed to handle complex logistics requirements. We ensure efficient, timely, and safe moving of your industrial assets to keep your business operations on track." }
          ].map((item, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 hover:bg-slate-50 p-4 transition-all rounded-r-2xl">
              <h4 className="text-xl font-black text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Image Section */}
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