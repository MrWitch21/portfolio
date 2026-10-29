import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { quoteMail, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = usePrefs()
  const [open, setOpen] = useState(false)
  const links = [
    ['#services', ui.nav.services],
    ['#work', ui.nav.work],
    ['#about', ui.nav.about],
    ['#contact', ui.nav.contact],
  ] as const

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t(ui.menu)}
          className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <ul className="hidden items-center gap-8 text-[0.95rem] text-muted md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-ink">
                {t(label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className="flex rounded-full border border-line p-0.5 text-sm font-medium"
          >
            {(['hu', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === l ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href={quoteMail(t(ui.mailSubject))}
            className="ml-2 hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 md:inline-flex"
          >
            {t(ui.cta)}
          </a>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line/70 px-5 py-3 sm:px-8 md:hidden">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-3 text-lg">
                {t(label)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
