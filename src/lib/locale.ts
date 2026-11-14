export type Language = 'pt' | 'en'

export const LANGUAGE_STORAGE_KEY = 'petland-language'

export const LANGUAGE_PATHS: Record<Language, string> = {
  pt: '/',
  en: '/en/',
}

const CRAWLER_PATTERN = /bot|crawl|spider|slurp|lighthouse|facebookexternalhit|whatsapp|preview/i

type RedirectContext = {
  pathname: string
  storedLanguage: string | null
  systemLanguage: string
  userAgent: string
}

export function languageFromPath(pathname: string): Language {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'pt'
}

export function preferredLanguage(storedLanguage: string | null, systemLanguage: string): Language {
  if (storedLanguage === 'pt' || storedLanguage === 'en') return storedLanguage
  return systemLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function resolveLanguageRedirect({
  pathname,
  storedLanguage,
  systemLanguage,
  userAgent,
}: RedirectContext): string | null {
  if (CRAWLER_PATTERN.test(userAgent)) return null
  if (languageFromPath(pathname) !== 'pt') return null

  const language = preferredLanguage(storedLanguage, systemLanguage)
  return language === 'pt' ? null : LANGUAGE_PATHS[language]
}

export function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeLanguage(language: Language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    return
  }
}
