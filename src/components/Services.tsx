import { AppWindow, Globe, Wrench, type LucideIcon } from 'lucide-react'
import { services, ui, type Service } from '../data/content'
import { usePrefs } from '../lib/prefs'

const ICONS: Record<Service['icon'], LucideIcon> = {
  website: Globe,
  app: AppWindow,
  care: Wrench,
}

export function Services() {
  const { t } = usePrefs()
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="max-w-2xl">
        <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold">{t(ui.servicesTitle)}</h2>
        <p className="mt-5 text-lg text-muted">{t(ui.servicesLead)}</p>
      </div>
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((s) => {
          const Icon = ICONS[s.icon]
          return (
            <li key={s.icon} className="rounded-3xl bg-surface p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="display mt-7 text-xl font-semibold">{t(s.title)}</h3>
              <p className="mt-3 text-muted">{t(s.body)}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
