import React, { useState } from "react";
import {
  Bot,
  Send,
  Package,
  Truck,
  MapPin,
  Home,
  Warehouse,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock3,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

import aiLogisticsBanner from "../assets/ai-logistics-banner.png";

const quickActions = [
  {
    icon: Package,
    title: "Get a Price",
    text: "Check delivery rates",
    message: "I want to check a delivery price",
  },
  {
    icon: Truck,
    title: "Find a Service",
    text: "Choose the right service",
    message: "Help me choose the right logistics service",
  },
  {
    icon: MapPin,
    title: "Track Shipment",
    text: "Track your shipment",
    message: "I want to track my shipment",
  },
  {
    icon: Home,
    title: "Packers & Movers",
    text: "Plan your shifting",
    message: "I need Packers & Movers",
  },
  {
    icon: Warehouse,
    title: "Find Warehouse",
    text: "Find storage space",
    message: "I need a warehouse",
  },
  {
    icon: Globe,
    title: "International",
    text: "Ship worldwide",
    message: "I need international shipping",
  },
];

const LogisticsAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // =====================================================
  // LIVE APNI MANZIL AI - n8n + GEMINI
  // =====================================================
  const handleSend = async () => {
    const userMessage = message.trim();

    if (!userMessage || isTyping) return;

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://lone-join-clock-commission.trycloudflare.com/webhook/Ai-Booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const aiReply =
        data?.reply ||
        "Sorry, I could not generate a response right now.";

      // Show AI response
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error("Apni Manzil AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text:
            "Sorry, I'm unable to connect to Apni Manzil AI right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (text) => {
    setMessage(text);
  };

  const clearChat = () => {
    setMessages([]);
    setMessage("");
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-slate-300 pt-16 md:pt-20">

      {/* =====================================================
          PREMIUM AI HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#001D3D] text-white">

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left */}
            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-sm text-blue-100 mb-5">
                <Sparkles size={15} className="text-orange-400" />
                AI-Powered Logistics Assistant
              </div>

              <div className="flex items-start gap-4">

                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 items-center justify-center shadow-xl shadow-orange-500/20 shrink-0">
                  <Bot size={34} />
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                    Apni Manzil{" "}
                    <span className="text-orange-400">AI</span>
                  </h1>

                  <p className="mt-3 text-lg md:text-xl text-blue-100">
                    Your Smart Logistics Assistant
                  </p>
                </div>

              </div>

              <p className="mt-5 text-sm sm:text-base text-blue-100/80 max-w-2xl leading-7">
                Tell us what you need to send, move, store or track.
                Our AI is designed to understand your requirement and
                guide you towards the right logistics solution.
              </p>

            </div>

            {/* Right stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 text-center min-w-[82px]">
                <Zap className="mx-auto text-orange-400 mb-2" size={20} />
                <div className="text-xs sm:text-sm font-semibold">
                  Smart
                </div>
                <div className="text-[10px] text-blue-200">
                  Assistance
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 text-center min-w-[82px]">
                <Clock3 className="mx-auto text-orange-400 mb-2" size={20} />
                <div className="text-xs sm:text-sm font-semibold">
                  24/7
                </div>
                <div className="text-[10px] text-blue-200">
                  Available
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 text-center min-w-[82px]">
                <ShieldCheck
                  className="mx-auto text-orange-400 mb-2"
                  size={20}
                />
                <div className="text-xs sm:text-sm font-semibold">
                  Secure
                </div>
                <div className="text-[10px] text-blue-200">
                  Experience
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">

        {/* =================================================
            QUICK ACTIONS + CHAT
        ================================================= */}
        <div className="grid lg:grid-cols-[330px_1fr] gap-6">

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}
          <aside>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="p-5 border-b border-slate-100">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-bold text-[#002D5E]">
                      Quick Actions
                    </h2>

                    <p className="text-xs text-slate-600 mt-1">
                      Start with one of these
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>

                </div>

              </div>

              <div className="p-4 space-y-2">

                {quickActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.message)}
                      className="group w-full flex items-center gap-3 p-3 rounded-2xl border border-transparent hover:border-orange-200 hover:bg-orange-50/70 transition-all duration-200 text-left"
                    >

                      <div className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-white text-[#002D5E] flex items-center justify-center shrink-0 transition">
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="font-semibold text-sm text-slate-800">
                          {action.title}
                        </div>

                        <div className="text-xs text-slate-600 mt-0.5">
                          {action.text}
                        </div>

                      </div>

                      <ArrowRight
                        size={16}
                        className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
                      />

                    </button>
                  );
                })}

              </div>

            </div>

            {/* Trust card */}
            <div className="mt-4 rounded-3xl bg-gradient-to-br from-[#002D5E] to-[#001D3D] text-white p-5 overflow-hidden relative">

              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-orange-500/20 blur-2xl" />

              <div className="relative">

                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck
                    size={18}
                    className="text-orange-400"
                  />

                  <span className="font-semibold text-sm">
                    Smart Logistics
                  </span>
                </div>

                <p className="text-xs text-blue-100 leading-5">
                  Ask in your own language. Tell us your requirement
                  naturally and let Apni Manzil AI guide you.
                </p>

              </div>

            </div>

          </aside>

          {/* =================================================
              CHAT
          ================================================= */}
          <section>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[680px]">

              {/* Chat Header */}
              <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">

                <div className="flex items-center gap-3">

                  <div className="relative">

                    <div className="w-11 h-11 rounded-2xl bg-[#002D5E] text-white flex items-center justify-center shadow-md">
                      <Bot size={23} />
                    </div>

                    <span className="absolute -right-1 -bottom-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />

                  </div>

                  <div>
                    <div className="font-bold text-slate-800">
                      Apni Manzil Assistant
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-green-600 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Ready to help
                    </div>
                  </div>

                </div>

                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-[#002D5E] hover:bg-slate-50 transition"
                  >
                    <RotateCcw size={14} />
                    <span className="hidden sm:inline">
                      New Chat
                    </span>
                  </button>
                )}

              </div>

              {/* Messages */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-gradient-to-b from-slate-300 to-slate-200 p-4 sm:p-6">

                {messages.length === 0 ? (

                  <div className="h-full flex items-center justify-center">

                    <div className="max-w-lg text-center">

                      <div className="relative inline-flex mb-5">

                        <div className="absolute inset-0 rounded-3xl bg-orange-400/20 blur-xl" />

                        <div className="relative w-20 h-20 rounded-3xl bg-white border border-slate-200 shadow-sm text-[#002D5E] flex items-center justify-center">
                          <Bot size={40} />
                        </div>

                      </div>

                      <h2 className="text-2xl font-black text-[#002D5E]">
                        Hello! 👋
                      </h2>

                      <p className="text-slate-700 mt-3 text-sm sm:text-base leading-6">
                        Tell me what you need to send, move, store,
                        track or deliver. I'll help you find the right
                        logistics solution.
                      </p>

                      {/* Example */}
                      <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 text-left shadow-sm">

                        <div className="flex items-center gap-2 text-xs font-semibold text-[#002D5E] mb-2">
                          <MessageCircle size={15} />
                          Try asking
                        </div>

                        <p className="text-sm text-slate-600 leading-6">
                          "I want to send a 20kg parcel from Mumbai to Pune"
                        </p>

                      </div>

                      <div className="mt-5 flex flex-wrap justify-center gap-2">

                        {[
                          "Courier price",
                          "Track shipment",
                          "Warehouse",
                          "Packers & Movers",
                        ].map((item) => (
                          <button
                            key={item}
                            onClick={() => setMessage(item)}
                            className="px-3 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-700 hover:border-orange-300 hover:text-orange-600 transition"
                          >
                            {item}
                          </button>
                        ))}

                      </div>

                    </div>

                  </div>

                ) : (

                  <div className="space-y-5 max-w-4xl mx-auto">

                    {messages.map((item, index) => (

                      <div
                        key={index}
                        className={`flex ${
                          item.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        {item.type === "ai" && (
                          <div className="w-8 h-8 rounded-xl bg-[#002D5E] text-white flex items-center justify-center mr-2 mt-1 shrink-0">
                            <Bot size={16} />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                            item.type === "user"
                              ? "bg-[#002D5E] text-white rounded-br-md"
                              : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                          }`}
                        >
                          {item.text}
                        </div>

                      </div>

                    ))}

                    {/* Typing */}
                    {isTyping && (
                      <div className="flex items-center">

                        <div className="w-8 h-8 rounded-xl bg-[#002D5E] text-white flex items-center justify-center mr-2">
                          <Bot size={16} />
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">

                          <div className="flex gap-1">

                            <span className="w-2 h-2 bg-slate-900 rounded-full animate-bounce" />

                            <span
                              className="w-2 h-2 bg-slate-900 rounded-full animate-bounce"
                              style={{ animationDelay: "120ms" }}
                            />

                            <span
                              className="w-2 h-2 bg-slate-900 rounded-full animate-bounce"
                              style={{ animationDelay: "240ms" }}
                            />

                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                )}

              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0">

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition">

                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything about your logistics..."
                    className="flex-1 min-w-0 bg-transparent px-3 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!message.trim() || isTyping}
                    className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm shrink-0"
                    aria-label="Send message"
                  >
                    <Send size={19} />
                  </button>

                </div>

                <div className="flex items-center justify-center gap-2 mt-2 text-[10px] sm:text-[11px] text-slate-500">
                  <Sparkles size={12} />
                  Apni Manzil AI • Smart Logistics Assistance
                </div>

              </div>

            </div>

          </section>

        </div>

        {/* =================================================
            FULL WIDTH AI LOGISTICS BANNER
            BELOW CHAT
        ================================================= */}
        <div className="mt-6 rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
          <img
            src={aiLogisticsBanner}
            alt="Apni Manzil AI Logistics"
            className="w-full h-auto object-cover block"
          />
        </div>

      </main>

    </div>
  );
};

export default LogisticsAI;