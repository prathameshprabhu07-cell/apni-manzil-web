import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// --- LAYOUT IMPORT ---
import Layout from './components/Layout';

// ==========================================
// 1. FIREBASE
// ==========================================
import { db, auth } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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
import MSMERegistration from './pages/MSMERegistration';
import ChatBot from './components/ChatBot';

// --- नवीन पेजेस ---
import PackersAndMovers from './pages/PackersAndMovers';
import WarehouseStorage from './pages/WarehouseStorage';
import InternationalLogistics from './pages/InternationalLogistics';
import EcommerceLogistics from './pages/EcommerceLogistics';
import SpecialLogistics from './pages/SpecialLogistics';
import AISmartLogistics from './pages/AISmartLogistics';
import VendorDashboard from './pages/VendorDashboard';

// --- Partner Forms ---
import PackersMoversRegister from './pages/PackersMoversRegister';
import WarehouseRegister from './pages/WarehouseRegister';
import TruckOwnerRegister from './pages/TruckOwnerRegister';
import TransporterRegister from './pages/TransporterRegister';
import InternationalDelivery from './pages/InternationalDelivery';

// --- Customer Dashboard ---
import CustomerDashboard from './CustomerDashboard';

// --- Shipping ---
import MarketplaceShipping from './pages/MarketplaceShipping';
import CODShipping from './pages/CODShipping';
import StockManagement from './pages/StockManagement';
import OrderFulfillmentForm from './pages/OrderFulfillmentForm';

// --- Warehouse Forms ---
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

// --- Cold Chain ---
import ColdChainForm from './pages/ColdChainForm';
import PharmaColdChainForm from './pages/PharmaColdChainForm';

// --- Special Logistics ---
import FragileItemShippingForm from './pages/FragileItemShippingForm';
import HeavyMachineryTransportForm from './pages/HeavyMachineryTransportForm';
import DangerousGoodsTransportForm from './pages/DangerousGoodsTransportForm';
import AirCargoForm from './pages/AirCargoForm';
import SeaFreightForm from './pages/SeaFreightForm';
import CustomsClearanceForm from './pages/CustomsClearanceForm';

import Auth from './Auth';

// --- Rating ---
import RatingComponent from './components/RatingComponent';

// ==========================================
// 3. SERVICE PLACEHOLDER COMPONENTS
// ==========================================
const AirFreight = () => (
  <div
    style={{
      padding: '120px 50px',
      textAlign: 'center',
      minHeight: '70vh',
      background: '#f0f9ff'
    }}
  >
    <h1
      style={{
        color: '#0369a1',
        fontSize: '3rem',
        fontWeight: '900'
      }}
    >
      International Air Freight
    </h1>
  </div>
);

const Customs = () => (
  <div
    style={{
      padding: '120px 50px',
      textAlign: 'center',
      minHeight: '70vh',
      background: '#f5f3ff'
    }}
  >
    <h1
      style={{
        color: '#6d28d9',
        fontSize: '3rem',
        fontWeight: '900'
      }}
    >
      Customs & Compliance
    </h1>
  </div>
);

const TradeFinance = () => (
  <div
    style={{
      padding: '120px 50px',
      textAlign: 'center',
      minHeight: '70vh',
      background: '#fff1f2'
    }}
  >
    <h1
      style={{
        color: '#be123c',
        fontSize: '3rem',
        fontWeight: '900'
      }}
    >
      Logistics Trade Finance
    </h1>
  </div>
);

