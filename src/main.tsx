import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { readStoredLanguage, resolveLanguageRedirect } from './lib/locale.ts'
import './i18n.ts'
import './styles/index.css'

const redirectPath = resolveLanguageRedirect({
  pathname: window.location.pathname,
  storedLanguage: readStoredLanguage(),
  systemLanguage: navigator.language,
  userAgent: navigator.userAgent,
})

if (redirectPath) {
  window.location.replace(`${redirectPath}${window.location.search}${window.location.hash}`)
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
