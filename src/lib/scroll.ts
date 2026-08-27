const HEADER_OFFSET = 80

export function scrollToSection(sectionId: string) {
  const element = document.querySelector(sectionId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  window.scrollTo({
    top: elementPosition - HEADER_OFFSET,
    behavior: 'smooth',
  })
}
