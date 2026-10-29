import { Mail } from 'lucide-react'
import { profile, quoteMail, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'
import { DeviceDemo } from './DeviceDemo'

export function Hero() {
  const { t } = usePrefs()

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 md:pt-24 md:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-ink">
              <span className="size-1.5 rounded-full bg-accent" />
              {t(ui.available)}
            </span>
          )}

          <p className="mt-8 text-muted">
            <span className="block font-medium text-ink sm:inline">{profile.name}</span>
            <span aria-hidden="true" className="mx-2.5 hidden sm:inline">·</span>
            {t(profile.role)}
          </p>

          <h1 className="display mt-4 max-w-[15ch] text-[clamp(2.25rem,5.2vw,3.5rem)] font-semibold">
            {t(profile.headline)}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted">{t(profile.intro)}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={quoteMail(t(ui.mailSubject))}
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
          </div>
        </div>

        <DeviceDemo />
      </div>
    </section>
  )
}
