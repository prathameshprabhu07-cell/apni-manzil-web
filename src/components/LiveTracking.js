import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1. Truck Custom Icon
const truckIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// 2. Helper component to update map center dynamically on real movement
function UpdateMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const LiveTracking = ({ orderId }) => {
  // Default fallback location (Pune) until real GPS kicks in
  const [position, setPosition] = useState([18.5204, 73.8567]);
  
  // State for selecting shipment/logistics service type
  const [selectedService, setSelectedService] = useState('All Services / General Logistics');

  // State to toggle real GPS tracking on/off
  const [isTracking, setIsTracking] = useState(false);

  // 3. Real Geolocation tracking & n8n Webhook integration
  useEffect(() => {
    if (!isTracking) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const realLat = pos.coords.latitude;
        const realLng = pos.coords.longitude;
        
        // Update state with actual real coordinates from device GPS
        setPosition([realLat, realLng]);

        // Send real live GPS data to n8n webhook
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
        console.error("Real GPS Location Error:", err);
        alert("Please enable GPS/Location access in your browser to track live movement.");
      },
      { 
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000 
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [orderId, selectedService, isTracking]);

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="font-black text-[#001D3D] uppercase italic text-sm">
          📍 Real Live Tracking: {orderId || "#AM-TRACK"}
        </h3>

        {/* Shipment / Service Selection Dropdown */}
        <div className="w-full md:w-auto flex items-center gap-3">
          <span className="text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Select Service:</span>
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-[#001D3D] text-xs font-bold rounded-xl px-3 py-2 outline-none cursor-pointer w-full md:w-64 shadow-sm"
          >
            <option value="All Services / General Logistics">All Services / General Logistics</option>
            <option value="Hyperlocal Delivery">Hyperlocal Delivery (Same Day)</option>
            <option value="Truck Transport / Part Load">Truck Transport & Part Load (B2B)</option>
            <option value="Packers & Movers / Home Shifting">Packers & Movers (Home Shifting)</option>
            <option value="International Courier & Delivery">International Courier & Delivery</option>
            <option value="E-commerce Marketplace Shipping">E-commerce Marketplace Shipping</option>
            <option value="Cold Chain & Pharma Storage">Cold Chain & Pharma Logistics</option>
            <option value="Heavy Machinery & Dangerous Goods">Heavy Machinery / Dangerous Goods</option>
            <option value="Air Cargo & Sea Freight">Air Cargo & Sea Freight</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500 animate-ping' : 'bg-slate-300'}`}></span>
            <span className="text-[10px] font-black uppercase text-slate-400">{isTracking ? 'Real GPS Connected' : 'GPS Idle'}</span>
        </div>
      </div>

      {/* 4. Leaflet Map Container */}
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

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-slate-50 p-4 rounded-2xl gap-4">
         <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real Live GPS Co-ordinates & Selected Service</p>
            <p className="text-xs font-bold text-[#001D3D]">
              {position[0].toFixed(4)}, {position[1].toFixed(4)} <span className="text-blue-600">({selectedService})</span>
            </p>
         </div>
         
         <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Real GPS Start/Stop Button */}
           <button 
             onClick={() => setIsTracking(!isTracking)}
             className={`px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest cursor-pointer transition w-full md:w-auto ${
               isTracking ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
             }`}
           >
             {isTracking ? 'Stop Real Tracking' : 'Start Real Tracking'}
           </button>

           <button 
             onClick={() => {
               if (navigator.share) {
                 navigator.share({
                   title: 'Apni Manzil Live Tracking',
                   text: `Track order ${orderId || "#AM-TRACK"} for ${selectedService} at coordinates: ${position[0]}, ${position[1]}`,
                   url: window.location.href,
                 }).catch(console.error);
               } else {
                 alert(`Location copied: Lat ${position[0]}, Lng ${position[1]}`);
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