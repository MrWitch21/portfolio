import { useEffect, useState } from 'react'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Monitor, Search, Smartphone, Zap } from 'lucide-react'
import { ui } from '../data/content'
import { usePrefs } from '../lib/prefs'

type Device = 'desktop' | 'phone'

const CYCLE_MS = 3200
const spring = { type: 'spring', bounce: 0.15, duration: 0.7 } as const

const chips = [
  { icon: Smartphone, text: ui.preview.chips.mobile, pos: 'top-[4%] left-0 sm:-left-3', delay: 0.5 },
  { icon: Zap, text: ui.preview.chips.fast, pos: 'top-[40%] right-0 sm:-right-3', delay: 0.8 },
  { icon: Search, text: ui.preview.chips.seo, pos: 'bottom-[5%] left-[4%]', delay: 1.1 },
]

export function DeviceDemo() {
  const { t } = usePrefs()
  const reduce = useReducedMotion()
  const [device, setDevice] = useState<Device>('desktop')
  const [auto, setAuto] = useState(true)
  const phone = device === 'phone'

  useEffect(() => {
    if (!auto || reduce) return
    const id = setInterval(() => setDevice((d) => (d === 'desktop' ? 'phone' : 'desktop')), CYCLE_MS)
    return () => clearInterval(id)
  }, [auto, reduce])

  const pick = (d: Device) => {
    setAuto(false)
    setDevice(d)
  }

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <figure className="m-0">
        <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center sm:aspect-[6/5]">
          <div className="absolute inset-[14%] rounded-full bg-accent-soft opacity-70 blur-3xl" />

          <motion.div
            layout
            animate={{ borderRadius: phone ? 26 : 14 }}
            className={`relative z-10 flex flex-col overflow-hidden border border-line bg-surface shadow-[0_30px_60px_-25px_rgb(0_0_0/0.35)] ${
              phone ? 'aspect-[9/18] h-[94%]' : 'aspect-[16/10] w-full'
            }`}
          >
            <motion.div layout className="relative flex shrink-0 items-center justify-center border-b border-line px-3 py-2">
              <motion.div
                layout
                className={`absolute left-3 flex gap-1 transition-opacity duration-300 ${phone ? 'opacity-0' : ''}`}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-line" />
                ))}
              </motion.div>
              <motion.div layout className={`h-2 rounded-full bg-line ${phone ? 'w-10' : 'w-2/5'}`} />
            </motion.div>

            <motion.div layout className={`flex min-h-0 flex-1 flex-col ${phone ? 'gap-3 p-3' : 'gap-4 p-4 sm:p-5'}`}>
              <motion.div layout className="flex items-center justify-between">
                <motion.div layout className="flex items-center gap-1.5">
                  <motion.span layout className="size-3 rounded-full bg-accent" />
                  <motion.span layout className="h-1.5 w-10 rounded-full bg-ink/70" />
                </motion.div>
                <motion.div layout className={`flex ${phone ? 'flex-col gap-[3px]' : 'gap-2'}`}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      layout
                      className={`rounded-full bg-muted/50 ${phone ? 'h-[2px] w-3.5' : 'h-1.5 w-7'}`}
                    />
                  ))}
                </motion.div>
              </motion.div>

              <motion.div layout className={`flex ${phone ? 'flex-col gap-3' : 'items-center gap-5'}`}>
                <motion.div layout className={`flex flex-col ${phone ? 'gap-1.5' : 'flex-1 gap-2'}`}>
                  <motion.p
                    layout
                    className={`display font-semibold text-ink ${
                      phone ? 'text-[0.78rem]' : 'text-[clamp(0.85rem,2.2vw,1.15rem)]'
                    }`}
                  >
                    {t(ui.preview.headline)}
                  </motion.p>
                  <motion.span layout className="h-1.5 w-full rounded-full bg-line" />
                  <motion.span layout className="h-1.5 w-3/4 rounded-full bg-line" />
                  <motion.span layout className={`mt-1 rounded-full bg-accent ${phone ? 'h-4 w-14' : 'h-5 w-20'}`} />
                </motion.div>
                <motion.div
                  layout
                  className={`rounded-lg bg-linear-to-br from-accent-soft to-accent/40 ${
                    phone ? 'h-16 w-full' : 'aspect-[16/10] w-[40%]'
                  }`}
                />
              </motion.div>

              <motion.div layout className={`grid gap-2.5 ${phone ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} layout className="flex flex-col gap-1.5 rounded-lg border border-line p-2">
                    <motion.span layout className="h-7 rounded-md bg-accent-soft" />
                    <motion.span layout className="h-1.5 w-4/5 rounded-full bg-line" />
                    <motion.span layout className="h-1.5 w-1/2 rounded-full bg-line" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {chips.map(({ icon: Icon, text, pos, delay }) => (
            <span
              key={text.en}
              style={{ animationDelay: `${delay}s, ${delay + 0.5}s` }}
              className={`chip absolute z-20 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium shadow-[0_10px_30px_-12px_rgb(0_0_0/0.3)] sm:text-sm ${pos}`}
            >
              <Icon size={14} className="text-accent" aria-hidden="true" />
              {t(text)}
            </span>
          ))}
        </div>

        <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-muted">{t(ui.preview.caption)}</span>
          <div role="group" aria-label="Preview" className="flex rounded-full border border-line p-0.5 text-sm font-medium">
            {(['desktop', 'phone'] as const).map((d) => {
              const Icon = d === 'desktop' ? Monitor : Smartphone
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => pick(d)}
                  aria-pressed={device === d}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                    device === d ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
                  }`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {t(ui.preview[d])}
                </button>
              )
            })}
          </div>
        </figcaption>
      </figure>
    </MotionConfig>
  )
}
