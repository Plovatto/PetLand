import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { NAV_LINKS } from '@/constants/navigation'
import en from './en/translation.json'
import pt from './pt/translation.json'

type Translations = { [key: string]: string | Translations }

function flatten(translations: Translations, prefix = ''): Map<string, string> {
  const entries = Object.entries(translations).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [[`${prefix}${key}`, value] as const]
      : [...flatten(value, `${prefix}${key}.`)],
  )
  return new Map(entries)
}

function placeholders(text: string) {
  return (text.match(/\{\{\s*\w+\s*\}\}/g) ?? []).map((match) => match.replace(/\s/g, '')).sort()
}

const ptKeys = flatten(pt)
const enKeys = flatten(en)

describe('translations', () => {
  it('have the same keys in Portuguese and English', () => {
    expect([...enKeys.keys()].sort()).toEqual([...ptKeys.keys()].sort())
  })

  it('have a translation for every navigation link', () => {
    for (const link of NAV_LINKS) {
      expect(ptKeys.has(`nav.${link.key}`)).toBe(true)
      expect(enKeys.has(`nav.${link.key}`)).toBe(true)
    }
  })

  it('never have empty texts and keep the same placeholders in both languages', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ptKeys.keys()), (key) => {
        const ptText = ptKeys.get(key) ?? ''
        const enText = enKeys.get(key) ?? ''

        expect(ptText.trim()).not.toBe('')
        expect(enText.trim()).not.toBe('')
        expect(placeholders(enText)).toEqual(placeholders(ptText))
      }),
      { numRuns: ptKeys.size * 4 },
    )
  })
})
