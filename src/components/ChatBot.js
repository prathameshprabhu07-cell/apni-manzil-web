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

  // Apni Manzil AI n8n Webhook
  const AI_WEBHOOK_URL =
    "https://coffee-euro-explorer-publish.trycloudeflare.com/webhook/apni-manzil-ai";

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
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
      // Send user message to n8n
      const response = await fetch(AI_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
        }),
      });

      const data = await response.json();

      console.log("Apni Manzil AI Response:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `AI server error: ${response.status}`
        );
      }

      const aiResponse = data?.reply;

      if (!aiResponse) {
        console.error(
          "Unexpected AI response:",
          JSON.stringify(data, null, 2)
        );

        throw new Error(
          "AI returned an empty response."
        );
      }

      setMessages([
        ...newMessages,
        {
          text: aiResponse,
          isBot: true,
        },
      ]);
    } catch (error) {
      console.error(
        "AI Error:",
        error?.message || error
      );

      setMessages([
        ...newMessages,
        {
          text:
            "Sorry 🙏 The AI service is currently unavailable. Please try again in a moment.",
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
                    color: m.isBot
                      ? "#333"
                      : "white",
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
              onChange={(e) =>
                setInput(e.target.value)
              }
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
                color: loading
                  ? "#ccc"
                  : "#004080",
                cursor: loading
                  ? "default"
                  : "pointer",
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