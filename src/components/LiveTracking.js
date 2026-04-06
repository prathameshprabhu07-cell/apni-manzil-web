import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// १. ट्रकचा कस्टम आयकॉन (Free Icon)
const truckIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// २. मॅपला 'Live' हालवण्यासाठी एक छोटा हेल्पर कंपोनंट
function UpdateMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const LiveTracking = ({ orderId }) => {
  // डिफॉल्ट लोकेशन (पुणे)
  const [position, setPosition] = useState([18.5204, 73.8567]);

  // ३. खऱ्या लोकेशनसाठी 'Geolocation' वापरणे
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error("Location Error:", err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-[#001D3D] uppercase italic text-sm">
          📍 Live Route: {orderId || "#AM-TRACK"}
        </h3>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black uppercase text-slate-400">Live GPS</span>
        </div>
      </div>

      {/* ४. Leaflet Map Container */}
      <div className="h-[400px] rounded-2xl overflow-hidden shadow-inner border-4 border-slate-50">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={truckIcon}>
            <Popup>
              <div className="font-bold text-[#001D3D]">Truck is here!</div>
            </Popup>
          </Marker>
          <UpdateMapCenter center={position} />
        </MapContainer>
      </div>

      <div className="mt-6 flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
         <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current Co-ordinates</p>
            <p className="text-xs font-bold text-[#001D3D]">{position[0].toFixed(4)}, {position[1].toFixed(4)}</p>
         </div>
         <button className="bg-[#001D3D] text-white px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest">Share Location</button>
      </div>
    </div>
  );
};

export default LiveTracking;