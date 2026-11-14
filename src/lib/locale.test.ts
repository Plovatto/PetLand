import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import {
  LANGUAGE_PATHS,
  languageFromPath,
  preferredLanguage,
  resolveLanguageRedirect,
} from './locale'

const BROWSER = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0 Safari/537.36'
const GOOGLEBOT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

describe('languageFromPath', () => {
  it('maps each language path back to its language', () => {
    expect(languageFromPath(LANGUAGE_PATHS.pt)).toBe('pt')
    expect(languageFromPath(LANGUAGE_PATHS.en)).toBe('en')
    expect(languageFromPath('/en')).toBe('en')
  })

  it('treats paths that only start with "en" as Portuguese', () => {
    expect(languageFromPath('/entrar')).toBe('pt')
  })
})

describe('preferredLanguage', () => {
  it('prefers the stored language over the system language', () => {
    expect(preferredLanguage('pt', 'en-US')).toBe('pt')
    expect(preferredLanguage('en', 'pt-BR')).toBe('en')
  })

  it('falls back to the system language', () => {
    expect(preferredLanguage(null, 'pt-BR')).toBe('pt')
    expect(preferredLanguage(null, 'PT')).toBe('pt')
    expect(preferredLanguage(null, 'es-ES')).toBe('en')
    expect(preferredLanguage('invalid', 'en-US')).toBe('en')
  })
})

describe('resolveLanguageRedirect', () => {
  it('sends English visitors from the root to the English path', () => {
    expect(
      resolveLanguageRedirect({
        pathname: '/',
        storedLanguage: null,
        systemLanguage: 'en-US',
        userAgent: BROWSER,
      }),
    ).toBe('/en/')
  })

  it('keeps Portuguese visitors on the root', () => {
    expect(
      resolveLanguageRedirect({
        pathname: '/',
        storedLanguage: null,
        systemLanguage: 'pt-BR',
        userAgent: BROWSER,
      }),
    ).toBeNull()
  })

  it('respects a stored choice over the system language', () => {
    expect(
      resolveLanguageRedirect({
        pathname: '/',
        storedLanguage: 'pt',
        systemLanguage: 'en-US',
        userAgent: BROWSER,
      }),
    ).toBeNull()
  })

  it('never redirects crawlers', () => {
    expect(
      resolveLanguageRedirect({
        pathname: '/',
        storedLanguage: null,
        systemLanguage: 'en-US',
        userAgent: GOOGLEBOT,
      }),
    ).toBeNull()
  })

  it('never redirects away from the English path', () => {
    fc.assert(
      fc.property(fc.constantFrom(null, 'pt', 'en'), fc.string(), (storedLanguage, language) => {
        expect(
          resolveLanguageRedirect({
            pathname: '/en/',
            storedLanguage,
            systemLanguage: language,
            userAgent: BROWSER,
          }),
        ).toBeNull()
      }),
    )
  })
})
