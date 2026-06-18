import React, { createContext, useContext, useEffect, useState } from 'react';
import * as EN from '../data/content';
import * as BG from '../data/contentBG';

type Language = 'en' | 'bg';

// Compile-time guard: EN and BG must export the same set of keys, so a forgotten
// translation fails `bun run build` instead of silently breaking at runtime.
type _AssertSameContentKeys =
  [keyof typeof EN] extends [keyof typeof BG]
    ? ([keyof typeof BG] extends [keyof typeof EN] ? true : never)
    : never;
const _contentKeysMatch: _AssertSameContentKeys = true;
void _contentKeysMatch;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  content: typeof EN;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language');
      if (saved === 'en' || saved === 'bg') return saved;
      if (navigator.language && navigator.language.startsWith('bg')) {
        return 'bg';
      }
    }
    return 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'bg' : 'en'));
  };

  // Save selected language to localStorage when changed
  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  // Select the appropriate content package
  const content = language === 'en' ? EN : (BG as unknown as typeof EN);

  // Keep <html lang> and the document title in sync with the active language —
  // matters for screen readers and search/social snippets.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.SITE_CONFIG.metaTitle;
  }, [language, content]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
