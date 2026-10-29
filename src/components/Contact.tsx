import { useState } from 'react'
import { Check, Copy, FileText } from 'lucide-react'
import { profile, quoteMail, ui } from '../data/content'
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
    } catch {}
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pt-8 pb-20 sm:px-8 md:pb-28">
      <div className="rounded-3xl bg-accent px-7 py-14 text-accent-ink sm:px-12 md:px-16 md:py-20">
        <h2 className="display max-w-[20ch] text-[clamp(1.75rem,4vw,2.75rem)] font-semibold">{t(ui.contactTitle)}</h2>
        <p className="mt-5 max-w-[48ch] text-lg opacity-90">{t(ui.contactBody)}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={quoteMail(t(ui.mailSubject))}
            className="display break-all text-[clamp(1.15rem,2.6vw,1.6rem)] font-medium underline decoration-2 underline-offset-[6px] hover:decoration-[3px]"
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

        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[0.95rem] font-medium">
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
