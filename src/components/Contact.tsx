import { useState } from 'react'
import { Check, Copy, FileText } from 'lucide-react'
import { profile, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export function Contact() {
  const { t } = usePrefs()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ha nincs vágólap-hozzáférés, a mailto link még működik */
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 md:pt-20">
      <div className="rounded-[2rem] bg-accent px-6 py-12 text-accent-ink sm:px-10 md:px-14 md:py-16">
        <h2 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)] font-bold">{t(ui.contactTitle)}</h2>
        <p className="mt-5 max-w-[45ch] text-lg opacity-85">{t(ui.contactBody)}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="display break-all text-[clamp(1.4rem,4vw,2.4rem)] font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-4"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full border border-current/40 px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent-ink/10"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? t(ui.copied) : t(ui.copy)}
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-medium">
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
            <GithubIcon size={18} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
            <LinkedinIcon size={18} /> LinkedIn
          </a>
          {profile.cv && (
            <a href={profile.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <FileText size={18} aria-hidden="true" /> {t(ui.cv)}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
