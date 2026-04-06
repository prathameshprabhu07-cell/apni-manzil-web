import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, CheckCircle, Search, X, Calendar, Navigation, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// १. Firebase Imports (हे व्यवस्थित इम्पॉर्ट केले आहेत)
import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot, doc } from "firebase/firestore";

const truckIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

function UpdateMap({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

// --- १. बुकिंग फॉर्म कंपोनंट ---
const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    service: 'Express Courier',
    date: ''
  });
  const [loading, setLoading] = useState(false); // सबमिट होताना बटण डिसेबल करण्यासाठी

  // २. खरोखर Firebase मध्ये डेटा सेव्ह करणारे फंक्शन
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // लोडिंग सुरू
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        pickupAddress: formData.pickup,
        dropAddress: formData.drop,
        serviceType: formData.service,
        pickupDate: formData.date,
        status: "Pending",
        createdAt: serverTimestamp(),
        customerId: "KING_USER_01",
        currentLocation: { lat: 18.5204, lng: 73.8567 } // सुरुवातीला एक डिफॉल्ट लोकेशन
      });

      console.log("Document written with ID: ", docRef.id);
      alert("✅ तुमची बुकिंग यशस्वी झाली आहे! ऑर्डर आयडी: " + docRef.id);
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ बुकिंग करताना काहीतरी अडचण आली: " + error.message);
    } finally {
      setLoading(false); // लोडिंग बंद
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative border-t-[8px] border-[#FF5E00] animate-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-black text-[#001D3D] uppercase italic">Book Your Shipment</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Provide shipment details to get final rates</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Pickup Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-slate-400" size={18}/>
              <input required onChange={(e)=>setFormData({...formData, pickup: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-[#FF5E00] transition shadow-inner text-sm" placeholder="Full Address with Pincode" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Drop Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-[#FF5E00]" size={18}/>
              <input required onChange={(e)=>setFormData({...formData, drop: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-[#FF5E00] transition shadow-inner text-sm" placeholder="Full Destination Address" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Service Type</label>
            <select onChange={(e)=>setFormData({...formData, service: e.target.value})} className="p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-[#FF5E00] transition text-sm">
              <option>Express Courier</option>
              <option>Full Truck Load</option>
              <option>Packers & Movers</option>
              <option>International (EXIM)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Pickup Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 text-slate-400" size={18}/>
              <input type="date" required onChange={(e)=>setFormData({...formData, date: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-[#FF5E00] transition text-sm" />
            </div>
          </div>

          <div className="flex gap-4 mt-4 md:col-span-2">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Cancel</button>
            <button type="submit" disabled={loading} className="flex-[2] bg-[#001D3D] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#FF5E00] transition shadow-xl flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={16}/> : "Confirm & Get Rates"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- २. डॅशबोर्ड कंपोनंट ---
const CustomerDashboard = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [trackingId, setTrackingId] = useState(null); // कोणत्या ऑर्डरला ट्रॅक करायचे आहे
  const [position, setPosition] = useState([18.5204, 73.8567]);
  const [myOrders, setMyOrders] = useState([]); // ऑर्डर्सची लिस्ट

  // १. खऱ्या ऑर्डर्स फायरबेस मधून आणणे (Real-time Sync)
  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const unsub = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyOrders(orders);
    });
    return () => unsub();
  }, []);

  // २. लाईव्ह ट्रॅकिंग लॉजिक (डेटाबेस मधून को-ऑर्डिनेट्स घेणे)
  useEffect(() => {
    if (trackingActive && trackingId) {
      const unsub = onSnapshot(doc(db, "bookings", trackingId), (docSnap) => {
        if (docSnap.exists() && docSnap.data().currentLocation) {
          const loc = docSnap.data().currentLocation;
          setPosition([loc.lat, loc.lng]);
        }
      });
      return () => unsub();
    }
  }, [trackingActive, trackingId]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#001D3D] italic uppercase">Master Dashboard</h1>
          <p className="text-slate-500 font-bold uppercase text-[12px] tracking-widest">Welcome Back, King!</p>
        </div>
        <button onClick={() => setShowBookingForm(true)} className="bg-[#FF5E00] text-white px-6 py-3 rounded-lg font-black uppercase text-sm shadow-lg hover:scale-105 transition">
          + Book New Shipment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Package className="text-[#FF5E00]"/>} label="Total Orders" value={myOrders.length} />
        <StatCard icon={<Clock className="text-blue-500"/>} label="In Transit" value="--" />
        <StatCard icon={<CheckCircle className="text-green-500"/>} label="Delivered" value="--" />
        <StatCard icon={<MapPin className="text-purple-500"/>} label="Active Tracking" value={trackingActive ? "ON" : "OFF"} />
      </div>

      {trackingActive && (
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-200 mb-10 animate-in fade-in duration-500">
           <div className="flex justify-between items-center mb-4">
             <h3 className="font-black text-[#001D3D] uppercase italic flex items-center gap-2">
                <Navigation size={20} className="text-[#FF5E00] animate-pulse"/> Live Vehicle Tracking
             </h3>
             <button onClick={() => setTrackingActive(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={20}/></button>
           </div>
           <div className="h-[400px] rounded-2xl overflow-hidden border-4 border-slate-50">
             <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={truckIcon} />
                <UpdateMap center={position} />
             </MapContainer>
           </div>
        </div>
      )}

      {/* Universal Search */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10 text-center">
        <h3 className="text-lg font-black text-[#001D3D] mb-4 uppercase italic italic tracking-tighter">AI LOGISTICS SEARCH</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input className="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 ring-[#FF5E00] outline-none" placeholder="Pickup Pincode" />
          <input className="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 ring-[#FF5E00] outline-none" placeholder="Drop Pincode" />
          <button onClick={() => setShowBookingForm(true)} className="bg-[#001D3D] text-white px-10 py-4 rounded-xl font-black uppercase flex items-center gap-2">
            <Search size={20}/> Compare Now
          </button>
        </div>
      </div>

      {/* Shipment List (येथील डेटा आता खऱ्या ऑर्डर्स दाखवेल) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-[#001D3D] uppercase italic">My Recent Shipments</h3>
        </div>
        
        {myOrders.length === 0 ? (
          <div className="p-10 text-center text-slate-400 font-bold uppercase text-xs italic">No orders found. Start booking!</div>
        ) : (
          myOrders.map((order) => (
            <div key={order.id} className="p-6 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                 <div className="bg-orange-100 p-3 rounded-full"><Package className="text-[#FF5E00]" size={24}/></div>
                 <div>
                    <p className="font-black text-[#001D3D] uppercase text-sm">{order.id.substring(0,8)}... ({order.serviceType})</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">{order.pickupAddress} ➔ {order.dropAddress}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                   {order.status}
                 </span>
                 <button 
                  onClick={() => { setTrackingActive(true); setTrackingId(order.id); }} 
                  className="border-2 border-[#001D3D] text-[#001D3D] px-6 py-2 rounded-lg font-black text-xs hover:bg-[#001D3D] hover:text-white transition">
                   TRACK LIVE
                 </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showBookingForm && (
        <BookingForm onClose={() => setShowBookingForm(false)} />
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
    <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black text-[#001D3D]">{value}</h4>
    </div>
  </div>
);

export default CustomerDashboard;