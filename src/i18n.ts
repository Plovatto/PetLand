import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/translation.json'
import pt from '@/locales/pt/translation.json'

export const LANGUAGE_STORAGE_KEY = 'petland-language'

function syncHtmlLang(language: string) {
  document.documentElement.lang = language.startsWith('pt') ? 'pt-BR' : 'en'
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    fallbackLng: 'en',
    supportedLngs: ['pt', 'en'],
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => syncHtmlLang(i18n.language))

i18n.on('languageChanged', syncHtmlLang)

export default i18n
