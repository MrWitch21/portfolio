import { createContext, useContext } from 'react'
import type { Lang, T } from '../data/content'

export type Theme = 'light' | 'dark'

export interface Prefs {
  lang: Lang
  setLang: (l: Lang) => void
  theme: Theme
  toggleTheme: () => void
  t: (text: T) => string
}

export const PrefsContext = createContext<Prefs | null>(null)

export function usePrefs() {
  const ctx = useContext(PrefsContext)
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider')
  return ctx
}
