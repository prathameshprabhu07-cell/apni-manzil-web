```jsx
import React, { useEffect, useRef, useState } from "react";
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
  ChevronDown,
  Settings,
  FileText,
  CreditCard,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import { auth, db } from "./firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  // --------------------------------------------------
  // AUTH + CUSTOMER PROFILE + BOOKINGS
  // --------------------------------------------------
  useEffect(() => {
    let unsubscribeBookings = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (!firebaseUser) {
          setError("User is not logged in.");
          setLoading(false);
          setBookingsLoading(false);
          return;
        }

        try {
          // USER PROFILE
          const userRef = doc(
            db,
            "users",
            firebaseUser.uid
          );

          const userSnapshot = await getDoc(userRef);

          if (!userSnapshot.exists()) {
            setError("User profile not found.");
            setLoading(false);
            setBookingsLoading(false);
            return;
          }

          const data = userSnapshot.data();

          setUserData({
            ...data,
            uid: firebaseUser.uid,
          });

          setLoading(false);

          // CUSTOMER BOOKINGS
          setBookingsLoading(true);

          const bookingsRef = collection(
            db,
            "bookings"
          );

          const bookingsQuery = query(
            bookingsRef,
            where(
              "customerId",
              "==",
              firebaseUser.uid
            )
          );

          unsubscribeBookings = onSnapshot(
            bookingsQuery,
            (snapshot) => {
              const bookingList = snapshot.docs.map(
                (bookingDoc) => ({
                  id: bookingDoc.id,
                  ...bookingDoc.data(),
                })
              );

              // Newest booking first
              bookingList.sort((a, b) => {
                const getTime = (value) => {
                  if (!value) return 0;

                  if (
                    value &&
                    typeof value.toDate === "function"
                  ) {
                    return value.toDate().getTime();
                  }

                  const parsed = new Date(value).getTime();

                  return Number.isNaN(parsed)
                    ? 0
                    : parsed;
                };

                return (
                  getTime(b.createdAt) -
                  getTime(a.createdAt)
                );
              });

              setBookings(bookingList);
              setBookingsLoading(false);
            },
            (bookingError) => {
              console.error(
                "Customer bookings error:",
                bookingError
              );

              setBookings([]);
              setBookingsLoading(false);
            }
          );
        } catch (err) {
          console.error(
            "Customer dashboard error:",
            err
          );

          setError(
            "Unable to load your dashboard."
          );

          setLoading(false);
          setBookingsLoading(false);
        }
      }
    );

    return () => {
      unsubscribeAuth();

      if (unsubscribeBookings) {
        unsubscribeBookings();
      }
    };
  }, []);

  // --------------------------------------------------
  // CLOSE PROFILE DROPDOWN
  // --------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // --------------------------------------------------
  // CANCEL BOOKING
  // --------------------------------------------------
  const handleCancelBooking = async (booking) => {
    if (!booking?.id) {
      alert("Booking ID not found.");
      return;
    }

    const currentStatus = String(
      booking.status ||
        booking.bookingStatus ||
        "Pending"
    )
      .trim()
      .toLowerCase();

    // Already cancelled
    if (currentStatus.includes("cancel")) {
      alert("This booking is already cancelled.");
      return;
    }

    // Delivered booking cannot be cancelled
    if (currentStatus.includes("deliver")) {
      alert(
        "Delivered bookings cannot be cancelled."
      );
      return;
    }

    // Shipment already dispatched
    if (
      currentStatus.includes("dispatch") ||
      currentStatus.includes("shipped") ||
      currentStatus.includes("out for delivery") ||
      currentStatus.includes("transit")
    ) {
      alert(
        "This shipment has already been processed or dispatched and cannot be cancelled from the dashboard."
      );
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?\n\nBooking ID: " +
        booking.id +
        "\n\nPlease confirm to continue."
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancellingBookingId(booking.id);

      const bookingRef = doc(
        db,
        "bookings",
        booking.id
      );

      await updateDoc(bookingRef, {
        status: "Cancelled",
        cancelledBy: "customer",
        cancelledAt: new Date().toISOString(),
      });

      alert(
        "Booking cancelled successfully."
      );
    } catch (err) {
      console.error(
        "Cancel booking error:",
        err
      );

      alert(
        "Unable to cancel this booking.\n\nPlease try again."
      );
    } finally {
      setCancellingBookingId(null);
    }
  };

  // --------------------------------------------------
  // DATE FORMAT
  // --------------------------------------------------
  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    try {
      let date;

      if (
        dateValue &&
        typeof dateValue.toDate === "function"
      ) {
        date = dateValue.toDate();
      } else {
        date = new Date(dateValue);
      }

      if (Number.isNaN(date.getTime())) {
        return "Not available";
      }

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Not available";
    }
  };

  // --------------------------------------------------
  // INITIAL
  // --------------------------------------------------
  const getInitial = () => {
    if (!userData?.fullName) return "U";

    return userData.fullName
      .charAt(0)
      .toUpperCase();
  };

  // --------------------------------------------------
  // ACCOUNT TYPE
  // --------------------------------------------------
  const getAccountType = () => {
    if (!userData?.role) return "Individual";

    if (userData.role === "individual") {
      return "Individual";
    }

    if (userData.role === "vendor") {
      return "Vendor / Partner";
    }

    return userData.role;
  };

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------
  const getProviderName = () => {
    if (!userData?.provider) {
      return "Not available";
    }

    if (userData.provider === "password") {
      return "Email & Password";
    }

    if (userData.provider === "google") {
      return "Google";
    }

    return userData.provider;
  };

  // --------------------------------------------------
  // SIDEBAR
  // --------------------------------------------------
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // --------------------------------------------------
  // STATUS NORMALIZATION
  // --------------------------------------------------
  const getBookingStatus = (booking) => {
    const status =
      booking?.status ||
      booking?.bookingStatus ||
      "Pending";

    return String(status).trim().toLowerCase();
  };

  // --------------------------------------------------
  // BOOKING COUNTS
  // --------------------------------------------------
  const totalShipments = bookings.length;

  const inTransitCount = bookings.filter(
    (booking) => {
      const status =
        getBookingStatus(booking);

      return (
        status.includes("transit") ||
        status.includes("shipped") ||
        status.includes("dispatch") ||
        status.includes("out for delivery")
      );
    }
  ).length;

  const deliveredCount = bookings.filter(
    (booking) => {
      const status =
        getBookingStatus(booking);

      return status.includes("deliver");
    }
  ).length;

  const rtoCount = bookings.filter(
    (booking) => {
      const status =
        getBookingStatus(booking);

      return (
        status.includes("rto") ||
        status.includes("return") ||
        status.includes("cancel")
      );
    }
  ).length;

  // --------------------------------------------------
  // STATUS BADGE
  // --------------------------------------------------
  const getStatusClass = (status) => {
    const normalized =
      String(status || "").toLowerCase();

    if (normalized.includes("deliver")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (
      normalized.includes("transit") ||
      normalized.includes("shipped") ||
      normalized.includes("dispatch")
    ) {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    if (
      normalized.includes("cancel") ||
      normalized.includes("return") ||
      normalized.includes("rto") ||
      normalized.includes("reject")
    ) {
      return "bg-red-50 text-red-700 border-red-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  // --------------------------------------------------
  // CAN CUSTOMER CANCEL?
  // --------------------------------------------------
  const canCustomerCancel = (booking) => {
    const status = getBookingStatus(booking);

    if (status.includes("cancel")) {
      return false;
    }

    if (status.includes("deliver")) {
      return false;
    }

    if (
      status.includes("dispatch") ||
      status.includes("shipped") ||
      status.includes("out for delivery") ||
      status.includes("transit")
    ) {
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
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

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------
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
            onClick={() =>
              window.location.reload()
            }
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
        className={
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform " +
          (sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full") +
          " md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col"
        }
      >

        {/* SIDEBAR HEADER */}
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
            onClick={() =>
              setSidebarOpen(false)
            }
            className="md:hidden text-slate-400 hover:text-black"
          >
            <X size={24} />
          </button>

        </div>

        {/* SIDEBAR NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

          <button
            onClick={() =>
              handleTabChange("dashboard")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "dashboard"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() =>
              handleTabChange("courier")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "courier"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Package size={20} />
            Courier & Parcel Services
          </button>

          <button
            onClick={() =>
              handleTabChange("home")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "home"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Home size={20} />
            Home & Personal Transport
          </button>

          <button
            onClick={() =>
              handleTabChange("industrial")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "industrial"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Truck size={20} />
            Industrial / Factory Transport
          </button>

          <button
            onClick={() =>
              handleTabChange("global")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "global"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Globe size={20} />
            International / Import-Export
          </button>

          <button
            onClick={() =>
              handleTabChange("specialized")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "specialized"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Shield size={20} />
            Specialized Transport
          </button>

          <div className="pt-3 pb-1">
            <div className="border-t border-slate-100"></div>
          </div>

          <button
            onClick={() =>
              handleTabChange("settings")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "settings"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Settings size={20} />
            Settings
          </button>

          <button
            onClick={() =>
              handleTabChange("reports")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "reports"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <FileText size={20} />
            Reports
          </button>

          <button
            onClick={() =>
              handleTabChange("payments")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "payments"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <CreditCard size={20} />
            Payment History
          </button>

        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="p-4 border-t border-slate-100">

          <button
            onClick={() =>
              handleTabChange("support")
            }
            className={
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm " +
              (activeTab === "support"
                ? "bg-[#001D3D] text-white shadow-lg"
                : "text-slate-600 hover:bg-slate-50")
            }
          >
            <Headphones size={20} />
            Support & Help
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
              onClick={() =>
                setSidebarOpen(true)
              }
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

            {/* PROFILE */}
            <div
              ref={profileRef}
              className="relative pl-4 border-l border-slate-200"
            >

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    (prev) => !prev
                  )
                }
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition"
              >

                <div className="w-10 h-10 rounded-full bg-[#001D3D] text-white flex items-center justify-center font-black">
                  {getInitial()}
                </div>

                <div className="hidden sm:block text-left">

                  <h4 className="font-bold text-xs text-[#001D3D]">
                    {userData?.fullName ||
                      "User"}
                  </h4>

                  <span className="text-[10px] font-bold text-slate-400">
                    My Profile
                  </span>

                </div>

                <ChevronDown
                  size={16}
                  className={
                    "hidden sm:block text-slate-400 transition-transform " +
                    (profileOpen
                      ? "rotate-180"
                      : "")
                  }
                />

              </button>

              {/* PROFILE DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">

                  <div className="p-5 bg-[#001D3D] text-white">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-white text-[#001D3D] flex items-center justify-center font-black text-lg">
                        {getInitial()}
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-black truncate">
                          {userData?.fullName ||
                            "User"}
                        </h3>

                        <p className="text-xs text-slate-300 truncate">
                          {userData?.email ||
                            "Email not available"}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="p-4 space-y-2">

                    <div className="p-3 bg-slate-50 rounded-xl">

                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <User size={15} />
                        <span className="text-[10px] font-black uppercase">
                          Full Name
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#001D3D]">
                        {userData?.fullName ||
                          "Not available"}
                      </p>

                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">

                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Mail size={15} />
                        <span className="text-[10px] font-black uppercase">
                          Email
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#001D3D] break-all">
                        {userData?.email ||
                          "Not available"}
                      </p>

                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">

                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Phone size={15} />
                        <span className="text-[10px] font-black uppercase">
                          Mobile
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#001D3D]">
                        {userData?.phone ||
                          "Not available"}
                      </p>

                    </div>

                    <div className="grid grid-cols-2 gap-2">

                      <div className="p-3 bg-slate-50 rounded-xl">

                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <Shield size={15} />
                          <span className="text-[10px] font-black uppercase">
                            Account
                          </span>
                        </div>

                        <p className="text-xs font-bold text-[#001D3D]">
                          {getAccountType()}
                        </p>

                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl">

                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          <User size={15} />
                          <span className="text-[10px] font-black uppercase">
                            Login
                          </span>
                        </div>

                        <p className="text-xs font-bold text-[#001D3D]">
                          {getProviderName()}
                        </p>

                      </div>

                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">

                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar size={15} />
                        <span className="text-[10px] font-black uppercase">
                          Account Created
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#001D3D]">
                        {formatDate(
                          userData?.createdAt
                        )}
                      </p>

                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">

                      <div className="flex items-center justify-between">

                        <span className="text-[10px] font-black text-emerald-700 uppercase">
                          Account Status
                        </span>

                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase">
                          {userData?.status ||
                            "active"}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="border-t border-slate-100 p-3">

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>

                  </div>

                </div>
              )}

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
                  Welcome,{" "}
                  {userData?.fullName ||
                    "User"}{" "}
                  👋
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Manage your logistics
                  services and shipments
                  from one place.
                </p>

              </div>

              <div className="px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100">

                <div className="flex items-center gap-2">

                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>

                  <span className="text-xs font-black text-emerald-700 uppercase">
                    {userData?.status ||
                      "active"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* LOGISTICS STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* SHIPMENTS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Package size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                My Shipments
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                {bookingsLoading
                  ? "..."
                  : totalShipments}
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                Total bookings
              </p>

            </div>

            {/* IN TRANSIT */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Truck size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                In Transit
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                {bookingsLoading
                  ? "..."
                  : inTransitCount}
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                Active shipments
              </p>

            </div>

            {/* DELIVERED */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                Delivered
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                {bookingsLoading
                  ? "..."
                  : deliveredCount}
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                Completed shipments
              </p>

            </div>

            {/* RTO */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div className="w-11 h-11 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle size={22} />
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase">
                Return / RTO
              </p>

              <p className="text-3xl font-black text-[#001D3D] mt-1">
                {bookingsLoading
                  ? "..."
                  : rtoCount}
              </p>

              <p className="text-[11px] text-slate-400 mt-2">
                Returned or cancelled
              </p>

            </div>

          </div>

          {/* MY BOOKINGS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>

                <h3 className="font-black text-[#001D3D] text-lg">
                  My Recent Bookings
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Your bookings and shipment
                  activity
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">

                <Package size={15} />

                {bookings.length}{" "}
                Booking
                {bookings.length !== 1
                  ? "s"
                  : ""}

              </div>

            </div>

            {bookingsLoading ? (

              <div className="p-10 text-center">

                <Loader2
                  size={28}
                  className="mx-auto mb-3 animate-spin text-[#001D3D]"
                />

                <p className="text-sm font-bold text-slate-500">
                  Loading your bookings...
                </p>

              </div>

            ) : bookings.length === 0 ? (

              <div className="p-10 text-center">

                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package
                    size={28}
                    className="text-slate-400"
                  />
                </div>

                <h4 className="font-black text-[#001D3D]">
                  No bookings yet
                </h4>

                <p className="text-xs text-slate-400 mt-2">
                  Your confirmed bookings
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {bookings.map(
                  (booking) => {

                    const status =
                      booking.status ||
                      booking.bookingStatus ||
                      "Pending";

                    const service =
                      booking.serviceType ||
                      "Logistics Service";

                    const courier =
                      booking.courierName ||
                      booking.courier_name ||
                      "Courier Partner";

                    const price =
                      booking.price ??
                      booking.amount ??
                      null;

                    const normalizedStatus =
                      String(status)
                        .trim()
                        .toLowerCase();

                    const showCancelButton =
                      canCustomerCancel(
                        booking
                      );

                    const isCancelling =
                      cancellingBookingId ===
                      booking.id;

                    return (
                      <div
                        key={booking.id}
                        className="p-5 hover:bg-slate-50 transition"
                      >

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                          {/* LEFT */}
                          <div className="flex items-start gap-4 min-w-0">

                            <div className="w-11 h-11 bg-[#001D3D] text-white rounded-xl flex items-center justify-center shrink-0">
                              <Package
                                size={20}
                              />
                            </div>

                            <div className="min-w-0">

                              <div className="flex flex-wrap items-center gap-2">

                                <h4 className="font-black text-[#001D3D] text-sm">
                                  {service}
                                </h4>

                                <span
                                  className={
                                    "px-2 py-1 rounded-lg border text-[9px] font-black uppercase " +
                                    getStatusClass(
                                      status
                                    )
                                  }
                                >
                                  {status}
                                </span>

                              </div>

                              <p className="text-[10px] font-bold text-slate-400 mt-1 break-all">
                                Booking ID:{" "}
                                {booking.id}
                              </p>

                              <div className="flex flex-wrap gap-4 mt-3">

                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                  <MapPin
                                    size={14}
                                    className="text-[#FF5E00]"
                                  />

                                  {booking.pickupPincode ||
                                    booking.pickupAddress ||
                                    "Pickup"}
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                  <MapPin
                                    size={14}
                                    className="text-[#001D3D]"
                                  />

                                  {booking.dropPincode ||
                                    booking.dropAddress ||
                                    "Drop"}
                                </div>

                              </div>

                            </div>

                          </div>

                          {/* RIGHT */}
                          <div className="flex flex-wrap items-center gap-5 lg:justify-end">

                            <div>

                              <p className="text-[9px] font-black text-slate-400 uppercase">
                                Courier
                              </p>

                              <p className="text-xs font-black text-[#001D3D] mt-1">
                                {courier}
                              </p>

                            </div>

                            <div>

                              <p className="text-[9px] font-black text-slate-400 uppercase">
                                Date
                              </p>

                              <p className="text-xs font-black text-[#001D3D] mt-1 flex items-center gap-1">
                                <Calendar
                                  size={13}
                                />

                                {formatDate(
                                  booking.createdAt
                                )}
                              </p>

                            </div>

                            {price !== null && (
                              <div>

                                <p className="text-[9px] font-black text-slate-400 uppercase">
                                  Amount
                                </p>

                                <p className="text-sm font-black text-[#FF5E00] mt-1">
                                  ₹{price}
                                </p>

                              </div>
                            )}

                            {/* CANCEL BUTTON */}
                            {showCancelButton && (
                              <div>

                                <button
                                  type="button"
                                  disabled={
                                    isCancelling
                                  }
                                  onClick={() =>
                                    handleCancelBooking(
                                      booking
                                    )
                                  }
                                  className={
                                    "px-4 py-2 rounded-xl border text-xs font-black transition flex items-center justify-center gap-2 " +
                                    (isCancelling
                                      ? "border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
                                      : "border-red-200 text-red-600 hover:bg-red-50")
                                  }
                                >
                                  {isCancelling ? (
                                    <>
                                      <Loader2
                                        size={14}
                                        className="animate-spin"
                                      />
                                      Cancelling...
                                    </>
                                  ) : (
                                    "Cancel Booking"
                                  )}
                                </button>

                              </div>
                            )}

                            {/* CANCELLED MESSAGE */}
                            {normalizedStatus.includes(
                              "cancel"
                            ) && (
                              <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
                                <p className="text-[10px] font-black text-red-600 uppercase">
                                  Cancelled
                                </p>
                              </div>
                            )}

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* ACCOUNT INFORMATION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <h3 className="font-black text-[#001D3D] text-lg mb-4">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Firebase User ID
                </p>

                <p className="text-xs font-mono font-bold text-[#001D3D] break-all">
                  {userData?.uid}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Total Bookings
                </p>

                <p className="text-2xl font-black text-[#001D3D]">
                  {bookings.length}
                </p>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
```
