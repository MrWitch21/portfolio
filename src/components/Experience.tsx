import { education, experience, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function Experience() {
  const { t } = usePrefs()
  if (experience.length === 0 && education.length === 0) return null

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 className="display mb-12 text-[clamp(2rem,5vw,3.2rem)] font-bold">{t(ui.expTitle)}</h2>
      <ol className="relative ml-1.5 border-l-2 border-line">
        {experience.map((job, i) => (
          <li key={job.company} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
            <span
              className={`absolute top-2 -left-[7px] size-3 rounded-full ring-4 ring-bg ${
                i === 0 ? 'bg-accent' : 'bg-muted'
              }`}
              aria-hidden="true"
            />
            <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-10">
              <div className="text-muted md:pt-0.5">
                <p>{t(job.period)}</p>
                <p className="text-sm">{t(job.place)}</p>
              </div>
              <div>
                <h3 className="display text-2xl font-bold leading-tight">{t(job.role)}</h3>
                <p className="mt-1 font-medium text-accent">
                  {job.company}
                  {job.companyNote && <span className="font-normal text-muted"> ({job.companyNote})</span>}
                </p>
                <p className="mt-3 max-w-[62ch] text-muted">{t(job.description)}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <li key={s} className="rounded-md border border-line px-2 py-0.5 text-[0.82rem] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {education.length > 0 && (
        <div className="mt-16 grid gap-2 md:grid-cols-[14rem_1fr] md:gap-10">
          <h3 className="display text-2xl font-bold md:pl-1">{t(ui.eduTitle)}</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <li key={e.period.en} className="rounded-2xl bg-surface p-5">
                <p className="text-sm text-muted">
                  {t(e.period)}
                  {e.ongoing && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-ink">{t(ui.ongoing)}</span>}
                </p>
                <p className="mt-2 font-semibold">{t(e.degree)}</p>
                <p className="text-muted">{t(e.school)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
