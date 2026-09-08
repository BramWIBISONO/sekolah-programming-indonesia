import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Sparkles, Send, Minimize2 } from 'lucide-react';
import {
  CHATBOT_FALLBACK,
  CHATBOT_GREETING,
  SPI_KNOWLEDGE_BASE,
  UNKNOWN_RESPONSE,
  isChatbotGreeting,
} from '../../data/spiKnowledgeBase';
import { useLanguage } from '../../i18n';
import { ASSETS } from '../../constants/assets';

const localeLabel = (value: Record<'id' | 'en' | 'zh', string>, lang: 'id' | 'en' | 'zh') => value[lang] || value.id;

export const Chatbot: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; isBot: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions: Record<'id' | 'en' | 'zh', string[]> = {
    id: [
      'Program SPI untuk usia anak saya apa?',
      'Apa itu SPI Core?',
      'Bagaimana cara ikut Free Trial?',
      'Apa saja kelas yang tersedia?',
      'Bagaimana cara daftar kelas?',
      'Apa saja program SPI?',
    ],
    en: [
      'What SPI programs fit my child?',
      'What is SPI Core?',
      'How do I join a free trial?',
      'What classes are available?',
      'How do I register?',
      'What programs does SPI offer?',
    ],
    zh: [
      'SPI有哪些适合孩子的课程？',
      '什么是SPI Core？',
      '如何参加免费试听？',
      '有哪些课程？',
      '如何报名？',
      'SPI有哪些项目？',
    ],
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          text: localeLabel(CHATBOT_GREETING, lang),
          isBot: true,
        },
      ]);
    }
  }, [lang, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const findBestResponse = (query: string) => {
    const normalized = query.trim();
    if (!normalized) return localeLabel(CHATBOT_FALLBACK, lang);

    if (isChatbotGreeting(normalized)) {
      return localeLabel(CHATBOT_GREETING, lang);
    }

    const lowerQuery = normalized.toLowerCase();
    let bestMatch = null;
    let maxMatchCount = 0;

    for (const item of SPI_KNOWLEDGE_BASE) {
      let matchCount = 0;
      for (const keyword of item.keywords) {
        if (keyword && lowerQuery.includes(keyword.toLowerCase())) {
          matchCount += 1;
        }
      }
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = item;
      }
    }

    if (bestMatch) {
      return localeLabel(bestMatch.response, lang);
    }

    return localeLabel(UNKNOWN_RESPONSE ?? CHATBOT_FALLBACK, lang);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg = { id: Date.now().toString(), text, isBot: false };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = findBestResponse(text);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const headerTitle = lang === 'en' ? 'SPI Assistant' : lang === 'zh' ? 'SPI 助手' : 'SPI Assistant';
  const statusText =
    lang === 'en' ? 'Ask anything about SPI' : lang === 'zh' ? '随时了解SPI' : 'Tanya apa saja tentang SPI';
  const placeholderText =
    lang === 'en' ? 'Type your question...' : lang === 'zh' ? '请输入你的问题...' : 'Tulis pertanyaan Anda...';
  const poweredText = lang === 'en' ? 'AI powered' : lang === 'zh' ? 'AI 驱动' : 'Ditenagai oleh AI';

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-50 bottom-24 right-4 md:right-6 md:bottom-28 w-[calc(100vw-32px)] md:w-[400px] h-[min(70vh,650px)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-[#DCE8F7] dark:border-slate-700 flex flex-col overflow-hidden"
          style={{ boxShadow: '0 20px 40px -10px rgba(11, 60, 149, 0.15), 0 0 20px rgba(23, 109, 248, 0.05)' }}
        >
          <div className="bg-gradient-to-r from-[#176DF8] to-[#1059D4] p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 overflow-hidden flex items-center justify-center">
                <img
                  src={ASSETS.brand.pandaMascot}
                  alt="SPI mascot"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{headerTitle}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[11px] text-blue-100 font-medium">{statusText}</p>
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

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/60">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.isBot
                      ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-100 rounded-tl-sm'
                      : 'bg-[#176DF8] text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 text-slate-500 dark:text-slate-300 flex items-center gap-1.5 w-fit">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 bg-slate-50/50 dark:bg-slate-950/60">
              <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                {suggestedQuestions[lang].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-full text-xs font-semibold text-[#176DF8] hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-slate-100 bg-white dark:bg-slate-900 shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderText}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176DF8]/30 focus:border-[#176DF8] transition-all"
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
                {poweredText}
              </p>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-50 bottom-[90px] right-4 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-[#176DF8] rounded-full border-2 border-white flex flex-col items-center justify-center text-white hover:bg-[#1059D4] hover:scale-105 transition-all cursor-pointer group shadow-[0_8px_30px_rgb(23,109,248,0.4)]"
          aria-label="Tanya SPI Assistant"
          title="Tanya SPI Assistant"
        >
          <div className="relative">
            <img
              src={ASSETS.brand.pandaMascot}
              alt="SPI mascot"
              className="w-7 h-7 md:w-8 md:h-8 object-contain"
            />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-2 animate-pulse" />
          </div>
        </button>
      )}
    </>
  );
};
