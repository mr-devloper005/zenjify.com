import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

// Featured / image-first hero card — large media with overlaid title.
export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-3xl bg-[var(--slot4-dark-bg)] shadow-[0_30px_60px_-30px_rgba(12,22,38,0.6)] transition duration-300 hover:-translate-y-1">
      <div className="relative min-h-[460px] p-6 sm:p-9 lg:min-h-[560px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,22,38,0.1),rgba(12,22,38,0.9))]" />
        <div className="relative z-10 flex h-full min-h-[400px] flex-col justify-end lg:min-h-[500px]">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[image:var(--slot4-hot-grad)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">{label}</span>
          <h3 className="editable-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition group-hover:gap-3">
            Explore <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// Compact rail card — portrait media, sits in a horizontal scroller.
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-26px_rgba(16,26,44,0.55)] sm:w-[260px]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-dark-bg)]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

// Editorial/list style — numbered index row, no media.
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_18px_40px_-24px_rgba(16,26,44,0.5)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--slot4-hot-grad)] text-sm font-extrabold text-white">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-blue)]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

// Horizontal card — media beside copy, full-width row.
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-0 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_50px_-28px_rgba(16,26,44,0.55)] sm:grid-cols-[240px_minmax(0,1fr)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[200px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-5 sm:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)} · No. {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editable-display mt-3 line-clamp-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)] sm:text-3xl">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-blue)]">Open post <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  )
}
