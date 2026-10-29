import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'

/**
 * A Balaton körvonala, nagyon stilizálva. Az UltraBalaton Tracker
 * élő térképének visszhangja: egy futó GPS-nyoma, ami betöltéskor kirajzolódik.
 */
const SHORE: [number, number][] = [
  [395, 110], [450, 85], [510, 58], [560, 38], [588, 42], [596, 62],
  [575, 85], [520, 112], [455, 148], [400, 182], [355, 198], [300, 208],
  [230, 228], [160, 250], [95, 270], [40, 276], [18, 252], [40, 215],
  [110, 190], [190, 165], [265, 140], [310, 128], [335, 138], [348, 165],
  [364, 172], [376, 142],
]

/** Zárt Catmull–Rom spline → SVG path */
function smoothClosedPath(pts: [number, number][]): string {
  const n = pts.length
  const p = (i: number) => pts[(i + n) % n]
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < n; i++) {
    const [x0, y0] = p(i - 1)
    const [x1, y1] = p(i)
    const [x2, y2] = p(i + 1)
    const [x3, y3] = p(i + 2)
    const c1x = x1 + (x2 - x0) / 6
    const c1y = y1 + (y2 - y0) / 6
    const c2x = x2 - (x3 - x1) / 6
    const c2y = y2 - (y3 - y1) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2} ${y2}`
  }
  return d + ' Z'
}

const ROUTE = smoothClosedPath(SHORE)
/** Mekkora részét futotta le a kör "élő" futója */
const PROGRESS = 0.64

export function RouteTrace({ caption }: { caption: string }) {
  const routeRef = useRef<SVGPathElement>(null)
  const traceRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGGElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const route = routeRef.current
    const trace = traceRef.current
    const dot = dotRef.current
    if (!route || !trace || !dot) return

    const total = route.getTotalLength()

    const draw = (fraction: number) => {
      const len = total * fraction
      trace.style.strokeDasharray = `${len} ${total}`
      const pt = route.getPointAtLength(len)
      dot.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    }

    if (reduce) {
      draw(PROGRESS)
      return
    }

    draw(0)
    const controls = animate(0, PROGRESS, {
      duration: 2.4,
      delay: 0.35,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: draw,
    })
    return () => controls.stop()
  }, [reduce])

  const [sx, sy] = SHORE[0]

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 600 300"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={caption}
      >
        {/* tó */}
        <path d={ROUTE} fill="var(--accent-soft)" opacity={0.7} />
        {/* tervezett útvonal */}
        <path
          ref={routeRef}
          d={ROUTE}
          fill="none"
          stroke="var(--muted)"
          strokeOpacity={0.45}
          strokeWidth={1.5}
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        {/* megtett táv */}
        <path
          ref={traceRef}
          d={ROUTE}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: '0 9999' }}
        />
        {/* rajt / cél */}
        <g transform={`translate(${sx} ${sy})`}>
          <rect x={-6} y={-6} width={12} height={12} rx={2} fill="var(--ink)" />
          <rect x={-2.5} y={-2.5} width={5} height={5} rx={1} fill="var(--bg)" />
        </g>
        {/* élő futó */}
        <g ref={dotRef}>
          <circle r={9} fill="var(--live)" className="live-ping" />
          <circle r={9} fill="var(--live)" stroke="var(--surface)" strokeWidth={3} />
        </g>
      </svg>
      <figcaption className="mt-3 flex items-center gap-2 text-sm text-muted">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-live live-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-live" />
        </span>
        {caption}
      </figcaption>
    </figure>
  )
}
