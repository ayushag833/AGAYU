import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import ha from '../locales/ha.json';
import bi from '../locales/bi.json';
import pb from '../locales/pb.json';
import ja from '../locales/ja.json';
import fr from '../locales/fr.json';
import ru from '../locales/ru.json';
import sp from '../locales/sp.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ha: { translation: ha },
      bi: { translation: bi },
      pb: { translation: pb },
      ja: { translation: ja },
      fr: { translation: fr },
      ru: { translation: ru },
      sp: { translation: sp },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;