'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ChevronRight, ShieldCheck, Star, Zap } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

/*
  Zenjify navbar — a deep-blue brand band (gradient) carrying the logo, primary
  task links and account actions, with a clean white search row beneath it.
  Mirrors a modern platform-landing header while keeping every existing route,
  search action and auth state intact.
*/
export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50">
      {/* Brand band */}
      <div className="bg-[image:var(--slot4-nav-grad)] text-[var(--editable-nav-text)]">
        <nav className="mx-auto flex min-h-[70px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 ring-1 ring-white/25 transition group-hover:bg-white/20">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
            </span>
            <span className="min-w-0">
              <span className="editable-display block max-w-[220px] truncate text-[1.35rem] font-bold leading-none tracking-[-0.02em]">
                {SITE_CONFIG.name}
              </span>
              <span className="mt-1 hidden max-w-[220px] truncate text-[10px] font-medium uppercase tracking-[0.24em] text-white/65 sm:block">
                {globalContent.nav?.tagline || SITE_CONFIG.tagline}
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden items-center gap-1 lg:flex">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {session ? (
              <>
                <Link
                  href="/create"
                  className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-sm font-semibold text-[var(--editable-cta-text)] shadow-[0_8px_20px_-10px_rgba(192,7,7,0.8)] transition hover:brightness-105 sm:inline-flex"
                >
                  <PlusCircle className="h-4 w-4" /> Create
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-white/80 transition hover:text-white sm:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:text-white sm:inline-flex"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-sm font-semibold text-[var(--editable-cta-text)] shadow-[0_8px_20px_-10px_rgba(192,7,7,0.8)] transition hover:brightness-105 sm:inline-flex"
                >
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded-lg bg-white/12 p-2 text-white ring-1 ring-white/20 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Search row */}
      <div className="relative border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/95 backdrop-blur-md">
        {/* subtle accent hairline so the white row reads as intentional */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--slot4-amber)_30%,var(--slot4-orange)_50%,var(--slot4-red)_70%,transparent)] opacity-50" />
        <div className="mx-auto hidden w-full max-w-[var(--editable-container)] items-center gap-6 px-4 py-3 sm:px-6 md:flex lg:px-8">
          <form action="/search" className="group flex w-full max-w-2xl items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] py-1.5 pl-4 pr-1.5 transition focus-within:border-[var(--slot4-blue)] focus-within:bg-[var(--slot4-surface-bg)] focus-within:ring-2 focus-within:ring-[var(--slot4-blue)]/15">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-blue)]" />
            <input
              name="q"
              type="search"
              placeholder="Search businesses, photos and posts…"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[image:var(--slot4-hot-grad)] px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-105"
            >
              <Search className="h-3.5 w-3.5" /> Search
            </button>
          </form>

          {/* Decorative trust highlights — balance the row, no links */}
          <div className="ml-auto hidden items-center gap-5 text-xs font-semibold text-[var(--slot4-muted-text)] lg:flex">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[var(--slot4-blue)]" /> Verified posts</span>
            <span className="h-4 w-px bg-[var(--editable-border)]" />
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-[var(--slot4-amber)]" /> Top rated</span>
            <span className="h-4 w-px bg-[var(--editable-border)]" />
            <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4 text-[var(--slot4-orange)]" /> Updated daily</span>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-b border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-blue)]" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
