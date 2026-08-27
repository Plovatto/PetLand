import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '@/assets/logo.svg'
import { NAV_LINKS } from '@/constants/navigation'
import { useIsLoading } from '@/context/LoadingContext'
import { useTransition } from '@/context/TransitionContext'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTION_IDS = NAV_LINKS.map((link) => link.href)

function Header() {
  const isLoading = useIsLoading()
  const { isTransitioning, startTransition } = useTransition()
  const activeLink = useActiveSection(SECTION_IDS)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setIsMobileMenuOpen(false)
    startTransition(href)
  }

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
          >
            <motion.div
              initial={{ scaleY: 0, opacity: 0.8 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 origin-top bg-linear-to-b from-orange-500/30 via-orange-400/20 to-transparent backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-full bg-linear-to-r from-transparent via-orange-500/40 to-transparent"
            />

            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: `${(i % 5) * 25}%`, y: '100%', scale: 0, opacity: 0 }}
                animate={{ y: ['100%', '50%', '-20%'], scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
                className="absolute h-3 w-3 rounded-full bg-orange-400 shadow-lg shadow-orange-500/50"
                style={{ left: `${(i * 5) % 100}%` }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{
                  rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' },
                }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500"
              >
                <img src={logo} alt="Logo" className="h-12 w-12" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isLoading ? -100 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-[9990] border-b border-orange-100 bg-white/90 shadow-lg backdrop-blur-lg"
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                <img src={logo} alt="PetLand Logo" className="h-6 w-6" />
              </div>
              <span className="bg-linear-to-r from-orange-500 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
                PetLand
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="p-2 text-gray-700 transition hover:text-orange-600 md:hidden"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <ul className="hidden space-x-8 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`font-medium transition ${
                      activeLink === link.href
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-2 overflow-hidden md:hidden"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      className={`block rounded-lg px-4 py-2 transition ${
                        activeLink === link.href
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  )
}

export default Header
