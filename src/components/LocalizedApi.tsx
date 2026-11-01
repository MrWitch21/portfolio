import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'motion/react'
import { ChevronDown, Play } from 'lucide-react'
import { ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

// The package's LanguageDefaults (hu-HU fallback, en-GB) and an ITranslation backed entity
type Header = 'hu-HU' | 'en-GB' | null
const PRODUCT = {
  'hu-HU': { name: 'Forrasztópaszta', category: 'SMT-anyag' },
  'en-GB': { name: 'Solder paste', category: 'SMT material' },
}
const MISSING = 'Missing required header: Accept-Language'

// even steps send a request, odd steps show its response: first without the header, then the other language,
// and it holds on the visitor's own language before replaying
const LAST = 5
const HOLD_MS = [550, 1700, 550, 1700, 550]
const REPLAY_MS = 10_000
const ease = [0.45, 0, 0.2, 1] as const

function Body({ header }: { header: Header }) {
  if (!header) return <p className="break-words text-live">"{MISSING}"</p>
  const { name, category } = PRODUCT[header]
  return (
    <div className="whitespace-nowrap text-muted">
      <p>{'{'}</p>
      <p className="pl-4">
        <span className="text-ink">"id"</span>: <span className="text-ink">42</span>,
      </p>
      <p className="pl-4">
        <span className="text-ink">"name"</span>: <span className="text-accent">"{name}"</span>,
      </p>
      <p className="pl-4">
        <span className="text-ink">"category"</span>: <span className="text-accent">"{category}"</span>
      </p>
      <p>{'}'}</p>
    </div>
  )
}

export function LocalizedApi({ caption }: { caption: string }) {
  const { t, lang } = usePrefs()
  const figRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(figRef, { once: true, amount: 0.5 })
  const [step, setStep] = useState(-1)
  const [run, setRun] = useState(0)

  const own: Header = lang === 'hu' ? 'hu-HU' : 'en-GB'
  const order: Header[] = [null, own === 'hu-HU' ? 'en-GB' : 'hu-HU', own]
  const s = reduce ? LAST : step
  const req = s < 0 ? -1 : Math.floor(s / 2)
  const sending = s >= 0 && s % 2 === 0
  const shown = s < 0 || (sending && req === 0) ? null : sending ? req - 1 : req
  const header = req >= 0 ? order[req] : null
  const ok = shown !== null && order[shown] !== null

  useEffect(() => {
    if (reduce || !inView) return
    const id =
      step >= LAST
        ? setTimeout(() => {
            setRun((r) => r + 1)
            setStep(-1)
          }, REPLAY_MS)
        : setTimeout(() => setStep((n) => n + 1), step >= 0 ? HOLD_MS[step] : run ? 900 : 200)
    return () => clearTimeout(id)
  }, [reduce, inView, step, run])

  return (
    <MotionConfig reducedMotion="user">
      <figure ref={figRef} className="m-0 self-center">
        <div aria-hidden="true">
          <div className="rounded-2xl border border-line bg-bg text-sm">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs font-bold text-accent-ink">GET</span>
              <span className="min-w-0 truncate font-mono text-[0.8rem]">/api/products/42</span>
              <motion.span
                className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-ink px-3 py-1 text-xs font-medium text-bg"
                animate={{ scale: sending ? [1, 0.9, 1] : 1 }}
                transition={{ duration: 0.3, ease }}
              >
                <Play size={11} fill="currentColor" />
                {t(ui.api.send)}
              </motion.span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-[0.8rem]">Accept-Language</p>
                <p className="text-xs text-muted">string (header)</p>
              </div>
              <div
                className={`relative flex h-9 w-[7.25rem] shrink-0 items-center justify-between overflow-hidden rounded-lg border bg-surface px-3 font-mono text-[0.8rem] transition-colors duration-300 ${
                  sending ? 'border-accent' : 'border-line'
                }`}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={header ?? 'none'}
                    className={header ? '' : 'text-muted'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    {header ?? '–'}
                  </motion.span>
                </AnimatePresence>
                <ChevronDown size={14} className="shrink-0 text-muted" />
              </div>
            </div>
          </div>

          <div className="mt-5 mb-2 flex h-7 items-center justify-between text-sm">
            <span className="text-muted">{t(ui.api.response)}</span>
            <AnimatePresence mode="wait" initial={false}>
              {shown !== null && !sending && (
                <motion.span
                  key={`${run}-${shown}`}
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[0.8rem] font-medium ${
                    ok ? 'bg-accent-soft text-ink' : 'border border-live/50 text-live'
                  }`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {ok ? '200 OK' : '400 Bad Request'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg p-4 font-mono text-[0.8rem] leading-relaxed">
            {sending && (
              <motion.div
                key={`${run}-${s}`}
                className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: HOLD_MS[s] / 1000, ease }}
              />
            )}
            <div className="invisible">
              <Body header="hu-HU" />
            </div>
            <AnimatePresence initial={false}>
              {shown !== null && (
                <motion.div
                  key={`${run}-${shown}`}
                  className="absolute inset-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: sending ? 0.35 : 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <Body header={order[shown]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
      </figure>
    </MotionConfig>
  )
}
