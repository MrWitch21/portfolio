import { useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../data/content'
import { PrefsContext, type Prefs, type Theme } from './prefs'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

function initialLang(): Lang {
  const saved = read('lang')
  if (saved === 'hu' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('hu') ? 'hu' : 'en'
}

function initialTheme(): Theme {
  const saved = read('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value: Prefs = {
    lang,
    setLang: (l) => {
      setLangState(l)
      write('lang', l)
    },
    theme,
    toggleTheme: () =>
      setTheme((prev) => {
        const next = prev === 'dark' ? 'light' : 'dark'
        write('theme', next)
        return next
      }),
    t: (text) => text[lang],
  }

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}