// ==========================================
// 4. MAIN APP
// ==========================================
function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ==========================================
  // FIREBASE AUTH + ADMIN ROLE CHECK
  // ==========================================
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user) => {
        setCurrentUser(user);

        // No logged-in user
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        try {
          // Check users/{Firebase UID}
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // Only role === admin gets admin access
            if (userData.role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Admin role check failed:', error);
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#002D5E'
        }}
      >
        <h2
          style={{
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          APNI MANZIL LOADING...
        </h2>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={currentUser}>
        <Routes>

          {/* ==========================================
              MAIN
          ========================================== */}

          <Route path="/" element={<Home />} />

          <Route
            path="/about-us"
            element={<About />}
          />

          <Route
            path="/help"
            element={<HelpCenter />}
          />

          <Route
            path="/track"
            element={<Tracking />}
          />

          {/* ==========================================
              AUTH
          ========================================== */}

          <Route
            path="/login"
            element={<Auth />}
          />

          <Route
            path="/register"
            element={<Auth />}
          />

          <Route
            path="/exim-login"
            element={<Auth />}
          />

          {/* ==========================================
              CUSTOMER DASHBOARD
          ========================================== */}

          <Route
            path="/customer-dashboard"
            element={<CustomerDashboard />}
          />

          {/* ==========================================
              COURIER
          ========================================== */}

          <Route
            path="/courier-service"
            element={<CourierServiceDetail />}
          />

          <Route
            path="/booking"
            element={<BookingPage />}
          />

          {/* ==========================================
              HYPERLOCAL / TRUCK
          ========================================== */}

          <Route
            path="/hyperlocal-service"
            element={<HyperlocalService />}
          />

          <Route
            path="/truck-transport"
            element={<TruckTransportService />}
          />

          <Route
            path="/book-truck"
            element={<BookTruck />}
          />

          <Route
            path="/book-part-load"
            element={<BookPartLoad />}
          />

          <Route
            path="/find-load"
            element={<FindLoad />}
          />

          {/* ==========================================
              MARKETPLACE
          ========================================== */}

          <Route
            path="/marketplace-shipping"
            element={<MarketplaceShipping />}
          />

          <Route
            path="/cod-shipping"
            element={<CODShipping />}
          />

          <Route
            path="/stock-management"
            element={<StockManagement />}
          />

          <Route
            path="/order-fulfillment"
            element={<OrderFulfillmentForm />}
          />

          {/* ==========================================
              STORAGE
          ========================================== */}

          <Route
            path="/short-term-storage"
            element={<ShortTermStorageForm />}
          />

          <Route
            path="/long-term-storage"
            element={<LongTermStorageForm />}
          />

          <Route
            path="/fulfillment-storage"
            element={<FulfillmentWarehouseForm />}
          />

          <Route
            path="/cold-storage"
            element={<ColdStorageForm />}
          />

          <Route
            path="/inventory-management"
            element={<InventoryManagementForm />}
          />

          <Route
            path="/bulk-pallet-storage"
            element={<BulkPalletStorageForm />}
          />

          {/* ==========================================
              COLD CHAIN
          ========================================== */}

          <Route
            path="/cold-chain"
            element={<ColdChainForm />}
          />

          <Route
            path="/pharma-cold-chain"
            element={<PharmaColdChainForm />}
          />

          {/* ==========================================
              SPECIAL LOGISTICS
          ========================================== */}

          <Route
            path="/fragile-item-shipping"
            element={<FragileItemShippingForm />}
          />

          <Route
            path="/heavy-machinery-transport"
            element={<HeavyMachineryTransportForm />}
          />

          <Route
            path="/dangerous-goods-transport"
            element={<DangerousGoodsTransportForm />}
          />

          <Route
            path="/air-cargo"
            element={<AirCargoForm />}
          />

          <Route
            path="/sea-freight"
            element={<SeaFreightForm />}
          />

          <Route
            path="/customs-clearance"
            element={<CustomsClearanceForm />}
          />

          <Route
            path="/international-delivery"
            element={<InternationalDelivery />}
          />

          {/* ==========================================
              INTERNATIONAL
          ========================================== */}

          <Route
            path="/importexport"
            element={<ImportExportDetail />}
          />

          <Route
            path="/international-logistics"
            element={<InternationalLogistics />}
          />

          <Route
            path="/ecommerce-logistics"
            element={<EcommerceLogistics />}
          />

          <Route
            path="/special-logistics"
            element={<SpecialLogistics />}
          />

          <Route
            path="/ai-smart-logistics"
            element={<AISmartLogistics />}
          />

          {/* ==========================================
              PACKERS & MOVERS
          ========================================== */}

          <Route
            path="/packers-movers"
            element={<PackersAndMovers />}
          />

          <Route
            path="/home-shifting"
            element={<HomeShifting />}
          />

          <Route
            path="/office-shifting"
            element={<OfficeShiftingForm />}
          />

          <Route
            path="/furniture-shifting"
            element={<FurnitureShiftingForm />}
          />

          <Route
            path="/vehicle-transport"
            element={<VehicleTransportForm />}
          />

          <Route
            path="/commercial-moving"
            element={<CommercialMovingForm />}
          />

          <Route
            path="/same-day-delivery"
            element={<SameDayDelivery />}
          />

          {/* ==========================================
              WAREHOUSE
          ========================================== */}

          <Route
            path="/warehouse-storage"
            element={<WarehouseStorage />}
          />

          {/* ==========================================
              OTHER SERVICE PAGES
          ========================================== */}

          <Route
            path="/airfreight"
            element={<AirFreight />}
          />

          <Route
            path="/customs"
            element={<Customs />}
          />

          <Route
            path="/tradefinance"
            element={<TradeFinance />}
          />

          {/* ==========================================
              PARTNER LANDING
          ========================================== */}

          <Route
            path="/vendor-landing"
            element={<PartnerRegistration />}
          />

          <Route
            path="/partner-registration"
            element={<PartnerRegistration />}
          />

          {/* ==========================================
              PARTNER REGISTRATION
          ========================================== */}

          <Route
            path="/vendor-register"
            element={<PackersMoversRegister />}
          />

          <Route
            path="/truck-owner-register"
            element={<TruckOwnerRegister />}
          />

          <Route
            path="/transporter-register"
            element={<TransporterRegister />}
          />

          <Route
            path="/warehouse-register"
            element={<WarehouseRegister />}
          />

          {/* ==========================================
              RATING
          ========================================== */}

          <Route
            path="/rating"
            element={
              <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100">
                  <RatingComponent />
                </div>
              </div>
            }
          />

          {/* ==========================================
              VENDOR DASHBOARD
          ========================================== */}

          <Route
            path="/vendor-dashboard"
            element={<VendorDashboard />}
          />

          {/* ==========================================
              🔐 PRIVATE ADMIN DASHBOARD
          ========================================== */}

          <Route
            path="/super-secret-admin-99"
            element={
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />

          {/* ==========================================
              MSME
          ========================================== */}

          <Route
            path="/msme-registration"
            element={<MSMERegistration />}
          />

          {/* ==========================================
              FALLBACK
          ========================================== */}

          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </Layout>

      <ChatBot />

    </Router>
  );
}

export default App;