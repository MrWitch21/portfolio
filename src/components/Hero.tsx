import { Mail, MapPin } from 'lucide-react'
import { profile, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { RouteTrace } from './RouteTrace'

export function Hero() {
  const { t } = usePrefs()
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] text-muted">
        <span className="font-medium text-ink">{t(profile.role)}</span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={15} aria-hidden="true" />
          {t(profile.location)}
        </span>
        {profile.openToWork && (
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-ink">
            <span className="size-1.5 rounded-full bg-live" />
            {t(ui.openToWork)}
          </span>
        )}
      </div>

      <div className="mt-6 grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <h1 className="display text-[clamp(3.6rem,12vw,8.75rem)] font-extrabold">
            {first}
            <br />
            {rest.join(' ')}
          </h1>
          <p className="mt-8 max-w-[34ch] text-xl leading-snug text-ink sm:text-2xl">{t(profile.headline)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              <Mail size={18} aria-hidden="true" />
              {t(ui.cta)}
            </a>
            <a
              href="#work"
              className="inline-flex items-center rounded-full border border-line px-5 py-3 font-medium transition-colors hover:border-ink"
            >
              {t(ui.seeWork)}
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <GithubIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        <RouteTrace caption={t(ui.trace)} />
      </div>
    </section>
  )
}
