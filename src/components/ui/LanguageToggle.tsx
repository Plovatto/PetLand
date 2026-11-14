import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_PATHS, storeLanguage } from '@/lib/locale'
import type { Language } from '@/lib/locale'

const OPTIONS: { value: Language; label: string; locale: string }[] = [
  { value: 'pt', label: 'PT', locale: 'pt-BR' },
  { value: 'en', label: 'EN', locale: 'en' },
]

function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLanguage: Language = i18n.language.startsWith('pt') ? 'pt' : 'en'

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, language: Language) => {
    event.preventDefault()
    if (language === currentLanguage) return

    storeLanguage(language)
    window.location.assign(`${LANGUAGE_PATHS[language]}${window.location.hash}`)
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border-2 p-0.5"
    >
      {OPTIONS.map((option) => {
        const isCurrent = currentLanguage === option.value

        return (
          <a
            key={option.value}
            href={LANGUAGE_PATHS[option.value]}
            hrefLang={option.locale}
            lang={option.locale}
            onClick={(event) => handleClick(event, option.value)}
            aria-current={isCurrent || undefined}
            data-cursor-invert={isCurrent || undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
              isCurrent ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-orange-600'
            }`}
          >
            {option.label}
          </a>
        )
      })}
    </div>
  )
}

export default LanguageToggle
