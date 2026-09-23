import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I am your Apni Manzil Assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Gemini API key from .env
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  // Temporary check - API key itself is NEVER printed
  console.log(
    "Gemini key loaded:",
    GEMINI_API_KEY ? "YES" : "NO"
  );

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const newMessages = [
      ...messages,
      {
        text: userText,
        isBot: false,
      },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // API key check
      if (!GEMINI_API_KEY) {
        throw new Error(
          "Gemini API key not found. Please check REACT_APP_GEMINI_API_KEY in .env"
        );
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: `
You are the official AI Assistant of Apni Manzil.

Apni Manzil is an India-focused logistics aggregator and marketplace.

Help users with:
- Courier and parcel delivery
- Hyperlocal / bike delivery
- Truck and transport booking
- Packers and movers
- Warehouse and storage
- International logistics
- E-commerce logistics
- Shipment tracking
- General logistics questions

Answer in simple Marathi, Hinglish, or English depending on the user's language.

Be professional, helpful, concise and accurate.

Do not invent prices, partner names, tracking numbers, booking details or service availability.

If the user asks for a specific booking, shipment or tracking status and you do not have access to that information, clearly say that the user needs to provide the relevant tracking/booking information.
                  `,
                },
              ],
            },

            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: userText,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // Gemini API error details
      if (!response.ok) {
        console.error("Gemini API Error Response:", data);

        throw new Error(
          data?.error?.message ||
            `Gemini API Error: ${response.status} ${response.statusText}`
        );
      }

      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.error("Unexpected Gemini response:", data);
        throw new Error("Gemini returned an empty response.");
      }

      setMessages([
        ...newMessages,
        {
          text: aiResponse,
          isBot: true,
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);

      setMessages([
        ...newMessages,
        {
          text:
            "Kshamasva 🙏 AI service la sadhya connect karta yet nahi. Thodya velane punha try kara.",
          isBot: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: "#004080",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MessageSquare size={30} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: "320px",
            height: "450px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#004080",
              color: "white",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Bot size={20} />
              <span style={{ fontWeight: "bold" }}>
                AM AI Assistant
              </span>
            </div>

            <X
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.isBot
                    ? "flex-start"
                    : "flex-end",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius: "15px",
                    backgroundColor: m.isBot
                      ? "#eee"
                      : "#004080",
                    color: m.isBot ? "#333" : "white",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "10px",
              display: "flex",
              gap: "5px",
              borderTop: "1px solid #eee",
              backgroundColor: "white",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "8px",
                fontSize: "0.9rem",
              }}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                background: "none",
                border: "none",
                color: loading ? "#ccc" : "#004080",
                cursor: loading ? "default" : "pointer",
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;