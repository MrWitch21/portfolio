import { profile, skills, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function About() {
  const { t } = usePrefs()
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold">{t(ui.aboutTitle)}</h2>
          <div className="mt-8 max-w-[60ch] space-y-5 text-[1.05rem]">
            {profile.about.map((p) => (
              <p key={p.en}>{t(p)}</p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="display text-xl font-semibold md:mt-3">{t(ui.stackTitle)}</h3>
          <dl className="mt-8 space-y-7">
            {skills.map((g) => (
              <div key={g.group.en}>
                <dt className="text-sm font-medium text-muted">{t(g.group)}</dt>
                <dd className="m-0 mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                        {s}
                      </li>
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
