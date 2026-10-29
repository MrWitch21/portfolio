import { Moon, Sun } from 'lucide-react'
import { profile, ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = usePrefs()
  const links = [
    ['#work', ui.nav.work],
    ['#about', ui.nav.about],
    ['#experience', ui.nav.experience],
    ['#contact', ui.nav.contact],
  ] as const

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="display text-xl font-bold tracking-tight">
          {profile.firstName}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-[0.95rem] text-muted md:flex">
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
        </div>
      </nav>
    </header>
  )
}
