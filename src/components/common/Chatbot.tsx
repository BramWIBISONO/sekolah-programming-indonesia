import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Minimize2, Send, Sparkles } from 'lucide-react';
import {
  CHATBOT_FALLBACK,
  CHATBOT_GREETING,
  SPI_KNOWLEDGE_BASE,
  UNKNOWN_RESPONSE,
  isChatbotGreeting,
} from '../../data/spiKnowledgeBase';
import { useLanguage } from '../../i18n';
import { ASSETS } from '../../constants/assets';
import { useHideOnScroll } from '../../utils/useHideOnScroll';

const localeLabel = (value: Record<'id' | 'en' | 'zh', string>, lang: 'id' | 'en' | 'zh') => value[lang] || value.id;

/** Electric Blue header with the tech grid and slow rays, the same language as the registration form. */
const HeaderTexture: React.FC = () => (
  <>
    <div
      className="absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
      style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      aria-hidden="true"
    />
    <div className="absolute -right-24 -top-24 w-56 h-56 [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
      <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.16) 0deg 6deg, transparent 6deg 20deg)' }} />
    </div>
  </>
);

export const Chatbot: React.FC = () => {
  const { lang, t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; isBot: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hideLauncher = useHideOnScroll();

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

  const headerTitle = 'SPI Assistant';
  const statusText =
    lang === 'en' ? 'Ask anything about SPI' : lang === 'zh' ? '随时了解SPI' : 'Tanya apa saja tentang SPI';
  const placeholderText =
    lang === 'en' ? 'Type your question...' : lang === 'zh' ? '请输入你的问题...' : 'Tulis pertanyaan Anda...';
  const poweredText = t('chat.powered');

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-50 bottom-0 right-0 sm:bottom-28 sm:right-6 w-full sm:w-[400px] h-[min(78vh,600px)] sm:h-[min(74vh,640px)] bg-white rounded-t-[28px] sm:rounded-[28px] border border-[#E3ECFA] shadow-[0_40px_90px_-30px_rgba(2,18,70,0.6)] flex flex-col overflow-hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* header */}
          <div className="relative overflow-hidden bg-[#1870FF] text-white px-5 py-4 shrink-0">
            <HeaderTexture />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-[0_10px_22px_-12px_rgba(2,18,70,0.8)]">
                  <img src={ASSETS.brand.pandaMascot} alt="" className="w-10 h-10 object-contain" loading="lazy" decoding="async" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-black text-base leading-tight">{headerTitle}</h3>
                  <p className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-blue-50/90">
                    <span className="relative flex w-2 h-2" aria-hidden="true">
                      <span className="absolute inset-0 rounded-full bg-[#7CF2C2] spi-anim-ping" />
                      <span className="relative w-2 h-2 rounded-full bg-[#7CF2C2]" />
                    </span>
                    <span className="truncate">{statusText}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 shrink-0 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={t('chat.close')}
              >
                <Minimize2 className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* conversation */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#F5F9FF]">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {msg.isBot && (
                  <span className="w-8 h-8 shrink-0 rounded-full bg-white border border-[#DCE7FB] flex items-center justify-center overflow-hidden">
                    <img src={ASSETS.brand.pandaMascot} alt="" className="w-6 h-6 object-contain" loading="lazy" decoding="async" />
                  </span>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.isBot
                      ? 'rounded-2xl rounded-bl-md bg-white border border-[#E3ECFA] text-slate-700 shadow-[0_8px_18px_-14px_rgba(4,26,90,0.55)]'
                      : 'rounded-2xl rounded-br-md bg-gradient-to-br from-[#1870FF] to-[#0F56D1] text-white shadow-[0_12px_22px_-14px_rgba(24,112,255,0.9)]'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2">
                <span className="w-8 h-8 shrink-0 rounded-full bg-white border border-[#DCE7FB] flex items-center justify-center overflow-hidden">
                  <img src={ASSETS.brand.pandaMascot} alt="" className="w-6 h-6 object-contain" loading="lazy" decoding="async" />
                </span>
                <div className="rounded-2xl rounded-bl-md bg-white border border-[#E3ECFA] px-4 py-3 flex items-center gap-1.5 shadow-[0_8px_18px_-14px_rgba(4,26,90,0.55)]" aria-hidden="true">
                  <span className="w-1.5 h-1.5 bg-[#1870FF]/70 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#1870FF]/70 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#1870FF]/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && !isTyping && (
            <div className="px-4 pt-3 pb-1 bg-[#F5F9FF] border-t border-[#E3ECFA]">
              <div className="flex overflow-x-auto gap-2 pb-3 hide-scrollbar">
                {suggestedQuestions[lang].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-3.5 py-2 bg-white border border-[#C9DAF7] rounded-full text-xs font-bold text-[#041A5A] hover:border-[#1870FF] hover:text-[#1870FF] transition-colors shrink-0 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* input */}
          <div className="p-3 bg-white border-t border-[#E3ECFA] shrink-0">
            <div className="flex items-center gap-2 rounded-2xl bg-[#F5F9FF] border border-[#DCE7FB] pl-4 pr-1.5 py-1.5 focus-within:border-[#1870FF] focus-within:ring-2 focus-within:ring-[#1870FF]/20 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderText}
                className="flex-1 min-w-0 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                disabled={isTyping}
                aria-label={placeholderText}
              />
              <button
                type="button"
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 shrink-0 rounded-xl bg-[#1870FF] text-white flex items-center justify-center hover:bg-[#1059D4] disabled:bg-slate-200 disabled:text-slate-400 transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                aria-label={t('chat.send')}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              {poweredText}
            </p>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`fixed z-50 right-4 sm:right-6 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-[90px] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#1870FF] to-[#0F56D1] ring-4 ring-white shadow-[0_18px_36px_-14px_rgba(24,112,255,0.9)] flex items-center justify-center text-white hover:scale-105 transition-[transform,opacity] duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/40 ${
            hideLauncher ? 'translate-y-36 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          }`}
          aria-label={t('chat.open')}
          title={t('chat.open')}
        >
          <span className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img src={ASSETS.brand.pandaMascot} alt="" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" loading="lazy" decoding="async" />
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#FFC928] text-[#041A5A] flex items-center justify-center shadow" aria-hidden="true">
            <Sparkles className="w-3 h-3" />
          </span>
        </button>
      )}
    </>
  );
};
