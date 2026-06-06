import React, { createContext, useContext, useState } from 'react';
import * as EN from '../data/content';
import * as BG from '../data/contentBG';

type Language = 'en' | 'bg';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  content: typeof EN;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is the default language on every load as requested
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'bg' : 'en'));
  };

  // Select the appropriate content package
  const content = language === 'en' ? EN : (BG as unknown as typeof EN);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
