import { useTranslation } from 'react-i18next'

const OPTIONS: { value: 'pt' | 'en'; label: string }[] = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' },
]

function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language.startsWith('pt') ? 'pt' : 'en'

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-full border-2 p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => i18n.changeLanguage(option.value)}
          aria-pressed={currentLanguage === option.value}
          data-cursor-invert={currentLanguage === option.value || undefined}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            currentLanguage === option.value
              ? 'bg-orange-500 text-white'
              : 'text-gray-500 hover:text-orange-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageToggle
