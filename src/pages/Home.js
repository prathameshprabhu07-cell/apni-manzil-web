import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Images
import HeroLogisticsImage from "../assets/global-logistics.png";
import TrackingAppImage from "../assets/tracking-app.png";

// Rating
import RatingComponent from "../components/RatingComponent";

// Icons
import {
  Package,
  Truck,
  Bike,
  Home as HomeIcon,
  Warehouse,
  Globe,
  Zap,
  Bot,
  Star,
  Search,
  HelpCircle,
  Box,
  Boxes,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  MapPin,
  Sparkles,
  Mic,
  Clock,
  ShieldCheck,
  Building2,
  MessageCircle,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // STATES
  // --------------------------------------------------

  const [selectedPath, setSelectedPath] = useState("");
  const [trackingService, setTrackingService] = useState(
    "Courier & Parcel Delivery"
  );
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [aiRequirement, setAiRequirement] = useState("");

  // --------------------------------------------------
  // SERVICES
  // --------------------------------------------------

  const mainServices = [
    {
      id: 1,
      name: "Courier & Parcel Delivery",
      shortName: "Send a Package",
      description: "Courier, parcel & express delivery",
      icon: <Package size={30} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      path: "/courier-service",
    },
    {
      id: 2,
      name: "Hyperlocal / Bike Delivery",
      shortName: "Local Delivery",
      description: "Fast same-city bike delivery",
      icon: <Bike size={30} />,
      color: "text-orange-500",
      bg: "bg-orange-50",
      path: "/hyperlocal-service",
    },
    {
      id: 3,
      name: "Truck & Transport Booking",
      shortName: "Move Goods",
      description: "Truck, freight & B2B transport",
      icon: <Truck size={30} />,
      color: "text-green-600",
      bg: "bg-green-50",
      path: "/truck-transport",
    },
    {
      id: 4,
      name: "Packers & Movers",
      shortName: "Move Your Home",
      description: "Home & office shifting",
      icon: <HomeIcon size={30} />,
      color: "text-amber-700",
      bg: "bg-amber-50",
      path: "/packers-movers",
    },
    {
      id: 5,
      name: "Warehouse & Storage",
      shortName: "Find Warehouse",
      description: "Storage & fulfillment solutions",
      icon: <Warehouse size={30} />,
      color: "text-slate-600",
      bg: "bg-slate-50",
      path: "/warehouse-storage",
    },
    {
      id: 6,
      name: "International Logistics",
      shortName: "Ship Worldwide",
      description: "International logistics solutions",
      icon: <Globe size={30} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      path: "/international-logistics",
    },
    {
      id: 7,
      name: "E-commerce Logistics",
      shortName: "E-commerce",
      description: "Shipping, COD & returns",
      icon: <Boxes size={30} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
      path: "/ecommerce-logistics",
    },
    {
      id: 8,
      name: "Special Logistics",
      shortName: "Special Logistics",
      description: "Specialized shipment requirements",
      icon: <Star size={30} />,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      path: "/special-logistics",
    },
    {
      id: 9,
      name: "AI Smart Logistics",
      shortName: "Ask AI",
      description: "Let AI help find your solution",
      icon: <Bot size={30} />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      path: "/ai-smart-logistics",
    },
  ];

  // --------------------------------------------------
  // AI HANDLER
  // --------------------------------------------------

  const handleAIRequest = () => {
    const requirement = aiRequirement.trim();

    if (!requirement) {
      navigate("/ai-smart-logistics");
      return;
    }

    sessionStorage.setItem(
      "apniManzilAIRequirement",
      requirement
    );

    navigate("/ai-smart-logistics", {
      state: {
        requirement,
      },
    });
  };

  // --------------------------------------------------
  // SERVICE NAVIGATION
  // --------------------------------------------------

  const handleCompare = () => {
    if (!selectedPath) {
      alert("Please select a logistics service first.");
      return;
    }

    navigate(selectedPath);
  };

  // --------------------------------------------------
  // TRACKING
  // --------------------------------------------------

  const handleLiveTrackSubmit = async (e) => {
    e.preventDefault();

    if (!trackingIdInput.trim()) {
      alert("Please enter a valid tracking ID.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5678/webhook/4b54e0a4-ba4b-484f-8d2d-d804f5b65348",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trackingId: trackingIdInput.trim(),
            service: trackingService,
          }),
        }
      );

      if (response.ok) {
        alert("Tracking request sent successfully!");
      } else {
        alert("Unable to track this shipment. Please try again.");
      }
    } catch (error) {
      console.error("Tracking webhook error:", error);
      alert("Tracking service is temporarily unavailable.");
    }
  };

  // --------------------------------------------------
  // QUICK SERVICE CARDS
  // --------------------------------------------------

  const quickServices = [
    {
      title: "Send a Package",
      text: "Courier, parcel & express delivery",
      icon: <Package size={26} />,
      path: "/courier-service",
    },
    {
      title: "Move Goods",
      text: "Truck, freight & B2B transport",
      icon: <Truck size={26} />,
      path: "/truck-transport",
    },
    {
      title: "Move Your Home",
      text: "Packers & movers",
      icon: <HomeIcon size={26} />,
      path: "/packers-movers",
    },
    {
      title: "Find Warehouse",
      text: "Storage & fulfillment",
      icon: <Warehouse size={26} />,
      path: "/warehouse-storage",
    },
    {
      title: "Ship Worldwide",
      text: "International logistics",
      icon: <Globe size={26} />,
      path: "/international-logistics",
    },
    {
      title: "E-commerce",
      text: "Shipping, COD & returns",
      icon: <Boxes size={26} />,
      path: "/ecommerce-logistics",
    },
  ];

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* =====================================================
          TOP TICKER
      ====================================================== */}

      <div
        className="relative overflow-hidden whitespace-nowrap"
        style={{
          background: "#002D5E",
          color: "white",
          borderBottom: "3px solid #FF5E00",
        }}
      >
        <div
          className="py-3"
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "tickerMove 28s linear infinite",
          }}
        >
          <span className="mx-12 font-black text-xs md:text-sm tracking-wider">
            🚚 Fast, Reliable Logistics Across India
          </span>

          <span className="mx-12 font-black text-xs md:text-sm tracking-wider">
            🤖 AI-Powered Logistics Assistance
          </span>

          <span className="mx-12 font-black text-xs md:text-sm tracking-wider">
            📦 Courier • Transport • Packers & Movers • Warehouse
          </span>

          <span className="mx-12 font-black text-xs md:text-sm tracking-wider">
            🌍 Domestic & International Logistics
          </span>
        </div>

        <style>
          {`
            @keyframes tickerMove {
              0% {
                transform: translateX(0);
              }

              100% {
                transform: translateX(-100%);
              }
            }
          `}
        </style>
      </div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative min-h-[620px] md:min-h-[650px] flex items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HeroLogisticsImage}
            alt="Apni Manzil Logistics"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#001D3D]/20" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#001D3D] via-[#001D3D]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 py-16">

          <div className="grid lg:grid-cols-12 gap-10 items-center">

            {/* LEFT */}
            <div className="lg:col-span-7">

              {/* =================================================
                  NEW BRAND POSITIONING
                  ================================================= */}

              <div className="mb-7">

                <p className="text-orange-400 text-xs md:text-sm font-black uppercase tracking-[0.18em] mb-2">
                  India’s AI Smart Logistics Aggregator Platform
                </p>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                  One Solution for{" "}
                  <span className="text-orange-500">
                    All Delivery
                  </span>
                </h2>

              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6">

                <Sparkles
                  size={16}
                  className="text-orange-400"
                />

                <span className="text-xs md:text-sm font-black tracking-wider">
                  AI-POWERED LOGISTICS PLATFORM
                </span>

              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.98] tracking-tight mb-6">

                Tell us what you

                <span className="text-orange-500">
                  {" "}need to move.
                </span>

              </h1>

              <p className="text-white/75 text-base md:text-xl max-w-2xl leading-relaxed mb-8">
                Courier, transport, packers & movers, warehouse,
                international logistics and more — all in one place.
              </p>

              {/* AI INPUT */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-[24px] max-w-3xl shadow-2xl">

                <div className="bg-white rounded-[18px] p-2 flex flex-col sm:flex-row gap-2">

                  <div className="flex-1 flex items-center px-3">

                    <Bot
                      size={22}
                      className="text-orange-500 mr-3 shrink-0"
                    />

                    <input
                      type="text"
                      value={aiRequirement}
                      onChange={(e) =>
                        setAiRequirement(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAIRequest();
                        }
                      }}
                      placeholder="Example: Send 20kg from Mumbai to Pune..."
                      className="w-full bg-transparent outline-none text-slate-800 font-semibold text-sm md:text-base py-3"
                    />

                    <Mic
                      size={20}
                      className="text-slate-400 hidden sm:block"
                    />

                  </div>

                  <button
                    onClick={handleAIRequest}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    Ask AI
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>

              <p className="text-white/50 text-xs mt-3 flex items-center gap-2">
                <Sparkles size={13} />
                Type your requirement and let Apni Manzil guide you.
              </p>

            </div>

            {/* RIGHT AI CARD */}
            <div className="lg:col-span-5 hidden md:block">

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 md:p-8 shadow-2xl">

                <div className="flex items-center gap-4 mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">

                    <Bot
                      size={30}
                      className="text-white"
                    />

                  </div>

                  <div>
                    <h3 className="text-white font-black text-xl">
                      Meet Apni Manzil AI
                    </h3>

                    <p className="text-white/50 text-sm">
                      Your logistics assistant
                    </p>
                  </div>

                </div>

                {/* User message */}
                <div className="bg-white/10 rounded-2xl p-4 mb-3">

                  <p className="text-white/40 text-[10px] uppercase font-black tracking-wider mb-1">
                    You
                  </p>

                  <p className="text-white text-sm font-medium">
                    “I need to send 50kg from Mumbai to Pune.”
                  </p>

                </div>

                {/* AI message */}
                <div className="bg-white rounded-2xl p-4">

                  <p className="text-orange-500 text-[10px] uppercase font-black tracking-wider mb-1">
                    Apni Manzil AI
                  </p>

                  <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                    I'll help you find suitable logistics
                    options based on your requirement.
                  </p>

                </div>

                {/* Mini flow */}
                <div className="grid grid-cols-4 gap-2 mt-6">

                  {[
                    "Understand",
                    "Compare",
                    "Book",
                    "Track",
                  ].map((item) => (
                    <div
                      key={item}
                      className="text-center"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mb-2" />

                      <p className="text-[9px] text-white/50 font-bold">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK TRUST BAR
      ====================================================== */}

      <section className="bg-white border-b border-slate-100">

        <div className="max-w-7xl mx-auto px-5 py-5">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {[
              {
                icon: <CheckCircle size={20} />,
                title: "Multiple Options",
                text: "Compare available choices",
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "Transparent",
                text: "Clear pricing information",
              },
              {
                icon: <MapPin size={20} />,
                title: "Track Shipments",
                text: "Stay updated",
              },
              {
                icon: <Bot size={20} />,
                title: "AI Assistance",
                text: "Get logistics guidance",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3"
              >

                <div className="w-10 h-10 bg-blue-50 text-[#002D5E] rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>

                <div>
                  <p className="font-black text-[#002D5E] text-xs md:text-sm">
                    {item.title}
                  </p>

                  <p className="text-slate-400 text-[10px] md:text-xs">
                    {item.text}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK SERVICES
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">

        <div className="text-center mb-10">

          <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
            One Platform
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-[#002D5E] tracking-tight">
            What do you need to move?
          </h2>

          <p className="text-slate-500 mt-3">
            Choose a service or simply ask Apni Manzil AI.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {quickServices.map((service) => (
            <button
              key={service.title}
              onClick={() => navigate(service.path)}
              className="text-left bg-white p-6 rounded-[24px] border border-slate-100 hover:border-orange-300 hover:shadow-xl transition-all group"
            >

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#002D5E] flex items-center justify-center group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  {service.icon}
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                />

              </div>

              <h3 className="font-black text-[#002D5E] text-lg mt-5">
                {service.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {service.text}
              </p>

            </button>
          ))}

        </div>

        <div className="text-center mt-7">

          <button
            onClick={() => {
              document
                .getElementById("all-services")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="text-[#002D5E] font-black text-sm hover:text-orange-500 transition-colors"
          >
            View all logistics services →
          </button>

        </div>

      </section>

      {/* =====================================================
          AI LOGISTICS ENGINE
      ====================================================== */}

      <section className="bg-[#002D5E] py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-5 md:px-8">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 text-orange-400 px-4 py-2 rounded-full border border-white/10 mb-5">

                <Sparkles size={15} />

                <span className="text-xs font-black uppercase tracking-wider">
                  AI Logistics Assistant
                </span>

              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">

                Your requirement.

                <br />

                <span className="text-orange-500">
                  Our logistics intelligence.
                </span>

              </h2>

              <p className="text-white/60 text-base md:text-lg mt-5 max-w-xl leading-relaxed">
                Tell Apni Manzil what you need to move.
                The platform can guide you toward the relevant
                logistics service and available options.
              </p>

              <button
                onClick={() => navigate("/ai-smart-logistics")}
                className="mt-7 bg-orange-500 hover:bg-white hover:text-[#002D5E] text-white px-7 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all"
              >
                Start with AI
                <ArrowRight size={18} />
              </button>

            </div>

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-5 md:p-7">

              <div className="bg-white rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Bot size={22} />
                  </div>

                  <div>
                    <p className="font-black text-[#002D5E]">
                      Apni Manzil AI
                    </p>

                    <p className="text-[11px] text-green-600 font-bold">
                      ● Ready to help
                    </p>
                  </div>

                </div>

                <div className="bg-slate-100 rounded-2xl p-4 mb-3">

                  <p className="text-xs text-slate-500 font-bold">
                    Customer
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    “Mumbai to Pune, 100kg commercial goods.
                    Need delivery within 2 days.”
                  </p>

                </div>

                <div className="bg-blue-50 rounded-2xl p-4">

                  <p className="text-xs text-[#002D5E] font-black">
                    AI
                  </p>

                  <p className="text-sm text-slate-700 font-semibold mt-1">
                    Requirement understood. I can help you
                    explore suitable transport and logistics
                    options.
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap">

                    <span className="bg-white px-3 py-2 rounded-xl text-xs font-bold text-[#002D5E]">
                      🚚 Transport
                    </span>

                    <span className="bg-white px-3 py-2 rounded-xl text-xs font-bold text-[#002D5E]">
                      📦 Freight
                    </span>

                    <span className="bg-white px-3 py-2 rounded-xl text-xs font-bold text-[#002D5E]">
                      📍 Track
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COMPARE SERVICES
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
              Compare Before You Book
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] leading-tight">
              Choose the logistics option that fits your need.
            </h2>

            <p className="text-slate-500 mt-5 leading-relaxed">
              Select your requirement and explore the relevant
              logistics service. We want to make the booking
              process simple and transparent.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">

              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <CheckCircle size={17} className="text-green-500" />
                Price
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <Clock size={17} className="text-orange-500" />
                ETA
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <ShieldCheck size={17} className="text-blue-500" />
                Service
              </div>

            </div>

          </div>

          <div className="bg-white rounded-[30px] shadow-xl border border-slate-100 p-5">

            <div className="bg-slate-50 rounded-2xl p-4">

              <div className="flex items-center gap-3">

                <MapPin
                  size={20}
                  className="text-orange-500"
                />

                <input
                  placeholder="Pickup Pincode"
                  className="bg-transparent outline-none w-full font-bold text-sm"
                />

              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-4 mt-3">

              <div className="flex items-center gap-3">

                <Search
                  size={20}
                  className="text-[#002D5E]"
                />

                <input
                  placeholder="Delivery Pincode"
                  className="bg-transparent outline-none w-full font-bold text-sm"
                />

              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-4 mt-3">

              <div className="flex items-center gap-3">

                <Box
                  size={20}
                  className="text-orange-500"
                />

                <select
                  value={selectedPath}
                  onChange={(e) =>
                    setSelectedPath(e.target.value)
                  }
                  className="bg-transparent outline-none w-full font-bold text-sm text-slate-700"
                >
                  <option value="">
                    Select Logistics Service
                  </option>

                  {mainServices.map((service) => (
                    <option
                      key={service.id}
                      value={service.path}
                    >
                      {service.name}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            <button
              onClick={handleCompare}
              className="w-full mt-4 bg-[#002D5E] hover:bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all"
            >
              Continue
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          TRACKING
      ====================================================== */}

      <section
        id="track"
        className="max-w-7xl mx-auto px-5 md:px-8 py-8"
      >

        <div className="bg-white rounded-[35px] p-7 md:p-12 shadow-xl border border-slate-100">

          <div className="grid lg:grid-cols-5 gap-10 items-center">

            <div className="lg:col-span-2 flex justify-center">

              <div className="max-w-[260px]">

                <img
                  src={TrackingAppImage}
                  alt="Apni Manzil Shipment Tracking"
                  className="w-full rounded-[30px] shadow-xl border-4 border-slate-900"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://img.freepik.com/premium-vector/tracking-delivery-service-home-with-smartphone_101884-754.jpg";
                  }}
                />

              </div>

            </div>

            <div className="lg:col-span-3">

              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full border border-orange-100">

                <Zap size={14} fill="currentColor" />

                <span className="text-xs font-black uppercase tracking-wider">
                  Smart Tracking
                </span>

              </div>

              <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] mt-4 leading-tight">
                Track your
                <span className="text-orange-500">
                  {" "}shipment.
                </span>
              </h2>

              <p className="text-slate-500 mt-4">
                Enter your tracking number and select the
                relevant logistics service.
              </p>

              <form
                onSubmit={handleLiveTrackSubmit}
                className="mt-7"
              >

                <div className="grid md:grid-cols-2 gap-3">

                  <select
                    value={trackingService}
                    onChange={(e) =>
                      setTrackingService(e.target.value)
                    }
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none font-bold text-sm text-[#002D5E]"
                  >

                    <option>
                      Courier & Parcel Delivery
                    </option>

                    <option>
                      Hyperlocal / Bike Delivery
                    </option>

                    <option>
                      Truck & Transport Booking
                    </option>

                    <option>
                      Packers & Movers
                    </option>

                    <option>
                      Warehouse & Storage
                    </option>

                    <option>
                      International Logistics
                    </option>

                    <option>
                      E-commerce Logistics
                    </option>

                    <option>
                      Special Logistics
                    </option>

                    <option>
                      AI Smart Logistics
                    </option>

                  </select>

                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4">

                    <Search
                      size={20}
                      className="text-orange-500 mr-3"
                    />

                    <input
                      type="text"
                      value={trackingIdInput}
                      onChange={(e) =>
                        setTrackingIdInput(e.target.value)
                      }
                      placeholder="Enter Tracking ID"
                      className="bg-transparent outline-none w-full py-4 font-bold text-sm"
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full mt-3 bg-[#002D5E] hover:bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-3 transition-all"
                >
                  Track Shipment
                  <ArrowRight size={18} />
                </button>

              </form>

              <p className="text-xs text-slate-400 mt-3">
                You can use your shipment AWB, tracking ID or
                Apni Manzil booking reference where supported.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ALL SERVICES
      ====================================================== */}

      <section
        id="all-services"
        className="max-w-7xl mx-auto px-5 md:px-8 py-16"
      >

        <div className="text-center mb-10">

          <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
            Explore
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] mt-2">
            All Logistics Services
          </h2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

          {mainServices.map((service) => (

            <div
              key={service.id}
              onClick={() => navigate(service.path)}
              className="bg-white rounded-[25px] p-6 border border-slate-100 hover:border-orange-300 hover:shadow-xl cursor-pointer group transition-all"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`${service.bg} ${service.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>

                <ChevronRight
                  size={20}
                  className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                />

              </div>

              <h3 className="font-black text-[#002D5E] mt-5">
                {service.name}
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                {service.description}
              </p>

              <p className="text-orange-500 font-black text-xs uppercase tracking-wider mt-5">
                Explore Service →
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          BUSINESS SECTION
      ====================================================== */}

      <section className="bg-slate-100 py-16">

        <div className="max-w-7xl mx-auto px-5 md:px-8">

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-[#002D5E] rounded-[32px] p-8 md:p-10">

              <Building2
                size={36}
                className="text-orange-500"
              />

              <h2 className="text-3xl md:text-4xl font-black text-white mt-6">
                Built for Indian Businesses
              </h2>

              <p className="text-white/60 mt-4 leading-relaxed">
                Manage your logistics requirements from one
                place — shipments, transport, warehouse,
                e-commerce and more.
              </p>

              <button
                onClick={() => navigate("/ecommerce-logistics")}
                className="mt-7 bg-orange-500 text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-white hover:text-[#002D5E] transition-all"
              >
                Explore Business Logistics
                <ArrowRight size={17} />
              </button>

            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200">

              <MessageCircle
                size={36}
                className="text-[#002D5E]"
              />

              <h2 className="text-3xl md:text-4xl font-black text-[#002D5E] mt-6">
                Need a Logistics Partner?
              </h2>

              <p className="text-slate-500 mt-4 leading-relaxed">
                Join the Apni Manzil logistics network and
                connect with customers looking for logistics
                services.
              </p>

              <button
                onClick={() =>
                  navigate("/partner-registration")
                }
                className="mt-7 bg-[#002D5E] text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-orange-500 transition-all"
              >
                Become a Partner
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">

        <div className="text-center mb-12">

          <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
            Simple Process
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] mt-2">
            Logistics made simple.
          </h2>

        </div>

        <div className="grid md:grid-cols-4 gap-5">

          {[
            {
              number: "01",
              title: "Tell Us",
              text: "Tell us what you need to move.",
            },
            {
              number: "02",
              title: "Find Options",
              text: "Explore suitable logistics options.",
            },
            {
              number: "03",
              title: "Book",
              text: "Choose your option and book.",
            },
            {
              number: "04",
              title: "Track",
              text: "Follow your shipment until delivery.",
            },
          ].map((step) => (

            <div
              key={step.number}
              className="bg-white rounded-[25px] p-7 border border-slate-100"
            >

              <div className="text-orange-500 font-black text-sm">
                {step.number}
              </div>

              <h3 className="text-xl font-black text-[#002D5E] mt-4">
                {step.title}
              </h3>

              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          WHY APNI MANZIL
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-8">

        <div className="bg-white rounded-[35px] p-8 md:p-12 border border-slate-100">

          <div className="text-center mb-12">

            <p className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
              Why Apni Manzil
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] mt-2">
              One platform. Multiple logistics needs.
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: <Boxes size={25} />,
                title: "Unified Logistics",
                text: "Multiple logistics categories in one platform.",
              },
              {
                icon: <CheckCircle size={25} />,
                title: "Partner Network",
                text: "Connect customers with relevant logistics providers.",
              },
              {
                icon: <HomeIcon size={25} />,
                title: "Doorstep Solutions",
                text: "Designed around convenient pickup and delivery.",
              },
              {
                icon: <Search size={25} />,
                title: "Tracking",
                text: "Keep visibility of your shipment journey.",
              },
              {
                icon: <ShieldCheck size={25} />,
                title: "Transparent",
                text: "Clear information before booking.",
              },
              {
                icon: <Zap size={25} />,
                title: "Smart Technology",
                text: "AI-assisted logistics experience.",
              },
              {
                icon: <Globe size={25} />,
                title: "Domestic & Global",
                text: "Solutions for India and international logistics.",
              },
              {
                icon: <HelpCircle size={25} />,
                title: "Customer Support",
                text: "Help throughout the logistics journey.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors"
              >

                <div className="w-12 h-12 rounded-xl bg-white text-[#002D5E] flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>

                <h3 className="font-black text-[#002D5E] mt-5">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FEEDBACK
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">

        <div className="bg-white rounded-[35px] p-8 md:p-12 shadow-sm border border-slate-100">

          <div className="text-center mb-8">

            <h2 className="text-3xl md:text-4xl font-black text-[#002D5E]">
              Share Your{" "}
              <span className="text-orange-500">
                Feedback
              </span>
            </h2>

            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">
              Your feedback helps us improve Apni Manzil.
            </p>

          </div>

          <RatingComponent />

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-5 md:px-8 pb-16">

        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[35px]">

          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1600"
            alt="Apni Manzil Logistics"
            className="w-full h-[430px] md:h-[520px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#002D5E]/95 via-[#002D5E]/70 to-transparent" />

          <div className="absolute inset-0 flex items-center">

            <div className="px-7 md:px-14 max-w-2xl">

              <p className="text-orange-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
                APNI MANZIL
              </p>

              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95]">
                Your logistics.
                <br />
                <span className="text-orange-500">
                  One platform.
                </span>
              </h2>

              <p className="text-white/70 text-base md:text-lg mt-5 max-w-xl">
                Tell us what you need to move and start your
                logistics journey with Apni Manzil.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <button
                  onClick={() =>
                    navigate("/ai-smart-logistics")
                  }
                  className="bg-orange-500 hover:bg-white hover:text-[#002D5E] text-white px-7 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
                >
                  <Bot size={18} />
                  Ask Apni Manzil AI
                </button>

                <button
                  onClick={() => {
                    document
                      .getElementById("all-services")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="bg-white/10 hover:bg-white text-white hover:text-[#002D5E] border border-white/30 px-7 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
                >
                  Explore Services
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BRAND FOOTER STRIP
      ====================================================== */}

      <section className="bg-[#002D5E] py-10">

        <div className="max-w-7xl mx-auto px-5 text-center">

          <h2 className="text-2xl md:text-3xl font-black text-white">
            APNI{" "}
            <span className="text-orange-500">
              MANZIL
            </span>{" "}
            LOGISTICS
          </h2>

          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />

          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mt-5">
            Reliable • Smart • Connected
          </p>

        </div>

      </section>

    </div>
  );
};

export default Home;