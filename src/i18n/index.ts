import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import it from './locales/it.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
  it: { translation: it },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English', shortName: 'EN', dir: 'ltr' },
  { code: 'fr', name: 'Français', shortName: 'FR', dir: 'ltr' },
  { code: 'es', name: 'Español', shortName: 'ES', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', shortName: 'DE', dir: 'ltr' },
  { code: 'it', name: 'Italiano', shortName: 'IT', dir: 'ltr' },
  { code: 'ar', name: 'العربية', shortName: 'AR', dir: 'rtl' },
] as const;

export type LanguageCode = typeof languages[number]['code'];
