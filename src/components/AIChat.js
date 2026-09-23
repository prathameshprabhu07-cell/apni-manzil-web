import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

const genAI = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY,
});

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Namaste! Mi Apni Manzil AI Assistant aahe. Logistics badal tumhala kay mahiti havi aahe?",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages((prev) => [
      ...prev,
      { text: userText, isBot: false },
    ]);

    setInput("");

    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userText,
        config: {
          systemInstruction:
            "Tu Apni Manzil cha professional logistics AI assistant aahe. Courier, parcel delivery, hyperlocal delivery, truck transport, packers and movers, warehouse, international logistics, e-commerce logistics ani shipment tracking yabadal users la Marathi/Hinglish madhye simple ani accurate mahiti de. Apni Manzil hi logistics aggregator/marketplace aahe.",
        },
      });

      const text = result.text;

      setMessages((prev) => [
        ...prev,
        {
          text:
            text ||
            "Sorry, mala sadhya response generate karta ala nahi.",
          isBot: true,
        },
      ]);
    } catch (error) {
      console.error("Gemini AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text:
            "Kshamasva 🙏 AI service la sadhya connect karta yet nahi. Thodya velane punha try kara.",
          isBot: true,
        },
      ]);
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
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary rounded-circle shadow-lg p-3 border-0"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#27ae60",
          }}
        >
          <FiMessageSquare size={24} />
        </button>
      ) : (
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{
            width: "320px",
            height: "450px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center rounded-top-4">
            <span className="fw-bold">
              Apni Manzil AI Chat
            </span>

            <FiX
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div
            className="card-body overflow-auto p-3 bg-light"
            style={{ flex: 1 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-3 p-2 rounded-3 ${
                  m.isBot
                    ? "bg-white shadow-sm"
                    : "bg-success text-white ms-auto"
                }`}
                style={{
                  maxWidth: "85%",
                  width: "fit-content",
                }}
              >
                <p className="mb-0 small">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="card-footer bg-white border-0 p-2 d-flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              className="form-control form-control-sm border-light bg-light rounded-pill px-3"
              placeholder="Ask me anything..."
            />

            <button
              onClick={handleSend}
              className="btn btn-sm btn-success rounded-circle ms-2 shadow-sm"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;