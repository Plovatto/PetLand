import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { languageFromPath } from '@/lib/locale'
import en from '@/locales/en/translation.json'
import pt from '@/locales/pt/translation.json'

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: languageFromPath(window.location.pathname),
  fallbackLng: 'en',
  supportedLngs: ['pt', 'en'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
