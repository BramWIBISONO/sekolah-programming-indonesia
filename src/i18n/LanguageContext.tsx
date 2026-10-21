import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { idTranslations } from './translations/id';
import { enTranslations } from './translations/en';
import { zhTranslations } from './translations/zh';
import { sectionTranslations, type TriText } from './translations/sections';
import { faqTranslations } from './translations/faq';
import { pageTranslations } from './translations/pages';
import { msTranslations } from './translations/ms';

/** Trilingual sources (id/en/zh side by side), merged over the per-language dictionaries. */
const TRI_SOURCES: Record<string, TriText>[] = [sectionTranslations, faqTranslations, pageTranslations];

export type Language = 'id' | 'en' | 'zh' | 'ms';

type TranslationDict = Record<string, string>;

const buildDict = (base: TranslationDict, lang: Language): TranslationDict => {
  // Malay has no entries in the trilingual sources yet, so it takes the Indonesian text for them.
  const source: 'id' | 'en' | 'zh' = lang === 'ms' ? 'id' : lang;
  const merged: TranslationDict = { ...base };
  for (const tri of TRI_SOURCES) {
    for (const [key, entry] of Object.entries(tri)) {
      merged[key] = entry[source];
    }
  }
  return merged;
};

const TRANSLATIONS: Record<Language, TranslationDict> = {
  id: buildDict(idTranslations, 'id'),
  en: buildDict(enTranslations, 'en'),
  zh: buildDict(zhTranslations, 'zh'),
  // Malay overrides go last so they win over the Indonesian text
  ms: { ...buildDict(idTranslations, 'ms'), ...msTranslations },
};

/** Value for <html lang>, which needs the full locale for Simplified Chinese. */
const HTML_LANG: Record<Language, string> = { id: 'id', en: 'en', zh: 'zh-CN', ms: 'ms' };

const warnedKeys = new Set<string>();
const warnMissing = (lang: Language, key: string) => {
  if (!import.meta.env.DEV) return;
  const id = `${lang}:${key}`;
  if (warnedKeys.has(id)) return;
  warnedKeys.add(id);
  console.warn(`[i18n] Missing "${lang}" translation for key "${key}"`);
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
      if (stored === 'id' || stored === 'en' || stored === 'zh' || stored === 'ms') return stored;
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
    const value = TRANSLATIONS[lang][key];
    if (value !== undefined) return value;
    warnMissing(lang, key);
    return TRANSLATIONS['id'][key] ?? key;
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
