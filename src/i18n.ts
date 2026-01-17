import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Sanmu AI",
      "thinking": "Master is thinking...",
      "share": "Share Masterpiece"
    }
  },
  zh: {
    translation: {
      "welcome": "欢迎来到 Sanmu AI",
      "thinking": "大师思考中...",
      "share": "分享大师之作"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh", // Default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
