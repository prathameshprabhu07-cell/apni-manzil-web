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
import CourierServiceDetail from './pages/CourierServiceDetail'; 
import BookingPage from './pages/BookingPage'; 
import HyperlocalService from './pages/HyperlocalService'; 
import TruckTransportService from './pages/TruckTransportService'; 
import Tracking from './pages/Tracking'; 
import AdminDashboard from './components/AdminDashboard'; 
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 
import Dashboard from './pages/Dashboard'; 

// --- नवीन पेजेसचे इम्पोर्ट्स ---
import PackersAndMovers from './pages/PackersAndMovers'; 
import WarehouseStorage from './pages/WarehouseStorage'; 
import InternationalLogistics from './pages/InternationalLogistics'; 
import EcommerceLogistics from './pages/EcommerceLogistics'; 
import SpecialLogistics from './pages/SpecialLogistics'; 
import AISmartLogistics from './pages/AISmartLogistics'; 
import VendorDashboard from './pages/VendorDashboard'; 
import CustomerDashboard from './components/CustomerDashboard'; 

import HomeShifting from './pages/HomeShifting'; 
import OfficeShiftingForm from './components/OfficeShiftingForm'; 
import FurnitureShiftingForm from './components/FurnitureShiftingForm';
import VehicleTransportForm from './components/VehicleTransportForm';
import CommercialMovingForm from './components/CommercialMovingForm';
import SameDayDelivery from './pages/SameDayDelivery'; 
import BookTruck from './pages/BookTruck'; 
import BookPartLoad from './pages/BookPartLoad'; 
import FindLoad from './pages/FindLoad';
import ShortTermStorageForm from './pages/ShortTermStorageForm';
import LongTermStorageForm from './pages/LongTermStorageForm';
import FulfillmentWarehouseForm from './pages/FulfillmentWarehouseForm';
import ColdStorageForm from './pages/ColdStorageForm';
import InventoryManagementForm from './pages/InventoryManagementForm';
import BulkPalletStorageForm from './pages/BulkPalletStorageForm';

// ✅ कोल्ड चेन आणि फार्मा कोल्ड चेन फॉर्म इम्पोर्ट्स
import ColdChainForm from './pages/ColdChainForm';
import PharmaColdChainForm from './pages/PharmaColdChainForm'; 

// ✅ Fragile Item Shipping फॉर्म इम्पोर्ट
import FragileItemShippingForm from './pages/FragileItemShippingForm'; 

// ✅ Heavy Machinery Transport फॉर्म इम्पोर्ट
import HeavyMachineryTransportForm from './pages/HeavyMachineryTransportForm'; 

// ✅ Dangerous Goods Transport फॉर्म इम्पोर्ट (नवीन जोडला)
import DangerousGoodsTransportForm from './pages/DangerousGoodsTransportForm'; 

import Auth from './Auth'; 
import EXIMDashboard from './components/EXIMDashboard'; 

// ✅ फीडबॅक / रेटिंग कंपोनंट इम्पोर्ट
import RatingComponent from './components/RatingComponent'; 

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
          
          <Route path="/courier-service" element={<CourierServiceDetail />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/hyperlocal-service" element={<HyperlocalService />} />
          <Route path="/truck-transport" element={<TruckTransportService />} />
          
          <Route path="/book-truck" element={<BookTruck />} />
          <Route path="/book-part-load" element={<BookPartLoad />} />
          <Route path="/find-load" element={<FindLoad />} />

          <Route path="/short-term-storage" element={<ShortTermStorageForm />} />
          <Route path="/long-term-storage" element={<LongTermStorageForm />} />
          <Route path="/fulfillment-storage" element={<FulfillmentWarehouseForm />} />
          <Route path="/cold-storage" element={<ColdStorageForm />} />
          <Route path="/inventory-management" element={<InventoryManagementForm />} />
          <Route path="/bulk-pallet-storage" element={<BulkPalletStorageForm />} />

          {/* ✅ कोल्ड चेन आणि फार्मा कोल्ड चेन लॉजिस्टिक्स राऊट्स */}
          <Route path="/cold-chain" element={<ColdChainForm />} />
          <Route path="/pharma-cold-chain" element={<PharmaColdChainForm />} />

          {/* ✅ Fragile Item Shipping राऊत */}
          <Route path="/fragile-item-shipping" element={<FragileItemShippingForm />} />

          {/* ✅ Heavy Machinery Transport राऊत */}
          <Route path="/heavy-machinery-transport" element={<HeavyMachineryTransportForm />} />

          {/* ✅ Dangerous Goods Transport राऊत (नवीन जोडला) */}
          <Route path="/dangerous-goods-transport" element={<DangerousGoodsTransportForm />} />

          <Route path="/importexport" element={<ImportExportDetail />} />
          <Route path="/packers-movers" element={<PackersAndMovers />} />
          
          <Route path="/home-shifting" element={<HomeShifting />} />
          <Route path="/office-shifting" element={<OfficeShiftingForm />} />
          <Route path="/furniture-shifting" element={<FurnitureShiftingForm />} />
          <Route path="/vehicle-transport" element={<VehicleTransportForm />} />
          <Route path="/commercial-moving" element={<CommercialMovingForm />} />

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
          
          {/* ✅ पार्टनर रजिस्ट्रेशन राऊत लिंक केला आहे */}
          <Route path="/partner-registration" element={<PartnerRegistration />} />
          
          {/* ✅ नवीन रेटिंग आणि फीडबॅक राऊत ऍड केला आहे */}
          <Route path="/rating" element={
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100">
                <RatingComponent />
              </div>
            </div>
          } />
          
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