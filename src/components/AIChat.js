import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

// .env madhun key uchnyasathi 'process.env' vaprtat
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Namaste! Mi Apni Manzil AI Assistant aahe. Logistics badal tumhala kay mahiti havi aahe?", isBot: true }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { text: input, isBot: false };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      // Gemini Model set karne
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", // Ha saryat fast model aahe
        systemInstruction: "Tu ek logistics expert aahe. Apni Manzil Services sathi kaam karto. Lokanna transport, courier ani tracking badal marathi bhashat madat kar."
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text: text, isBot: true }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { text: "Kshamasva, server madhe kahi tari prashna aahe.", isBot: true }]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="btn btn-primary rounded-circle shadow-lg p-3 border-0"
          style={{ width: '60px', height: '60px', backgroundColor: '#27ae60' }}>
          <FiMessageSquare size={24} />
        </button>
      ) : (
        <div className="card shadow-lg border-0 rounded-4" style={{ width: '320px', height: '450px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center rounded-top-4">
            <span className="fw-bold">Apni Manzil AI Chat</span>
            <FiX onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
          </div>
          <div className="card-body overflow-auto p-3 bg-light" style={{ flex: 1 }}>
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 p-2 rounded-3 ${m.isBot ? 'bg-white shadow-sm' : 'bg-success text-white ms-auto'}`} 
                   style={{ maxWidth: '85%', width: 'fit-content' }}>
                <p className="mb-0 small">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="card-footer bg-white border-0 p-2 d-flex">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="form-control form-control-sm border-light bg-light rounded-pill px-3" 
              placeholder="Ask me anything..." 
            />
            <button onClick={handleSend} className="btn btn-sm btn-success rounded-circle ms-2 shadow-sm"><FiSend /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;