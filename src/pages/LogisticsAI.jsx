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
} from "lucide-react";

const quickActions = [
  {
    icon: Package,
    title: "Get a Price",
    text: "I want to check a delivery price",
  },
  {
    icon: Truck,
    title: "Find a Service",
    text: "Help me choose the right logistics service",
  },
  {
    icon: MapPin,
    title: "Track Shipment",
    text: "I want to track my shipment",
  },
  {
    icon: Home,
    title: "Packers & Movers",
    text: "I need Packers & Movers",
  },
  {
    icon: Warehouse,
    title: "Find Warehouse",
    text: "I need a warehouse",
  },
  {
    icon: Globe,
    title: "International",
    text: "I need international shipping",
  },
];

const LogisticsAI = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
      {
        type: "ai",
        text: "I'm your Apni Manzil AI Assistant. I'll help you find the right logistics solution. Live AI will be connected in the next step.",
      },
    ]);

    setMessage("");
  };

  const handleQuickAction = (text) => {
    setMessage(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <section className="bg-[#002D5E] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Bot size={32} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-4xl font-bold">
                  Apni Manzil AI
                </h1>

                <Sparkles
                  size={22}
                  className="text-orange-400"
                />
              </div>

              <p className="text-blue-100 mt-1">
                Your Smart Logistics Assistant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-lg font-bold text-[#002D5E] mb-1">
                How can I help?
              </h2>

              <p className="text-sm text-slate-500 mb-5">
                Choose an option or ask me anything about logistics.
              </p>

              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.text)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002D5E] flex items-center justify-center">
                        <Icon size={20} />
                      </div>

                      <div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {action.title}
                        </div>

                        <div className="text-xs text-slate-500">
                          {action.text}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">

              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#002D5E] text-white flex items-center justify-center">
                  <Bot size={21} />
                </div>

                <div>
                  <div className="font-bold text-slate-800">
                    Apni Manzil Assistant
                  </div>

                  <div className="text-xs text-green-600">
                    ● Ready to help
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-5 overflow-y-auto bg-slate-50">

                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div className="max-w-md">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#002D5E] flex items-center justify-center mb-4">
                        <Bot size={34} />
                      </div>

                      <h2 className="text-xl font-bold text-[#002D5E]">
                        Hello! 👋
                      </h2>

                      <p className="text-slate-500 mt-2">
                        Tell me what you need to send, move, store,
                        track or deliver. I'll help you find the right
                        logistics solution.
                      </p>

                      <div className="mt-5 text-sm text-slate-400">
                        Example:
                        <br />
                        <span className="text-slate-600">
                          "Mumbai ते Pune 20kg parcel पाठवायचा आहे"
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((item, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          item.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                            item.type === "user"
                              ? "bg-[#002D5E] text-white rounded-br-md"
                              : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"
                          }`}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">

                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything about your logistics..."
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />

                  <button
                    onClick={handleSend}
                    className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>

                </div>

                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  Apni Manzil AI • Smart Logistics Assistance
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LogisticsAI;