import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your Apni Manzil Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  // साधे AI लॉजिक (नंतर आपण याला खऱ्या API शी जोडू शकतो)
  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes("courier")) return "We offer Domestic, International, and Express courier services. Which one do you need?";
    if (text.includes("track")) return "You can track your order using the Tracking ID on our home page.";
    if (text.includes("price") || text.includes("rate")) return "Rates depend on weight and distance. Please visit the specific service page for a quote.";
    if (text.includes("import")) return "We handle global trade, customs clearance, and licensing for Import-Export.";
    return "I'm still learning! You can call our support at +91 98765 43210 for more details.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([...newMessages, { text: getBotResponse(input), isBot: true }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: '#004080', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <MessageSquare size={30} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{ width: '320px', height: '450px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #eee' }}>
          {/* Header */}
          <div style={{ backgroundColor: '#004080', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} />
              <span style={{ fontWeight: 'bold' }}>AM Assistant</span>
            </div>
            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '10px', textAlign: m.isBot ? 'left' : 'right' }}>
                <div style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%', backgroundColor: m.isBot ? '#eee' : '#004080', color: m.isBot ? '#333' : 'white', fontSize: '0.9rem' }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '10px', display: 'flex', gap: '5px', borderTop: '1px solid #eee' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: '8px', fontSize: '0.9rem' }}
            />
            <button onClick={handleSend} style={{ background: 'none', border: 'none', color: '#004080', cursor: 'pointer' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;