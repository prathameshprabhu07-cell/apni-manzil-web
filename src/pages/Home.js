import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import HeroLogisticsImage from "../assets/global-logistics.png";
import TrackingAppImage from "../assets/tracking-app.png";

import RatingComponent from "../components/RatingComponent";

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

  // STATES
  const [selectedPath, setSelectedPath] = useState("");
  const [trackingService, setTrackingService] = useState(
    "Courier & Parcel Delivery"
  );
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [aiRequirement, setAiRequirement] = useState("");

  // MAIN SERVICES
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
    {
      id: 10,
      name: "India Post Services",
      shortName: "India Post",
      description: "Speed Post, parcels & postal services",
      icon: <Package size={30} />,
      color: "text-red-600",
      bg: "bg-red-50",
      path: "/india-post",
    },
  ];

  // QUICK SERVICES
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
    {
      title: "India Post",
      text: "Speed Post & parcel services",
      icon: <Package size={26} />,
      path: "/india-post",
    },
  ];

  // AI HANDLER
  const handleAIRequest = () => {
    const requirement = aiRequirement.trim();

    if (!requirement) {
      navigate("/ai-smart-logistics");
      return;
    }

    sessionStorage.setItem("apniManzilAIRequirement", requirement);

    navigate("/ai-smart-logistics", {
      state: { requirement },
    });
  };

  // SERVICE NAVIGATION
  const handleCompare = () => {
    if (!selectedPath) {
      alert("Please select a logistics service first.");
      return;
    }

    navigate(selectedPath);
  };

  // TRACKING
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

  // SCROLL TO SERVICES
  const scrollToServices = () => {
    document.getElementById("all-services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page min-h-screen min-w-0 bg-slate-50 font-sans text-slate-900">
      {/* TOP TICKER */}
      <div
        className="relative overflow-hidden whitespace-nowrap"
        style={{
          background: "#002D5E",
          color: "white",
          borderBottom: "3px solid #FF5E00",
        }}
      >
        <div
          className="home-ticker-content py-3"
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "tickerMove 28s linear infinite",
          }}
        >
          <span className="mx-12 font-black text-xs tracking-wider md:text-sm">
            🚚 Fast, Reliable Logistics Across India
          </span>

          <span className="mx-12 font-black text-xs tracking-wider md:text-sm">
            🤖 AI-Powered Logistics Assistance
          </span>

          <span className="mx-12 font-black text-xs tracking-wider md:text-sm">
            📦 Courier • Transport • Packers & Movers • Warehouse
          </span>

          <span className="mx-12 font-black text-xs tracking-wider md:text-sm">
            🌍 Domestic & International Logistics
          </span>

          <span className="mx-12 font-black text-xs tracking-wider md:text-sm">
            🇮🇳 India Post • Speed Post • Postal Services
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="home-hero relative flex min-h-[480px] items-center overflow-hidden md:min-h-[650px]">
        <div className="absolute inset-0">
          <img
            src={HeroLogisticsImage}
            alt="Apni Manzil Logistics"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#001D3D]/20" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#001D3D] via-[#001D3D]/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* HERO LEFT */}
            <div className="lg:col-span-7">
              <div className="mb-7">
                <p className="mb-2 max-w-full text-xs font-black uppercase tracking-wider text-orange-400 md:text-sm md:tracking-[0.18em]">
                  India’s AI Smart Logistics Aggregator Platform
                </p>

                <h2 className="text-xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                  One Solution for{" "}
                  <span className="text-orange-500">All Delivery</span>
                </h2>
              </div>

              <div className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
                <Sparkles size={16} className="text-orange-400" />

                <span className="text-xs font-black tracking-wider md:text-sm">
                  AI-POWERED LOGISTICS PLATFORM
                </span>
              </div>

              <h1 className="mb-6 text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Tell us what you
                <span className="text-orange-500"> need to move.</span>
              </h1>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
                Courier, transport, packers & movers, warehouse,
                international logistics, India Post and more — all in one
                place.
              </p>

              {/* AI INPUT */}
              <div className="home-ai-input-panel max-w-3xl rounded-[24px] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col gap-2 rounded-[18px] bg-white p-2 sm:flex-row">
                  <div className="flex min-w-0 flex-1 items-center px-3">
                    <Bot
                      size={22}
                      className="mr-3 shrink-0 text-orange-500"
                    />

                    <input
                      type="text"
                      value={aiRequirement}
                      onChange={(e) => setAiRequirement(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAIRequest();
                        }
                      }}
                      placeholder="Example: Send 20kg from Mumbai to Pune..."
                      className="w-full min-w-0 bg-transparent py-3 text-sm font-semibold text-slate-800 outline-none md:text-base"
                    />

                    <Mic
                      size={20}
                      className="hidden text-slate-400 sm:block"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAIRequest}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-orange-600 active:scale-95"
                  >
                    Ask AI
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                <Sparkles size={13} />
                Type your requirement and let Apni Manzil guide you.
              </p>
            </div>

            {/* HERO AI CARD */}
            <div className="hidden lg:col-span-5 md:block">
              <div className="home-ai-preview rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
                    <Bot size={30} className="text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Meet Apni Manzil AI
                    </h3>

                    <p className="text-sm text-white/50">
                      Your logistics assistant
                    </p>
                  </div>
                </div>

                <div className="mb-3 rounded-2xl bg-white/10 p-4">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-white/40">
                    You
                  </p>

                  <p className="text-sm font-medium text-white">
                    “I need to send 50kg from Mumbai to Pune.”
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-wider text-orange-500">
                    Apni Manzil AI
                  </p>

                  <p className="text-sm font-semibold leading-relaxed text-slate-700">
                    I'll help you find suitable logistics options based on
                    your requirement.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  {["Understand", "Compare", "Book", "Track"].map((item) => (
                    <div key={item} className="text-center">
                      <div className="mx-auto mb-2 h-2 w-2 rounded-full bg-orange-500" />
                      <p className="text-[9px] font-bold text-white/50">
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

      {/* TRUST BAR */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
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
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002D5E]">
                  {item.icon}
                </div>

                <div>
                  <p className="text-xs font-black text-[#002D5E] md:text-sm">
                    {item.title}
                  </p>

                  <p className="text-[10px] text-slate-400 md:text-xs">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">
            One Platform
          </p>

          <h2 className="text-2xl font-black tracking-tight text-[#002D5E] sm:text-3xl md:text-5xl">
            What do you need to move?
          </h2>

          <p className="mt-3 text-slate-500">
            Choose a service or simply ask Apni Manzil AI.
          </p>
        </div>

        <div className="home-quick-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickServices.map((service) => (
            <button
              key={service.title}
              type="button"
              onClick={() => navigate(service.path)}
              className="home-quick-card group flex w-full items-center gap-4 rounded-[20px] border border-slate-100 bg-white p-4 text-left transition-all hover:border-orange-300 hover:shadow-xl sm:block sm:rounded-[24px] sm:p-6"
            >
              <div className="flex shrink-0 items-center justify-between sm:mb-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002D5E] transition-colors group-hover:bg-orange-50 group-hover:text-orange-500">
                  {service.icon}
                </div>

                <ArrowRight
                  size={19}
                  className="hidden text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500 sm:block"
                />
              </div>

              <div className="min-w-0 sm:mt-5">
                <h3 className="text-base font-black text-[#002D5E] sm:text-lg">
                  {service.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{service.text}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={scrollToServices}
            className="text-sm font-black text-[#002D5E] transition-colors hover:text-orange-500"
          >
            View all logistics services →
          </button>
        </div>
      </section>

      {/* AI LOGISTICS ENGINE */}
      <section className="bg-[#002D5E] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="min-w-0">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-orange-400">
                <Sparkles size={15} />

                <span className="text-xs font-black uppercase tracking-wider">
                  AI Logistics Assistant
                </span>
              </div>

              <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-3xl xl:text-4xl">
                Your requirement.
                <br />
                <span className="text-orange-500">
                  Our logistics intelligence.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                Tell Apni Manzil what you need to move. The platform can guide
                you toward the relevant logistics service and available
                options.
              </p>

              <button
                type="button"
                onClick={handleAIRequest}
                className="mt-7 flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black text-white transition-all hover:bg-white hover:text-[#002D5E]"
              >
                <Bot size={18} />
                Start with AI
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="home-ai-demo min-w-0 rounded-[32px] border border-white/10 bg-white/10 p-5 md:p-7">
              <div className="rounded-2xl bg-white p-5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Bot size={22} />
                  </div>

                  <div>
                    <p className="font-black text-[#002D5E]">
                      Apni Manzil AI
                    </p>

                    <p className="text-[11px] font-bold text-green-600">
                      ● Ready to help
                    </p>
                  </div>
                </div>

                <div className="mb-3 rounded-2xl bg-slate-100 p-4">
                  <p className="text-xs font-bold text-slate-500">Customer</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    “Mumbai to Pune, 100kg commercial goods. Need delivery
                    within 2 days.”
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-black text-[#002D5E]">AI</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Requirement understood. I can help you explore suitable
                    transport and logistics options.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#002D5E]">
                      🚚 Transport
                    </span>

                    <span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#002D5E]">
                      📦 Freight
                    </span>

                    <span className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#002D5E]">
                      📍 Track
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-orange-500 md:tracking-[0.3em]">
              Compare Before You Book
            </p>

            <h2 className="text-3xl font-black leading-tight text-[#002D5E] md:text-5xl">
              Choose the logistics option that fits your need.
            </h2>

            <p className="mt-5 leading-relaxed text-slate-500">
              Select your requirement and explore the relevant logistics
              service. We want to make the booking process simple and
              transparent.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
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

          <div className="home-rate-panel rounded-[30px] border border-slate-100 bg-white p-5 shadow-xl">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-orange-500" />

                <input
                  type="text"
                  placeholder="Pickup Pincode"
                  aria-label="Pickup Pincode"
                  className="w-full bg-transparent text-sm font-bold outline-none"
                />
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-[#002D5E]" />

                <input
                  type="text"
                  placeholder="Delivery Pincode"
                  aria-label="Delivery Pincode"
                  className="w-full bg-transparent text-sm font-bold outline-none"
                />
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <Box size={20} className="text-orange-500" />

                <select
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                  aria-label="Select Logistics Service"
                  className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                >
                  <option value="">Select Logistics Service</option>

                  {mainServices.map((service) => (
                    <option key={service.id} value={service.path}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompare}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#002D5E] py-4 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-orange-500"
            >
              Continue
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* SHIPMENT TRACKING */}
      <section
        id="track"
        className="mx-auto max-w-7xl px-5 py-8 md:px-8"
      >
        <div className="home-track-panel w-full min-w-0 rounded-[24px] border border-slate-100 bg-white p-5 shadow-xl md:rounded-[35px] md:p-12">
          <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-5">
            <div className="flex justify-center lg:col-span-2">
              <div className="max-w-[260px]">
                <img
                  src={TrackingAppImage}
                  alt="Apni Manzil Shipment Tracking"
                  className="w-full rounded-[30px] border-4 border-slate-900 shadow-xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://img.freepik.com/premium-vector/tracking-delivery-service-home-with-smartphone_101884-754.jpg";
                  }}
                />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-orange-600">
                <Zap size={14} fill="currentColor" />

                <span className="text-xs font-black uppercase tracking-wider">
                  Smart Tracking
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black text-[#002D5E] md:text-5xl">
                Track your
                <span className="text-orange-500"> shipment.</span>
              </h2>

              <p className="mt-4 text-slate-500">
                Enter your tracking number and select the relevant logistics
                service.
              </p>

              <form onSubmit={handleLiveTrackSubmit} className="mt-7">
                <div className="grid min-w-0 gap-3 md:grid-cols-2">
                  <select
                    value={trackingService}
                    onChange={(e) => setTrackingService(e.target.value)}
                    aria-label="Tracking service"
                    className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-[#002D5E] outline-none"
                  >
                    <option>Courier & Parcel Delivery</option>
                    <option>Hyperlocal / Bike Delivery</option>
                    <option>Truck & Transport Booking</option>
                    <option>Packers & Movers</option>
                    <option>Warehouse & Storage</option>
                    <option>International Logistics</option>
                    <option>E-commerce Logistics</option>
                    <option>Special Logistics</option>
                    <option>AI Smart Logistics</option>
                    <option>India Post Services</option>
                  </select>

                  <div className="flex min-w-0 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <Search size={20} className="mr-3 text-orange-500" />

                    <input
                      type="text"
                      value={trackingIdInput}
                      onChange={(e) => setTrackingIdInput(e.target.value)}
                      placeholder="Enter Tracking ID"
                      aria-label="Enter Tracking ID"
                      className="w-full min-w-0 bg-transparent py-4 text-sm font-bold outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#002D5E] py-4 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-orange-500"
                >
                  Track Shipment
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-3 text-xs text-slate-400">
                You can use your shipment AWB, tracking ID or Apni Manzil
                booking reference where supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL SERVICES */}
      <section
        id="all-services"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#002D5E] md:text-5xl">
            All Logistics Services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {mainServices.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(service.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(service.path);
                }
              }}
              role="button"
              tabIndex={0}
              className="home-service-tile group cursor-pointer rounded-[25px] border border-slate-100 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`${service.bg} ${service.color} flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110`}
                >
                  {service.icon}
                </div>

                <ChevronRight
                  size={20}
                  className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500"
                />
              </div>

              <h3 className="mt-5 font-black text-[#002D5E]">
                {service.name}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {service.description}
              </p>

              <p className="mt-5 text-xs font-black uppercase tracking-wider text-orange-500">
                Explore Service →
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BUSINESS AND PARTNER SECTION */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="home-business-card rounded-[32px] bg-[#002D5E] p-8 md:p-10">
              <Building2 size={36} className="text-orange-500" />

              <h2 className="mt-6 text-3xl font-black text-white md:text-4xl">
                Built for Indian Businesses
              </h2>

              <p className="mt-4 leading-relaxed text-white/60">
                Manage your logistics requirements from one place — shipments,
                transport, warehouse, e-commerce and more.
              </p>

              <button
                type="button"
                onClick={() => navigate("/ecommerce-logistics")}
                className="mt-7 flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white transition-all hover:bg-white hover:text-[#002D5E]"
              >
                Explore Business Logistics
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="home-partner-card rounded-[32px] border border-slate-200 bg-white p-8 md:p-10">
              <MessageCircle size={36} className="text-[#002D5E]" />

              <h2 className="mt-6 text-3xl font-black text-[#002D5E] md:text-4xl">
                Need a Logistics Partner?
              </h2>

              <p className="mt-4 leading-relaxed text-slate-500">
                Join the Apni Manzil logistics network and connect with
                customers looking for logistics services.
              </p>

              <button
                type="button"
                onClick={() => navigate("/partner-registration")}
                className="mt-7 flex items-center gap-2 rounded-2xl bg-[#002D5E] px-6 py-4 text-sm font-black text-white transition-all hover:bg-orange-500"
              >
                Become a Partner
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
            Simple Process
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#002D5E] md:text-5xl">
            Logistics made simple.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
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
              className="home-process-step rounded-[25px] border border-slate-100 bg-white p-7"
            >
              <div className="text-sm font-black text-orange-500">
                {step.number}
              </div>

              <h3 className="mt-4 text-xl font-black text-[#002D5E]">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY APNI MANZIL */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="rounded-[24px] border border-slate-100 bg-white p-5 md:rounded-[35px] md:p-12">
          <div className="mb-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
              Why Apni Manzil
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#002D5E] md:text-5xl">
              One platform. Multiple logistics needs.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                className="home-benefit-card rounded-2xl bg-slate-50 p-6 transition-colors hover:bg-blue-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#002D5E] shadow-sm">
                  {item.icon}
                </div>

                <h3 className="mt-5 font-black text-[#002D5E]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="home-feedback-panel rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm md:rounded-[35px] md:p-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#002D5E] md:text-4xl">
              Share Your <span className="text-orange-500">Feedback</span>
            </h2>

            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Your feedback helps us improve Apni Manzil.
            </p>
          </div>

          <RatingComponent />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-16 md:px-8">
        <div className="home-final-cta relative mx-auto max-w-7xl overflow-hidden rounded-[35px]">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1600"
            alt="Apni Manzil Logistics"
            className="h-[360px] w-full object-cover sm:h-[430px] md:h-[520px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#002D5E]/95 via-[#002D5E]/70 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-5 md:px-14">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-orange-400">
                APNI MANZIL
              </p>

              <h2 className="text-3xl font-black leading-[1.05] text-white sm:text-5xl md:text-7xl">
                Your logistics.
                <br />
                <span className="text-orange-500">One platform.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
                Tell us what you need to move and start your logistics journey
                with Apni Manzil.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAIRequest}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-7 py-4 font-black text-white transition-all hover:bg-white hover:text-[#002D5E]"
                >
                  <Bot size={18} />
                  Ask Apni Manzil AI
                </button>

                <button
                  type="button"
                  onClick={scrollToServices}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-black text-white transition-all hover:bg-white hover:text-[#002D5E]"
                >
                  Explore Services
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND FOOTER STRIP */}
      <section className="bg-[#002D5E] py-10">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            APNI <span className="text-orange-500">MANZIL</span> LOGISTICS
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-500" />

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 md:text-xs">
            Reliable • Smart • Connected
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;