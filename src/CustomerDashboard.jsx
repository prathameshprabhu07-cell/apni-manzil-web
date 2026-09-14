import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Home,
  Truck,
  Globe,
  Shield,
  Headphones,
  Bell,
  Search,
  User,
  Menu,
  X,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          setError("User profile not found.");
          setLoading(false);
          return;
        }

        const data = userSnapshot.data();

        setUserData({
          ...data,
          uid: firebaseUser.uid,
        });

        setLoading(false);
      } catch (err) {
        console.error("Customer profile error:", err);
        setError("Unable to load your profile.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitial = () => {
    if (!userData?.fullName) return "U";

    return userData.fullName.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <Loader2
            size={32}
            className="mx-auto mb-3 animate-spin text-[#001D3D]"
          />

          <p className="text-sm font-bold text-[#001D3D]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
          <AlertCircle
            size={40}
            className="mx-auto mb-4 text-red-500"
          />

          <h2 className="text-lg font-black text-[#001D3D] mb-2">
            Unable to Load Dashboard
          </h2>

          <p className="text-sm text-slate-500 mb-5">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[#001D3D] text-white rounded-xl text-sm font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">

          <div className="flex items-center gap-3">
            <div className="bg-[#FF5E00] p-2 rounded-xl text-white font-black text-xl">
              AM
            </div>

            <div>
              <h1 className="font-black text-[#001D3D] text-lg leading-none">
                Apni Manzil
              </h1>

              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Logistics Hub
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "dashboard"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("courier")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "courier"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Package size={20} />
            Courier & Parcel Services
          </button>

          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "home"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Home size={20} />
            Home & Personal Transport
          </button>

          <button
            onClick={() => setActiveTab("industrial")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "industrial"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Truck size={20} />
            Industrial / Factory Transport
          </button>

          <button
            onClick={() => setActiveTab("global")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "global"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Globe size={20} />
            International / Import-Export
          </button>

          <button
            onClick={() => setActiveTab("specialized")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm ${
              activeTab === "specialized"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Shield size={20} />
            Specialized Transport
          </button>

        </nav>

        <div className="p-4 border-t border-slate-100">

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50">
            <Headphones size={20} />
            Support
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">

        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 h-20 px-6 flex items-center justify-between sticky top-0 z-40">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-600"
            >
              <Menu size={24} />
            </button>

            <div className="relative hidden sm:block w-72">

              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search tracking ID, orders..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#001D3D]"
              />

            </div>
          </div>

          <div className="flex items-center gap-4">

            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative">
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">

              <div className="w-10 h-10 rounded-full bg-[#001D3D] text-white flex items-center justify-center font-black">
                {getInitial()}
              </div>

              <div className="hidden sm:block">

                <h4 className="font-bold text-xs text-[#001D3D]">
                  {userData?.fullName || "User"}
                </h4>

                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  {userData?.status || "active"}
                </span>

              </div>
            </div>

          </div>
        </header>

        {/* BODY */}
        <main className="p-6 space-y-6 flex-1">

          {/* WELCOME */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Individual Account
                </p>

                <h2 className="text-2xl md:text-3xl font-black text-[#001D3D]">
                  Welcome, {userData?.fullName || "User"} 👋
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Manage your logistics services and shipments from one place.
                </p>

              </div>

              <div className="px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>

                  <span className="text-xs font-black text-emerald-700 uppercase">
                    {userData?.status || "active"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* PROFILE */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

            <div className="p-6 border-b border-slate-100">

              <h3 className="font-black text-[#001D3D] text-lg">
                My Profile
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Information stored in your Apni Manzil account
              </p>

            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* NAME */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <User size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Full Name
                  </span>
                </div>

                <p className="font-bold text-[#001D3D]">
                  {userData?.fullName || "Not available"}
                </p>

              </div>

              {/* EMAIL */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Mail size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Email
                  </span>
                </div>

                <p className="font-bold text-[#001D3D] break-all">
                  {userData?.email || "Not available"}
                </p>

              </div>

              {/* PHONE */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Phone size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Mobile
                  </span>
                </div>

                <p className="font-bold text-[#001D3D]">
                  {userData?.phone || "Not available"}
                </p>

              </div>

              {/* ACCOUNT TYPE */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Shield size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Account Type
                  </span>
                </div>

                <p className="font-bold text-[#001D3D] capitalize">
                  {userData?.role || "individual"}
                </p>

              </div>

              {/* PROVIDER */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <User size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Login Provider
                  </span>
                </div>

                <p className="font-bold text-[#001D3D] capitalize">
                  {userData?.provider || "Not available"}
                </p>

              </div>

              {/* CREATED */}
              <div className="p-4 bg-slate-50 rounded-xl">

                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase">
                    Account Created
                  </span>
                </div>

                <p className="font-bold text-[#001D3D]">
                  {formatDate(userData?.createdAt)}
                </p>

              </div>

            </div>

          </div>

          {/* LOGISTICS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Package size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                My Shipments
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                —
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                Shipment data will appear here
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Truck size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                In Transit
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                —
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                No shipment data connected yet
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Package size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                Delivered
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                —
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                No shipment data connected yet
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                Return / RTO
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                —
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                No shipment data connected yet
              </p>

            </div>

          </div>

          {/* ACCOUNT ID */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h3 className="font-black text-[#001D3D] text-lg mb-4">
              Account Information
            </h3>

            <div className="bg-slate-50 rounded-xl p-4">

              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Firebase User ID
              </p>

              <p className="text-xs font-mono font-bold text-[#001D3D] break-all">
                {userData?.uid}
              </p>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;