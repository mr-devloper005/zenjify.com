'use client'

import Link from 'next/link'
import { Mail, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

/*
  Zenjify footer — a warm newsletter band sitting above a deep-navy footer with
  brand block, explore links and site links. All task routes resolve from
  SITE_CONFIG so enabled sections stay in sync automatically.
*/
export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-auto">
      {/* Newsletter band */}
      <section className="bg-[var(--slot4-panel-bg)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--slot4-hot-grad)] text-white shadow-[0_12px_30px_-12px_rgba(255,68,0,0.8)]">
            <Mail className="h-5 w-5" />
          </span>
          <h2 className="editable-display max-w-2xl text-3xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
            Stay in the loop with {SITE_CONFIG.name}
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-[var(--slot4-muted-text)]">
            Get a periodic email with the newest listings, standout photos and fresh finds from across the platform.
          </p>
          <form action="/contact" className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-2.5 focus-within:border-[var(--slot4-blue)]">
              <Mail className="h-4 w-4 shrink-0 text-[var(--slot4-soft-muted-text)]" />
              <input
                name="email"
                type="email"
                placeholder="you@email.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] shadow-[0_10px_24px_-12px_rgba(192,7,7,0.8)] transition hover:brightness-105">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Dark footer */}
      <div className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
        <div className="h-1 w-full bg-[image:var(--slot4-hot-grad)]" />
        <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
              </span>
              <span className="editable-display text-xl font-bold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              {globalContent.footer?.description || SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['#C00707', '#FF4400', '#FFB33F', '#134E8E'].map((color) => (
                <span key={color} className="h-2.5 w-8 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-amber)]">Company</h3>
            <div className="mt-5 grid gap-3">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-white/65 transition hover:text-white">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-amber)]">Account</h3>
            <div className="mt-5 grid gap-3">
              {(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]).map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-white/65 transition hover:text-white">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/65 transition hover:text-white">Logout</button> : null}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-2 px-4 py-5 text-xs font-medium text-white/50 sm:flex-row sm:px-6 lg:px-8">
            <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
            <span>{globalContent.footer?.bottomNote || 'Built for clean discovery and connected publishing.'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
