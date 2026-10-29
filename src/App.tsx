import { profile, ui } from './data/content'
import { usePrefs } from './lib/prefs'
import { PrefsProvider } from './lib/PrefsProvider'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Work } from './components/Work'
import { Process } from './components/Process'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

const YEAR = new Date().getFullYear()

function Footer() {
  const { t } = usePrefs()
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-line px-5 pt-8 pb-12 text-sm text-muted sm:px-8">
      <span>
        © {YEAR} {profile.name}
      </span>
      <span>{t(ui.footer)}</span>
    </footer>
  )
}

export default function App() {
  return (
    <PrefsProvider>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </PrefsProvider>
  )
}
