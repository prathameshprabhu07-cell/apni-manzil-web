import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, Truck, CreditCard, 
  PlusCircle, MapPin, Search, Navigation, X, Clock, CheckCircle2 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Firebase
import { db } from '../firebaseConfig'; 
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

// Map Icon
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

const MSMEDashboard = ({ businessName = "Apni Manzil Partner" }) => {
  const [orders, setOrders] = useState([]);
  const [trackingActive, setTrackingActive] = useState(false);
  const [position, setPosition] = useState([18.5204, 73.8567]);

  // १. खऱ्या ऑर्डर्स फायरबेस मधून आणणे
  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const unsub = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* --- Sidebar --- */}
      <div className="w-72 bg-[#002D5E] text-white p-8 hidden lg:block shadow-2xl">
        <div className="mb-12">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-orange-400">Apni Manzil</h2>
          <p className="text-[10px] font-bold text-blue-200/50 uppercase tracking-[0.3em]">Logistics Excellence</p>
        </div>
        
        <nav className="space-y-6">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<Package size={20}/>} label="My Shipments" />
          <NavItem icon={<CreditCard size={20}/>} label="Payments" />
          <NavItem icon={<Truck size={20}/>} label="Fleet Status" />
        </nav>

        <div className="mt-auto pt-20">
            <div className="bg-blue-900/50 p-6 rounded-3xl border border-white/10">
                <p className="text-xs font-bold text-blue-200 mb-2">Need Help?</p>
                <button className="text-xs font-black bg-orange-500 w-full py-3 rounded-xl uppercase tracking-widest">Support</button>
            </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-[950] text-[#002D5E] uppercase italic tracking-tighter">
              Welcome, <span className="text-orange-500">{businessName}</span>
            </h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Operational Overview Dashboard</p>
          </div>
          <button className="bg-[#002D5E] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-orange-500 transition-all flex items-center gap-3">
            <PlusCircle size={18} /> New Shipment
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatCard label="Total Shipments" value={orders.length} icon={<Package className="text-blue-600"/>} color="border-blue-600" />
          <StatCard label="In Transit" value="02" icon={<Truck className="text-orange-500"/>} color="border-orange-500" />
          <StatCard label="Pending Invoices" value="₹45,200" icon={<CreditCard className="text-green-600"/>} color="border-green-600" />
        </div>

        {/* Live Tracking Section (If Active) */}
        {trackingActive && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 mb-10 animate-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-black text-[#002D5E] uppercase italic flex items-center gap-3">
                 <Navigation size={22} className="text-orange-500 animate-pulse"/> Live Vehicle Location
               </h3>
               <button onClick={() => setTrackingActive(false)} className="bg-slate-100 p-2 rounded-full hover:bg-red-100 transition-colors">
                 <X size={20} className="text-slate-400" />
               </button>
            </div>
            <div className="h-[450px] rounded-[2rem] overflow-hidden border-8 border-slate-50 shadow-inner">
               <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                 <Marker position={position} icon={truckIcon} />
                 <UpdateMap center={position} />
               </MapContainer>
            </div>
          </div>
        )}

        {/* Recent Orders Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-[#002D5E] uppercase italic tracking-tighter">Recent Business Activity</h3>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Service</th>
                  <th className="px-8 py-4">Route</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 font-black text-[#002D5E] text-sm">#{order.id.substring(0,6)}</td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-500 uppercase">{order.serviceType}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-[#002D5E]">{order.pickupAddress} ➔ {order.dropAddress}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase bg-orange-100 text-orange-600">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setTrackingActive(true)}
                        className="bg-[#002D5E] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors shadow-lg"
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-Components
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl transition-all ${active ? 'bg-orange-500 text-white shadow-lg' : 'text-blue-100 hover:bg-white/10'}`}>
    {icon}
    <span className="font-black uppercase text-xs tracking-widest">{label}</span>
  </div>
);

const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white p-8 rounded-[2.5rem] shadow-sm border-t-8 ${color} transition-transform hover:-translate-y-2`}>
    <div className="flex justify-between items-start mb-4">
      <div className="bg-slate-50 p-4 rounded-2xl">{icon}</div>
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
    <h4 className="text-3xl font-black text-[#002D5E] mt-1">{value}</h4>
  </div>
);

export default MSMEDashboard;