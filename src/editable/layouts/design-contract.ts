import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Zenjify system — a clean product-magazine look inspired by modern
  // self-hosted platform sites: airy white canvas, a deep-blue brand band
  // up top, and a warm red→orange→amber accent ramp for CTAs and highlights.
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#101a2c',
  '--slot4-panel-bg': '#f4f7fc',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#566076',
  '--slot4-soft-muted-text': '#8a93a6',
  '--slot4-accent': '#C00707',
  '--slot4-accent-fill': '#C00707',
  '--slot4-accent-soft': '#fdeae4',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#0c1626',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e9eef6',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f4f7fc',
  '--slot4-lavender': '#eef3fb',
  '--slot4-gray': '#f4f7fc',
  '--slot4-body-gradient': 'none',
  // Brand colour ramp (red → orange → amber) and the blue brand band.
  '--slot4-red': '#C00707',
  '--slot4-orange': '#FF4400',
  '--slot4-amber': '#FFB33F',
  '--slot4-blue': '#134E8E',
  '--slot4-blue-deep': '#0f3a6b',
  '--slot4-hot-grad': 'linear-gradient(90deg,#C00707 0%,#FF4400 55%,#FFB33F 100%)',
  '--slot4-nav-grad': 'linear-gradient(100deg,#0f3a6b 0%,#134E8E 50%,#1c63ad 100%)',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#101a2c',
  '--editable-container': '1400px',
  '--editable-border': '#e4e9f2',
  '--editable-nav-bg': '#134E8E',
  '--editable-nav-text': '#ffffff',
  '--editable-nav-active': '#FFB33F',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#C00707',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0c1626',
  '--editable-footer-text': '#ffffff',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_4px_18px_rgba(0,0,0,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[0_10px_24px_-10px_rgba(192,7,7,0.7)] transition duration-200 hover:brightness-105 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-blue)] hover:text-[var(--slot4-blue)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--slot4-hot-grad)] px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_24px_-10px_rgba(255,68,0,0.7)] transition duration-200 hover:brightness-105 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
