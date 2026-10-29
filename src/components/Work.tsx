import { ArrowUpRight } from 'lucide-react'
import { projects, ui, type Project } from '../data/content'
import { usePrefs } from '../lib/prefs'
import { GithubIcon } from './BrandIcons'

function StatusBadge({ status }: { status: Project['status'] }) {
  const { t } = usePrefs()
  const styles = {
    live: 'bg-accent-soft text-ink',
    building: 'border border-dashed border-muted/60 text-muted',
    archived: 'border border-line text-muted',
  }[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.8rem] font-medium ${styles}`}>
      {status === 'building' && <span className="size-1.5 animate-pulse rounded-full bg-live" />}
      {t(ui.status[status])}
    </span>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line px-2 py-0.5 text-[0.82rem] text-muted">
          {s}
        </li>
      ))}
    </ul>
  )
}

function Links({ p }: { p: Project }) {
  const { t } = usePrefs()
  if (!p.repo && !p.demo) return null
  return (
    <div className="flex flex-wrap gap-4 text-[0.95rem] font-medium">
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
          {t(ui.demo)}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-accent">
          <GithubIcon size={16} />
          {t(ui.code)}
        </a>
      )}
    </div>
  )
}

function Featured({ p }: { p: Project }) {
  const { t } = usePrefs()
  return (
    <article className="rounded-[2rem] bg-surface p-6 sm:p-10 md:p-12">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        <StatusBadge status={p.status} />
        <span>{p.year}</span>
      </div>
      <h3 className="display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] font-bold">{p.name}</h3>
      <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <p className="max-w-[46ch] text-lg">{t(p.summary)}</p>
          <Stack items={p.stack} />
          <Links p={p} />
        </div>
        {p.highlights && (
          <ul className="space-y-4 border-line md:border-l md:pl-10">
            {p.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-[0.98rem] text-muted">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{t(h)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function Row({ p }: { p: Project }) {
  const { t } = usePrefs()
  return (
    <article className="grid gap-4 border-t border-line py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:gap-10">
      <div className="space-y-2">
        <h3 className="display text-2xl font-bold leading-tight">{p.name}</h3>
        <div className="flex items-center gap-3 text-sm text-muted">
          <StatusBadge status={p.status} />
          <span>{p.year}</span>
        </div>
      </div>
      <div className="space-y-4">
        <p className="max-w-[60ch] text-muted">{t(p.summary)}</p>
        <Stack items={p.stack} />
      </div>
      <div className="md:pt-1">
        <Links p={p} />
      </div>
    </article>
  )
}

export function Work() {
  const { t } = usePrefs()
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="display mb-10 text-[clamp(2rem,5vw,3.2rem)] font-bold">{t(ui.workTitle)}</h2>
      <div className="space-y-6">
        {featured.map((p) => (
          <Featured key={p.slug} p={p} />
        ))}
      </div>
      {others.length > 0 && (
        <div className="mt-12 border-b border-line">
          {others.map((p) => (
            <Row key={p.slug} p={p} />
          ))}
        </div>
      )}
    </section>
  )
}
