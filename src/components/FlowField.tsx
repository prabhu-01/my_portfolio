import { useEffect, useRef } from 'react'

// ── Perlin noise 2D ────────────────────────────────────────────────────────
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lrp  = (a: number, b: number, t: number) => a + (b - a) * t

function grad(h: number, x: number, y: number) {
  h &= 3
  return h === 0 ? x + y : h === 1 ? -x + y : h === 2 ? x - y : -x - y
}

class Perlin {
  private p: Uint8Array
  constructor() {
    const src = Array.from({ length: 256 }, (_, i) => i)
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [src[i], src[j]] = [src[j], src[i]]
    }
    this.p = new Uint8Array(512)
    for (let i = 0; i < 512; i++) this.p[i] = src[i & 255]
  }
  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    x -= Math.floor(x); y -= Math.floor(y)
    const u = fade(x), v = fade(y)
    const a = this.p[X] + Y, b = this.p[X + 1] + Y
    return lrp(
      lrp(grad(this.p[a],     x,     y    ), grad(this.p[b],     x - 1, y    ), u),
      lrp(grad(this.p[a + 1], x,     y - 1), grad(this.p[b + 1], x - 1, y - 1), u),
      v
    )
  }
}

// ── Colour stops: deep purple → violet → cyan → violet ────────────────────
const STOPS: [number, number, number][] = [
  [76,  28,  194],  // deep purple
  [124, 58,  237],  // purple
  [167, 139, 250],  // violet
  [200, 180, 255],  // light violet / near white
  [34,  211, 238],  // cyan
  [167, 139, 250],  // back to violet
  [124, 58,  237],  // purple
]

function colorAt(t: number): string {
  const s = STOPS
  const scaled = ((t % 1) + 1) % 1 * (s.length - 1)
  const i = Math.floor(scaled), f = scaled - i
  const a = s[Math.min(i, s.length - 1)]
  const b = s[Math.min(i + 1, s.length - 1)]
  const r = Math.round(a[0] + (b[0] - a[0]) * f)
  const g = Math.round(a[1] + (b[1] - a[1]) * f)
  const bv= Math.round(a[2] + (b[2] - a[2]) * f)
  return `${r},${g},${bv}`
}

// ── Particle ───────────────────────────────────────────────────────────────
interface Pt {
  x: number; y: number
  life: number; maxLife: number
  speed: number
  colorT: number   // position in colour spectrum [0,1]
}

function spawn(W: number, H: number): Pt {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    life: 0,
    maxLife: 140 + Math.random() * 140,
    speed: 1.0 + Math.random() * 1.4,
    colorT: Math.random(),
  }
}

// ── Constants ──────────────────────────────────────────────────────────────
const COUNT      = 2800
const NOISE_SCALE = 0.0028   // lower = larger sweeping curves
const TIME_STEP  = 0.00055   // how fast the field evolves
const TRAIL      = 'rgba(5,5,7,0.055)'  // lower = longer trails

export default function FlowField() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const mouseRef   = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const setSize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    const perlin = new Perlin()
    let time = 0
    let raf: number

    // Initialise particles spread over the canvas
    const pts: Pt[] = Array.from({ length: COUNT }, () => spawn(canvas.width, canvas.height))

    // Mouse tracking relative to canvas
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    const tick = () => {
      const W = canvas.width, H = canvas.height
      const mx = mouseRef.current.x, my = mouseRef.current.y

      // Fade trail
      ctx.fillStyle = TRAIL
      ctx.fillRect(0, 0, W, H)

      time += TIME_STEP

      for (const p of pts) {
        // Flow field angle at this particle's position
        const nx     = p.x * NOISE_SCALE + time
        const ny     = p.y * NOISE_SCALE + time * 0.7
        const angle  = perlin.noise(nx, ny) * Math.PI * 4   // * 4 for more rotation variety
        const nz     = perlin.noise(nx * 0.5 + 10, ny * 0.5 + 10)

        // Slow colour drift along spectrum
        p.colorT = (p.colorT + 0.0012) % 1

        let vx = Math.cos(angle) * p.speed
        let vy = Math.sin(angle) * p.speed

        // Mouse repulsion — particles curve away from cursor
        const dx = p.x - mx, dy = p.y - my
        const dist2 = dx * dx + dy * dy
        const REPEL  = 90 * 90
        if (dist2 < REPEL && dist2 > 0.1) {
          const d    = Math.sqrt(dist2)
          const str  = (1 - d / 90) * 3.2
          vx += (dx / d) * str
          vy += (dy / d) * str
        }

        p.x += vx
        p.y += vy
        p.life++

        // Alpha: fade in at start, fade out at end
        const lifePct = p.life / p.maxLife
        const alpha   = lifePct < 0.12
          ? lifePct / 0.12
          : lifePct > 0.82
            ? 1 - (lifePct - 0.82) / 0.18
            : 1

        // Brightness: vary slightly with noise
        const brightness = 0.55 + Math.abs(nz) * 0.45

        // Respawn if off-canvas or life expired
        if (
          p.life >= p.maxLife ||
          p.x < -4 || p.x > W + 4 ||
          p.y < -4 || p.y > H + 4
        ) {
          Object.assign(p, spawn(W, H))
          continue
        }

        // Draw — 2 layers: glow (larger, dim) + core (small, bright)
        const rgb = colorAt(p.colorT)

        // Glow layer
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${(alpha * brightness * 0.18).toFixed(3)})`
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, 0.9, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${(alpha * brightness * 0.85).toFixed(3)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}
