import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Truck Custom Icon
const truckIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// Helper component to center map on real coordinates
function UpdateMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const LiveTracking = ({ orderId }) => {
  // Default fallback location (Pune) until real GPS is triggered
  const [position, setPosition] = useState([18.5204, 73.8567]);
  
  // Selected service state
  const [selectedService, setSelectedService] = useState('Hyperlocal Delivery');

  // Toggle for real GPS tracking state
  const [isTracking, setIsTracking] = useState(false);

  // Real Geolocation and n8n webhook sync
  useEffect(() => {
    if (!isTracking) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const realLat = pos.coords.latitude;
        const realLng = pos.coords.longitude;
        
        setPosition([realLat, realLng]);

        // Send real live tracking data to your n8n webhook
        fetch("http://localhost:5678/webhook/4b54e0a4-ba4b-484f-8d2d-d804f5b65348", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderId || "#AM-TRACK",
            serviceType: selectedService,
            lat: realLat,
            lng: realLng,
            accuracy: pos.coords.accuracy,
            timestamp: new Date().toISOString()
          })
        }).catch(err => console.error("Webhook Error:", err));

      },
      (err) => {
        console.error("GPS Error:", err);
        alert("Please enable GPS/Location permissions in your browser.");
        setIsTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [orderId, selectedService, isTracking]);

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100">
      
      {/* Top Header & Order ID */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="font-black text-[#001D3D] uppercase italic text-sm">
          📍 Real Live Tracking: {orderId || "#AM-TRACK"}
        </h3>

        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`}></span>
            <span className="text-[10px] font-black uppercase text-slate-400">{isTracking ? 'GPS Active' : 'GPS Idle'}</span>
        </div>
      </div>

      {/* Service Selection Box */}
      <div className="mb-6 bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
        <div className="w-full md:w-1/3">
          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
            Select Logistics Service Type:
          </label>
          <p className="text-[11px] font-bold text-slate-600">Choose category before starting tracking</p>
        </div>

        <div className="w-full md:w-2/3">
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
            disabled={isTracking}
            className="w-full bg-white border border-slate-300 text-[#001D3D] text-xs font-bold rounded-xl px-4 py-3 outline-none cursor-pointer shadow-sm disabled:opacity-60"
          >
            <option value="Hyperlocal Delivery">Hyperlocal Delivery</option>
            <option value="International Courier">International Courier</option>
            <option value="Truck Transport & Part Load">Truck Transport & Part Load</option>
            <option value="Packers & Movers">Packers & Movers</option>
            <option value="E-commerce Shipping">E-commerce Shipping</option>
            <option value="Cold Chain Logistics">Cold Chain Logistics</option>
          </select>
        </div>
      </div>

      {/* Leaflet Map Container */}
      <div className="h-[400px] rounded-2xl overflow-hidden shadow-inner border-4 border-slate-50">
        <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={truckIcon}>
            <Popup>
              <div className="font-bold text-[#001D3D]">
                <div>Live Shipment Location</div>
                <div className="text-[10px] text-blue-600 mt-1">Service: {selectedService}</div>
              </div>
            </Popup>
          </Marker>
          <UpdateMapCenter center={position} />
        </MapContainer>
      </div>

      {/* Bottom Controls & Coordinates */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-slate-50 p-4 rounded-2xl gap-4">
         <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real Live Coordinates & Selected Service</p>
            <p className="text-xs font-bold text-[#001D3D]">
              {position[0].toFixed(4)}, {position[1].toFixed(4)} <span className="text-blue-600">({selectedService})</span>
            </p>
         </div>
         
         <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Real Track Control Button */}
           <button 
             onClick={() => setIsTracking(!isTracking)}
             className={`px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest cursor-pointer transition w-full md:w-auto ${
               isTracking ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
             }`}
           >
             {isTracking ? 'Stop Tracking' : 'Start Tracking'}
           </button>

           <button 
             onClick={() => {
               if (navigator.share) {
                 navigator.share({
                   title: 'Apni Manzil Live Tracking',
                   text: `Track order ${orderId || "#AM-TRACK"} (${selectedService}) at coordinates: ${position[0]}, ${position[1]}`,
                   url: window.location.href,
                 }).catch(console.error);
               } else {
                 alert(`Location copied: ${position[0]}, ${position[1]}`);
               }
             }}
             className="bg-[#001D3D] text-white px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest cursor-pointer hover:bg-blue-900 transition w-full md:w-auto"
           >
             Share Location
           </button>
         </div>
      </div>
    </div>
  );
};

export default LiveTracking;