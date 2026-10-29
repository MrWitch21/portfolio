import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion } from 'motion/react'
import { FileText, TrendingUp } from 'lucide-react'
import { ui, type Lang } from '../data/content'
import { usePrefs } from '../lib/prefs'

// New KATA, 2027 proposal: 22M Ft yearly revenue cap, 40% tax on anything above it
const LIMIT = 22_000_000
const OVER_RATE = 0.4
const SCALE = 24_000_000
const BASE = 15_400_000
const INVOICES = [
  { no: 'KN-2027-031', amount: 1_760_000 },
  { no: 'KN-2027-032', amount: 2_200_000 },
  { no: 'KN-2027-033', amount: 3_740_000 },
]

// step 0 fills the existing revenue, odd steps preview an invoice, even steps record it; holds on the last preview, then replays
const LAST = INVOICES.length * 2 - 1
const HOLD_MS = [1000, 1600, 600, 1600, 600]
const REPLAY_MS = 10_000
const ease = [0.45, 0, 0.2, 1] as const

const totalAfter = (n: number) => INVOICES.slice(0, n).reduce((sum, inv) => sum + inv.amount, BASE)
const pos = (v: number) => `${(v / SCALE) * 100}%`
const percent = (v: number) => `${Math.round((v / LIMIT) * 100)}%`
const ft = (v: number, lang: Lang) => `${Math.round(v).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-GB')} Ft`

function Segment({ start, amount, solid }: { start: number; amount: number; solid: boolean }) {
  const inside = Math.min(1, (LIMIT - start) / amount)
  return (
    <motion.div
      className="absolute inset-y-0 pr-0.5"
      style={{ left: pos(start), width: pos(amount) }}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      transition={{ duration: solid ? 1 : 0.7, ease }}
    >
      <div className="relative h-full">
        <div
          className={`absolute inset-y-0 left-0 rounded-md border-2 transition-colors duration-500 ${
            solid ? 'border-transparent bg-accent' : 'border-dashed border-accent bg-accent/15'
          } ${inside < 1 ? 'rounded-r-none' : ''}`}
          style={{ width: `${inside * 100}%` }}
        />
        {inside < 1 && (
          <div
            className="over-hatch absolute inset-y-0 right-0 rounded-md rounded-l-none border-2 border-l-0 border-dashed border-live"
            style={{ left: `${inside * 100}%` }}
          />
        )}
      </div>
    </motion.div>
  )
}

function ImpactCard({ i }: { i: number }) {
  const { t, lang } = usePrefs()
  const { no, amount } = INVOICES[i]
  const before = totalAfter(i)
  const after = before + amount
  const tax = (Math.max(0, after - LIMIT) - Math.max(0, before - LIMIT)) * OVER_RATE

  return (
    <div className="rounded-2xl border border-line bg-bg p-4 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-muted">
          <FileText size={16} />
          <span className="font-mono text-[0.8rem] text-ink">{no}</span>
        </span>
        <span className="font-semibold tabular-nums">{ft(amount, lang)}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3 border-t border-line pt-3">
        <div>
          <p className="flex items-center gap-1.5 text-muted">
            <TrendingUp size={15} />
            {t(ui.impact.title)}
          </p>
          <p className={`display text-lg font-semibold ${tax > 0 ? 'text-live' : ''}`}>
            {tax > 0 ? `+ ${ft(tax, lang)} ${t(ui.impact.tax)}` : t(ui.impact.none)}
          </p>
        </div>
        <p className="whitespace-nowrap text-muted tabular-nums">
          {percent(before)} → <span className="font-medium text-ink">{percent(after)}</span>
        </p>
      </div>
    </div>
  )
}

export function TaxImpact({ caption }: { caption: string }) {
  const { t, lang } = usePrefs()
  const figRef = useRef<HTMLElement>(null)
  const revRef = useRef<HTMLParagraphElement>(null)
  const leftRef = useRef<HTMLParagraphElement>(null)
  const shown = useRef(0)
  const reduce = useReducedMotion()
  const inView = useInView(figRef, { once: true, amount: 0.5 })
  const [step, setStep] = useState(-1)
  const [run, setRun] = useState(0)

  const s = reduce ? LAST : step
  const recorded = Math.max(0, Math.floor(s / 2))
  const preview = s % 2 === 1 ? (s - 1) / 2 : null
  const revenue = s < 0 ? 0 : totalAfter(recorded)

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

  useEffect(() => {
    const paint = (v: number) => {
      shown.current = v
      const rounded = Math.round(v / 10_000) * 10_000
      if (revRef.current) revRef.current.textContent = ft(rounded, lang)
      if (leftRef.current) leftRef.current.textContent = ft(Math.max(0, LIMIT - rounded), lang)
    }
    paint(reduce ? revenue : shown.current)
    if (reduce) return
    const controls = animate(shown.current, revenue, { duration: 0.9, ease, onUpdate: paint })
    return () => controls.stop()
  }, [revenue, reduce, lang])

  return (
    <MotionConfig reducedMotion="user">
      <figure ref={figRef} className="m-0 self-center">
        <div aria-hidden="true">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted">{t(ui.impact.cap)}</p>
              <p ref={revRef} className="display text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold tabular-nums">
                {ft(0, lang)}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-muted">{t(ui.impact.left)}</p>
              <p ref={leftRef} className="font-medium tabular-nums">
                {ft(LIMIT, lang)}
              </p>
            </div>
          </div>

          <div className="relative h-12 rounded-xl border border-line bg-bg">
            <div className="absolute inset-1.5">
              <AnimatePresence initial={false}>
                {s >= 0 && <Segment key={`${run}-base`} start={0} amount={BASE} solid />}
                {INVOICES.map(
                  (inv, i) =>
                    (i < recorded || i === preview) && (
                      <Segment key={`${run}-${inv.no}`} start={totalAfter(i)} amount={inv.amount} solid={i < recorded} />
                    ),
                )}
              </AnimatePresence>
              <div className="absolute -inset-y-1.5 w-0.5 -translate-x-1/2 bg-ink" style={{ left: pos(LIMIT) }} />
            </div>
          </div>
          <div className="relative mx-1.5 mt-2 h-5 text-xs text-muted">
            <span className="absolute left-0">0</span>
            <span
              className="absolute -translate-x-full whitespace-nowrap pr-1.5 font-medium text-ink"
              style={{ left: pos(LIMIT) }}
            >
              {t(ui.impact.limit)}: {LIMIT / 1_000_000} M Ft
            </span>
          </div>

          <div className="relative mt-5">
            <div className="invisible">
              <ImpactCard i={INVOICES.length - 1} />
            </div>
            <AnimatePresence initial={false}>
              {preview !== null && (
                <motion.div
                  key={`${run}-${preview}`}
                  className="absolute inset-x-0 top-0"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ImpactCard i={preview} />
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
