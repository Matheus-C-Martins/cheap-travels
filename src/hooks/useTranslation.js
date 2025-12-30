import { useState, useEffect } from 'react';
import { translations, getStoredLanguage, setStoredLanguage } from '../i18n/translations';

export function useTranslation() {
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t, language, changeLanguage };
}