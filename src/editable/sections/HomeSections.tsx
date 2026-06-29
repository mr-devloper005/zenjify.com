import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Camera, ChevronRight, Compass, Layers, MapPin, Search, Sparkles, Star, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.9 + (h % 11) / 10) * 10) / 10 // 3.9 – 4.9
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-3.5 w-3.5' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-amber)] text-[var(--slot4-amber)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} />
      <span className="text-sm font-bold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-xs text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ------------------------------- Hero ---------------------------------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`

  return (
    <section className="relative isolate overflow-hidden bg-[var(--slot4-dark-bg)]">
      {/* Image collage backdrop */}
      <div className="absolute inset-0">
        <EditableHeroCollage images={heroImages} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,22,38,0.94)_0%,rgba(15,58,107,0.82)_45%,rgba(19,78,142,0.55)_100%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[var(--slot4-orange)]/30 blur-3xl" />

      <div className={`relative ${container} flex min-h-[460px] flex-col justify-center py-20 sm:min-h-[540px] lg:py-28`}>
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-amber)]" />
            {pagesContent.home.hero.badge || 'Welcome'}
          </span>
          <h1 className="editable-display mt-6 text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4rem]">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mt-8 flex w-full max-w-xl overflow-hidden rounded-full bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex flex-1 items-center gap-2.5 pl-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-blue)]" />
              <input
                name="q"
                placeholder="Search businesses, photos, topics…"
                className="w-full bg-transparent py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </div>
            <button className="shrink-0 rounded-full bg-[image:var(--slot4-hot-grad)] px-6 text-sm font-semibold text-white transition hover:brightness-105 sm:px-8">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-t border-white/10 bg-black/25 backdrop-blur-sm">
        <div className={`${container} flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-sm text-white/80`}>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-[var(--slot4-amber)] text-[var(--slot4-amber)]" /> Trusted reviews</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-amber)]" /> Local discovery</span>
          <span className="hidden items-center gap-2 sm:inline-flex"><Zap className="h-4 w-4 text-[var(--slot4-amber)]" /> Updated daily</span>
          <Link href={primaryRoute} className="inline-flex items-center gap-1 font-semibold text-white hover:text-[var(--slot4-amber)]">
            Browse {taskLabel(primaryTask).toLowerCase()} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Fresh discoveries (image-first rail) -------------- */
function DiscoveryCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link
      href={href}
      className="group relative block w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] shadow-[0_2px_10px_rgba(16,26,44,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-22px_rgba(16,26,44,0.5)] sm:w-[320px]"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(12,22,38,0.92))]" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[image:var(--slot4-hot-grad)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">{category}</span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="editable-display line-clamp-2 text-lg font-bold leading-snug text-white">{post.title}</h3>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--slot4-amber)]">
            Open <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const rail = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 10)
  if (!rail.length) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Fresh on {SITE_CONFIG.name}</p>
            <h2 className="editable-display mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Newest discoveries</h2>
          </div>
          <Link href={primaryRoute} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-blue)] hover:underline sm:inline-flex">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="zen-rail mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
          {rail.map((post) => (
            <DiscoveryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------- In the spotlight (featured split) -------------- */
const highlightBlocks = [
  { icon: Compass, title: 'Discover with ease', text: 'Browse curated businesses, photos and posts through one calm, connected experience.' },
  { icon: Layers, title: 'Everything in one place', text: 'Listings, image galleries and supporting resources stay linked so exploring feels effortless.' },
  { icon: Zap, title: 'Always fresh', text: 'New posts surface automatically, keeping the homepage lively without any manual upkeep.' },
]

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const feature = pool[0]
  const supporting = pool.slice(1, 5)
  if (!feature) return null

  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} py-14 sm:py-20`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">In the spotlight</p>
            <h2 className="editable-display mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Worth a closer look</h2>
          </div>
          <Link href={primaryRoute} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-blue)] hover:underline sm:inline-flex">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Featured card */}
          <Link
            href={postHref(primaryTask, feature, primaryRoute)}
            className="group relative block overflow-hidden rounded-3xl bg-[var(--slot4-dark-bg)] shadow-[0_30px_60px_-30px_rgba(12,22,38,0.6)]"
          >
            <div className="relative min-h-[360px] lg:min-h-[480px]">
              <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,22,38,0.1),rgba(12,22,38,0.9))]" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-7 sm:p-9 lg:min-h-[480px]">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[image:var(--slot4-hot-grad)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                  <Sparkles className="h-3.5 w-3.5" /> Featured
                </span>
                <h3 className="editable-display mt-4 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl">{feature.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">{getExcerpt(feature, 170)}</p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition group-hover:gap-3">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Supporting horizontal list */}
          <div className="grid content-start gap-4">
            {supporting.length ? (
              supporting.map((post, i) => (
                <Link
                  key={post.id || post.slug}
                  href={postHref(primaryTask, post, primaryRoute)}
                  className="group flex gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_16px_34px_-22px_rgba(16,26,44,0.5)]"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-extrabold text-[var(--slot4-accent)]">{i + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    {categoryOf(post) ? <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--slot4-blue)]">{categoryOf(post)}</p> : null}
                    <h4 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h4>
                    <RatingRow post={post} />
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--editable-border)] p-8 text-center text-sm text-[var(--slot4-muted-text)]">
                More posts will appear here as they are published.
              </div>
            )}
          </div>
        </div>

        {/* Highlight strip — "for everybody" */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {highlightBlocks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(16,26,44,0.5)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="editable-display mt-4 text-lg font-bold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Browse + time-based discovery -------------------- */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(16,26,44,0.5)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-panel-bg)]' : 'bg-[var(--slot4-surface-bg)]'}>
            <div className={`${container} py-12 sm:py-14`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-blue)] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative scroll-mt-24 overflow-hidden bg-[var(--slot4-dark-bg)]">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(19,78,142,0.5),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(255,68,0,0.35),transparent_55%)]" />
      <div className={`relative ${container} flex flex-col items-center gap-6 py-16 text-center sm:py-20`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          <Camera className="h-3.5 w-3.5 text-[var(--slot4-amber)]" /> {pagesContent.home.cta?.badge || 'Start exploring'}
        </span>
        <h2 className="editable-display max-w-2xl text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          Got something worth sharing?
        </h2>
        <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          Add your business, post a listing, or share a standout photo — and reach the {SITE_CONFIG.name} community.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--slot4-hot-grad)] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(255,68,0,0.8)] transition hover:brightness-105">
            Create a post <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
