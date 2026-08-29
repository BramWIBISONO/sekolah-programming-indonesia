import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { idTranslations } from './translations/id';
import { enTranslations } from './translations/en';
import { zhTranslations } from './translations/zh';

export type Language = 'id' | 'en' | 'zh';

type TranslationDict = Record<string, string>;

const TRANSLATIONS: Record<Language, TranslationDict> = {
  id: idTranslations,
  en: enTranslations,
  zh: zhTranslations,
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (key: string) => key,
});

const STORAGE_KEY = 'spi-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'id' || stored === 'en' || stored === 'zh') return stored;
    } catch {}
    return 'id';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
  }, []);

  const t = useCallback((key: string): string => {
    const dict = TRANSLATIONS[lang];
    return dict[key] ?? TRANSLATIONS['id'][key] ?? key;
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
