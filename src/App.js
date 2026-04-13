import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- LAYOUT IMPORT ---
import Layout from './components/Layout'; 

// ==========================================
// 1. FIREBASE & DATABASE CONFIGURATION
// ==========================================
import { db, auth } from './firebase'; 
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// ==========================================
// 2. MAIN PAGES & COMPONENTS IMPORTS
// ==========================================
import Home from './pages/Home'; 
import About from './pages/About'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import CourierService from './components/CourierService'; 
import CourierServiceDetail from './pages/CourierServiceDetail'; 
import HyperlocalService from './pages/HyperlocalService'; 
import TruckTransportService from './pages/TruckTransportService'; 
import Tracking from './pages/Tracking'; 
import AdminDashboard from './components/AdminDashboard'; 
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 

// --- नवीन पेजेसचे इम्पोर्ट्स ---
import PackersAndMovers from './pages/PackersAndMovers'; 
import WarehouseStorage from './pages/WarehouseStorage'; 
import InternationalLogistics from './pages/InternationalLogistics'; 
import EcommerceLogistics from './pages/EcommerceLogistics'; 
import SpecialLogistics from './pages/SpecialLogistics'; 
import AISmartLogistics from './pages/AISmartLogistics'; 
import VendorDashboard from './pages/VendorDashboard'; 
import CustomerDashboard from './components/CustomerDashboard'; 

// ✅ --- नवीन HOME SHIFTING IMPORT ---
import HomeShifting from './pages/HomeShifting'; 

// ✅ ✅ --- नवीन OFFICE SHIFTING IMPORT ---
import OfficeShiftingForm from './components/OfficeShiftingForm'; 

// ✅ ✅ ✅ --- नवीन FURNITURE SHIFTING IMPORT ---
import FurnitureShiftingForm from './components/FurnitureShiftingForm';

// ✅ ✅ ✅ ✅ --- नवीन VEHICLE TRANSPORT IMPORT ---
import VehicleTransportForm from './components/VehicleTransportForm';

// ✅ ✅ ✅ ✅ ✅ --- नवीन COMMERCIAL MOVING IMPORT ---
import CommercialMovingForm from './components/CommercialMovingForm';

// 🚀 ✅ ✅ ✅ ✅ ✅ ✅ --- नवीन SAME DAY DELIVERY (BORZO) IMPORT ---
import SameDayDelivery from './pages/SameDayDelivery'; 

// ✅ ✅ ✅ ✅ ✅ ✅ ✅ --- नवीन TRUCK BOOKING IMPORT ---
import BookTruck from './pages/BookTruck'; 

// --- ✅ नवीन AUTHENTICATION PAGE ---
import Auth from './Auth'; 
import EXIMDashboard from './components/EXIMDashboard'; 

// ==========================================
// 3. SERVICE PLACEHOLDER COMPONENTS
// ==========================================
const AirFreight = () => ( <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f0f9ff' }}><h1 style={{ color: '#0369a1', fontSize: '3rem', fontWeight: '900' }}>International Air Freight</h1></div> );
const SeaFreight = () => ( <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f0fdf4' }}><h1 style={{ color: '#15803d', fontSize: '3rem', fontWeight: '900' }}>Global Sea Freight</h1></div> );
const Customs = () => ( <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f5f3ff' }}><h1 style={{ color: '#6d28d9', fontSize: '3rem', fontWeight: '900' }}>Customs & Compliance</h1></div> );
const TradeFinance = () => ( <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#fff1f2' }}><h1 style={{ color: '#be123c', fontSize: '3rem', fontWeight: '900' }}>Logistics Trade Finance</h1></div> );

function App() {
  const [isMSMERegistered, setIsMSMERegistered] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const q = query(collection(db, "msme_profile"), limit(1));
    const unsubscribeMSME = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        if (data.isRegistered) {
          setIsMSMERegistered(true);
          setBusinessName(data.businessName || "Your Business");
        }
      } else {
        setIsMSMERegistered(false);
      }
      setLoading(false);
    }, (error) => {
      console.error("Auth Check Error:", error);
      setLoading(false);
    });

    if (localStorage.getItem('isSuperAdmin') === 'true') setIsAdminAuthenticated(true);

    return () => {
      unsubscribeAuth();
      unsubscribeMSME();
    };
  }, []);

  const handleAdminLogin = () => {
    const password = prompt("अ‍ॅडमिन गुप्त पासवर्ड टाका:");
    if (password === "AM@9922") { 
      localStorage.setItem('isSuperAdmin', 'true');
      setIsAdminAuthenticated(true);
    } else {
      alert("प्रवेश नाकारला!");
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#002D5E' }}>
        <h2 style={{ color: 'white', fontWeight: 'bold' }}>APNI MANZIL LOADING...</h2>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={currentUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/help" element={<HelpCenter />} /> 
          <Route path="/track" element={<Tracking />} /> 
          
          <Route path="/login" element={currentUser ? <Navigate to="/customer-dashboard" /> : <Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/exim-login" element={currentUser ? <Navigate to="/exim-dashboard" /> : <Auth />} />
          
          <Route path="/courier-service" element={<CourierService />} />
          <Route path="/hyperlocal-service" element={<HyperlocalService />} />
          <Route path="/truck-transport" element={<TruckTransportService />} />
          
          {/* 🚀 नवीन TRUCK BOOKING ROUTE ॲड केला आहे */}
          <Route path="/book-truck" element={<BookTruck />} />

          <Route path="/importexport" element={<ImportExportDetail />} />
          <Route path="/packers-movers" element={<PackersAndMovers />} />
          
          <Route path="/home-shifting" element={<HomeShifting />} />
          <Route path="/office-shifting" element={<OfficeShiftingForm />} />
          <Route path="/furniture-shifting" element={<FurnitureShiftingForm />} />
          <Route path="/vehicle-transport" element={<VehicleTransportForm />} />
          <Route path="/commercial-moving" element={<CommercialMovingForm />} />

          {/* 🚀 SAME DAY DELIVERY ROUTE */}
          <Route path="/same-day-delivery" element={<SameDayDelivery />} />

          <Route path="/warehouse-storage" element={<WarehouseStorage />} />
          <Route path="/international-logistics" element={<InternationalLogistics />} />
          <Route path="/ecommerce-logistics" element={<EcommerceLogistics />} />
          <Route path="/special-logistics" element={<SpecialLogistics />} />
          <Route path="/ai-smart-logistics" element={<AISmartLogistics />} />
          
          <Route path="/airfreight" element={<AirFreight />} />
          <Route path="/seafreight" element={<SeaFreight />} />
          <Route path="/customs" element={<Customs />} />
          <Route path="/tradefinance" element={<TradeFinance />} />
          <Route path="/partner-registration" element={<PartnerRegistration />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          
          <Route 
            path="/customer-dashboard" 
            element={currentUser ? <CustomerDashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/exim-dashboard" 
            element={currentUser ? <EXIMDashboard /> : <Navigate to="/exim-login" />} 
          />

          <Route 
            path="/super-secret-admin-99" 
            element={isAdminAuthenticated ? <AdminDashboard /> : <div style={{textAlign:'center', padding:'100px'}}><button onClick={handleAdminLogin}>Unlock Admin Panel</button></div>} 
          />

          <Route 
            path="/msme" 
            element={isMSMERegistered ? <MSMEDashboard businessName={businessName} /> : <Navigate to="/msme-registration" />} 
          />
          <Route 
            path="/msme-registration" 
            element={<MSMERegistration setRegistered={setIsMSMERegistered} setBusinessName={setBusinessName} />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <ChatBot />
    </Router>
  );
}

export default App;