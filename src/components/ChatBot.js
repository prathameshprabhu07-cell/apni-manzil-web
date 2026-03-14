import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your Apni Manzil Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // --- १. तुझी Gemini API Key इथे टाक ---
  const GEMINI_API_KEY = AIzaSyAhM1kY4iEBZwGO7dfmIN0JYuUQ9vhQwNg;

  // ऑटो स्क्रोल खाली जाण्यासाठी
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input.trim();
    const newMessages = [...messages, { text: userText, isBot: false }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // --- २. Gemini API ला कॉल ---
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are a helpful logistics assistant for 'Apni Manzil'. Keep answers short. Query: ${userText}` }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      setMessages([...newMessages, { text: aiResponse, isBot: true }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Sorry, I'm having trouble connecting. Check your API key!", isBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: '#004080', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <MessageSquare size={30} />
        </button>
      )}

      {isOpen && (
        <div style={{ width: '320px', height: '450px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ backgroundColor: '#004080', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} />
              <span style={{ fontWeight: 'bold' }}>AM AI Assistant</span>
            </div>
            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
          </div>

          <div ref={scrollRef} style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '10px', textAlign: m.isBot ? 'left' : 'right' }}>
                <div style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%', backgroundColor: m.isBot ? '#eee' : '#004080', color: m.isBot ? '#333' : 'white', fontSize: '0.9rem' }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div style={{ fontSize: '0.8rem', color: '#888' }}>Thinking...</div>}
          </div>

          <div style={{ padding: '10px', display: 'flex', gap: '5px', borderTop: '1px solid #eee' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: '8px', fontSize: '0.9rem' }}
            />
            <button onClick={handleSend} disabled={loading} style={{ background: 'none', border: 'none', color: '#004080', cursor: loading ? '#ccc' : 'pointer' }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;