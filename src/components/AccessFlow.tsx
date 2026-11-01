import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'motion/react'
import { Check, FolderTree, History, Minus } from 'lucide-react'
import { ui, type T } from '../data/content'
import { usePrefs } from '../lib/prefs'

// The demo request from the Jogkör README: Nagy Péter asks for sql-readonly for 14 days, his manager and the group
// owner approve, the worker adds him to the LDAP group, and the expiry job takes him out again
const NODES = [
  { label: ui.access.steps.request, initials: 'NP' },
  { label: ui.access.steps.manager, initials: 'KA' },
  { label: ui.access.steps.owner, initials: 'TB' },
  { label: ui.access.steps.directory, initials: null },
]

const LOG: { time: string | T; who: string | T; what: string | T; op?: boolean }[] = [
  { time: '10:50', who: 'Nagy Péter', what: ui.access.requested },
  { time: '11:02', who: 'Kovács Anna', what: ui.access.approved },
  { time: '11:15', who: 'Tóth Balázs', what: ui.access.approved },
  { time: '11:15', who: ui.access.system, what: 'add member', op: true },
  { time: ui.access.later, who: ui.access.system, what: 'delete member', op: true },
]

// step n has written n + 1 log entries and finished node n; holds on the expired state, then replays
const LAST = LOG.length - 1
const HOLD_MS = [1400, 1400, 1100, 2200]
const REPLAY_MS = 10_000
const ROWS = 3
const ease = [0.45, 0, 0.2, 1] as const

type NodeState = 'wait' | 'active' | 'done' | 'removed'

const nodeStyles: Record<NodeState, string> = {
  wait: 'border-line bg-bg text-muted',
  active: 'border-accent bg-surface text-ink',
  done: 'border-accent bg-accent-soft text-ink',
  removed: 'border-line bg-bg text-muted',
}

function Node({ label, initials, state }: { label: string; initials: string | null; state: NodeState }) {
  const badge = state === 'done' || state === 'removed'
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative z-10">
        {state === 'active' && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            initial={{ opacity: 0.35, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div
          className={`relative flex size-10 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors duration-500 ${nodeStyles[state]}`}
        >
          {initials ?? <FolderTree size={17} />}
        </div>
        <AnimatePresence initial={false}>
          {badge && (
            <motion.span
              key={state}
              className={`absolute -right-1 -bottom-1 flex size-[1.1rem] items-center justify-center rounded-full ring-2 ring-surface ${
                state === 'done' ? 'bg-accent text-accent-ink' : 'bg-live text-surface'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
            >
              {state === 'done' ? <Check size={11} strokeWidth={3} /> : <Minus size={11} strokeWidth={3} />}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className={`text-xs font-medium transition-colors duration-500 ${state === 'wait' ? 'text-muted' : ''}`}>
        {label}
      </span>
    </div>
  )
}

export function AccessFlow({ caption }: { caption: string }) {
  const { t } = usePrefs()
  const figRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(figRef, { once: true, amount: 0.5 })
  const [step, setStep] = useState(-1)
  const [run, setRun] = useState(0)

  const s = reduce ? LAST : step
  const tx = (v: string | T) => (typeof v === 'string' ? v : t(v))
  const nodeState = (i: number): NodeState =>
    i === NODES.length - 1 && s === LAST ? 'removed' : s >= i ? 'done' : s === i - 1 ? 'active' : 'wait'
  const first = Math.max(0, s - ROWS + 1)
  const status = s >= 0 ? ui.access.status[s] : null
  const statusStyle = s < 3 ? 'border border-dashed border-muted/60 text-muted' : s === 3 ? 'bg-accent-soft text-ink' : 'border border-line text-muted'

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
          <div className="mb-7 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-mono text-lg font-semibold">sql-readonly</p>
              <p className="text-sm text-muted">{t(ui.access.who)}</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {status && (
                <motion.span
                  key={`${run}-${s}`}
                  className={`mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.8rem] font-medium whitespace-nowrap ${statusStyle}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {s < 3 && <span className="size-1.5 animate-pulse rounded-full bg-live" />}
                  {t(status)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="relative grid grid-cols-4">
            {NODES.slice(1).map((_, i) => (
              <div key={i} className="absolute top-[19px] h-0.5 w-1/4 bg-line" style={{ left: `${(i + 0.5) * 25}%` }}>
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={false}
                  animate={{ scaleX: s >= i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease }}
                />
              </div>
            ))}
            {NODES.map((n, i) => (
              <Node key={i} label={t(n.label)} initials={n.initials} state={nodeState(i)} />
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-line bg-bg p-4 text-sm">
            <p className="mb-2 flex items-center gap-1.5 text-muted">
              <History size={15} />
              {t(ui.access.log)}
            </p>
            <ul className="relative h-[5.25rem] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {LOG.slice(first, s + 1).map((e, j) => (
                  <motion.li
                    layout
                    key={`${run}-${first + j}`}
                    className="flex h-7 items-center gap-3 whitespace-nowrap"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <span className="w-16 shrink-0 font-mono text-[0.8rem] text-muted tabular-nums">{tx(e.time)}</span>
                    <span className="min-w-0 truncate">
                      <span className="font-medium">{tx(e.who)}</span>{' '}
                      <span className={e.op ? 'font-mono text-[0.8rem] text-accent' : 'text-muted'}>{tx(e.what)}</span>
                    </span>
                    {e.op && <Check size={14} className="ml-auto shrink-0 text-accent" />}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
        <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
      </figure>
    </MotionConfig>
  )
}
