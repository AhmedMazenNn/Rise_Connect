const HEADER_OFFSET = 80;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = id === 'home' ? 0 : element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 1;
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
}