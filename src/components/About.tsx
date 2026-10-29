import { profile, skills, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function About() {
  const { t } = usePrefs()
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div>
          <h2 className="display text-[clamp(2rem,5vw,3.2rem)] font-bold">{t(ui.aboutTitle)}</h2>
          <p className="mt-6 max-w-[58ch] text-lg">{t(profile.about)}</p>
        </div>
        <div>
          <h3 className="display text-2xl font-bold">{t(ui.stackTitle)}</h3>
          <dl className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skills.map((g) => (
              <div key={g.group.en}>
                <dt className="mb-3 border-b border-line pb-2 font-semibold">{t(g.group)}</dt>
                <dd className="m-0">
                  <ul className="space-y-1.5 text-muted">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
