export type NavLink = {
  href: string
  key: 'home' | 'services' | 'about' | 'contact'
}

export const NAV_LINKS: NavLink[] = [
  { href: '#home', key: 'home' },
  { href: '#servicos', key: 'services' },
  { href: '#sobre', key: 'about' },
  { href: '#contact', key: 'contact' },
]
