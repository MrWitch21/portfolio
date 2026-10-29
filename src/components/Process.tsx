import { steps, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function Process() {
  const { t } = usePrefs()
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="max-w-2xl">
        <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold">{t(ui.processTitle)}</h2>
        <p className="mt-5 text-lg text-muted">{t(ui.processLead)}</p>
      </div>
      <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title.en} className="border-t border-line pt-6">
            <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display mt-3 text-lg font-semibold">{t(s.title)}</h3>
            <p className="mt-2 text-muted">{t(s.body)}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
