import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Send, Minimize2, ChevronDown } from 'lucide-react';
import { SPI_KNOWLEDGE_BASE, UNKNOWN_RESPONSE } from '../../data/spiKnowledgeBase';
import { useLanguage } from '../../i18n';

export const Chatbot: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; isBot: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Program SPI untuk usia anak saya apa?',
    'Apa itu SPI Core?',
    'Bagaimana cara ikut Free Trial?',
    'Apa saja kelas yang tersedia?',
    'Bagaimana cara daftar kelas?',
    'Apa saja program SPI?'
  ];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          text: 'Halo! 👋 Saya SPI Assistant. Saya siap membantu menjawab pertanyaan tentang program, kelas, trial, pendaftaran, partnership, dan informasi SPI lainnya.',
          isBot: true
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const findBestResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Simple keyword matching for demo purposes
    // In production, this would call a real LLM backend endpoint (e.g. /api/chat)
    let bestMatch = null;
    let maxMatchCount = 0;

    for (const item of SPI_KNOWLEDGE_BASE) {
      let matchCount = 0;
      for (const keyword of item.keywords) {
        if (lowerQuery.includes(keyword)) {
          matchCount++;
        }
      }
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = item;
      }
    }

    if (bestMatch) {
      return bestMatch.response;
    }
    
    return UNKNOWN_RESPONSE;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now().toString(), text, isBot: false };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate API delay and bot typing
    setTimeout(() => {
      const botResponse = findBestResponse(text);
      setMessages(prev => [
        ...prev, 
        { id: (Date.now() + 1).toString(), text: botResponse, isBot: true }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Expanded Chat Window */}
      {isOpen && (
        <div 
          className="fixed z-50 bottom-24 right-4 md:right-6 md:bottom-28 w-[calc(100vw-32px)] md:w-[400px] h-[min(70vh,650px)] bg-white rounded-2xl shadow-2xl border border-[#DCE8F7] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{ boxShadow: '0 20px 40px -10px rgba(11, 60, 149, 0.15), 0 0 20px rgba(23, 109, 248, 0.05)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#176DF8] to-[#1059D4] p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">SPI Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[11px] text-blue-100 font-medium">Tanya apa saja tentang SPI</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-white border border-slate-100 shadow-sm text-slate-700 rounded-tl-sm' 
                      : 'bg-[#176DF8] text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 text-slate-500 flex items-center gap-1.5 w-fit">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (only show if no user messages yet) */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 bg-slate-50/50">
              <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white border border-blue-100 rounded-full text-xs font-semibold text-[#176DF8] hover:bg-blue-50 transition-colors shrink-0 shadow-sm cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-slate-100 bg-white shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tulis pertanyaan Anda..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#176DF8]/30 focus:border-[#176DF8] transition-all"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-[#176DF8] text-white rounded-lg disabled:opacity-50 disabled:bg-slate-300 hover:bg-[#1059D4] transition-colors cursor-pointer"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Ditenagai oleh AI
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button - Positioned above WhatsApp button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 bottom-[90px] right-4 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-[#176DF8] rounded-full border-2 border-white flex flex-col items-center justify-center text-white hover:bg-[#1059D4] hover:scale-105 transition-all cursor-pointer group shadow-[0_8px_30px_rgb(23,109,248,0.4)]"
          aria-label="Tanya SPI Assistant"
          title="Tanya SPI Assistant"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-2 animate-pulse" />
          </div>
        </button>
      )}
    </>
  );
};
