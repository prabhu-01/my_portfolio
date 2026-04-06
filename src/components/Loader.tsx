import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ── Easing ─────────────────────────────────────────────────────────────────
const easeOut4  = (t: number) => 1 - Math.pow(1 - t, 4)
const easeOut2  = (t: number) => 1 - Math.pow(1 - t, 2)
const easeIn3   = (t: number) => t * t * t
const lerp      = (a: number, b: number, t: number) => a + (b - a) * t
const clamp     = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// ── Timing (ms) ────────────────────────────────────────────────────────────
const T_DRIFT      = 520
const T_ASSEMBLE   = 1650
const T_HOLD       = 780
const T_BURST      = 600
const LETTER_LAG   = 115   // stagger between each letter starting

// ── Colour palette: white-dominant, subtle violet accent ──────────────────
const PALETTE = [
  '#ffffff', '#ffffff', '#ffffff', '#ffffff',
  '#f7f3ff', '#ede5ff',
  '#C4B5FD', '#A78BFA',
]

interface Particle {
  sx: number; sy: number   // scatter start (updated after drift)
  tx: number; ty: number   // letter-pixel target on screen
  ex: number; ey: number   // explosion endpoint
  x:  number; y:  number
  vx: number; vy: number
  r:     number
  color: string
  alpha: number
  letter: number           // 0 = P … 5 = U
  // cached for alpha ramp during assembly
  initDist: number
}

// ── Build particles ────────────────────────────────────────────────────────
// Key fix: render each letter on a CLEARED canvas and scan the ENTIRE
// canvas — no advance-width clipping, so side-bearing overhangs are captured.
function buildParticles(W: number, H: number): Particle[] {
  const WORD      = 'PRABHU'
  const FONT_SIZE = 190
  const SW        = 2200
  const SH        = 320
  const GAP       = 32    // extra gap between letters in render-px

  // One scratch canvas reused for every letter
  const off = document.createElement('canvas')
  off.width  = SW
  off.height = SH
  const oc = off.getContext('2d')!
  oc.font         = `400 ${FONT_SIZE}px 'DM Sans', 'Inter', sans-serif`
  oc.textBaseline = 'middle'
  oc.textAlign    = 'left'

  // Measure each letter's advance width
  const advances = WORD.split('').map(ch => oc.measureText(ch).width)
  const totalAdv = advances.reduce((s, w) => s + w, 0) + GAP * (WORD.length - 1)

  // Render-canvas x-origin for each letter (left-edge of advance)
  let cursor = SW / 2 - totalAdv / 2
  const letterX: number[] = WORD.split('').map((_, i) => {
    const x = cursor
    cursor += advances[i] + GAP
    return x
  })

  // Screen mapping: text spans desiredW pixels centred in viewport
  const desiredW      = clamp(W * 0.70, 400, 740)
  const scale         = desiredW / totalAdv
  const renderOriginX = SW / 2 - totalAdv / 2
  const screenOriginX = W  / 2 - desiredW  / 2

  const toScreen = (rx: number, ry: number) => ({
    x: screenOriginX + (rx - renderOriginX) * scale,
    y: H / 2         + (ry - SH / 2)        * scale,
  })

  const PER_LETTER = 150   // 900 particles total — enough density for clean letter shapes
  const all: Particle[] = []

  WORD.split('').forEach((ch, li) => {
    // Render ONLY this letter on a cleared canvas
    oc.clearRect(0, 0, SW, SH)
    oc.fillStyle = '#ffffff'
    oc.fillText(ch, letterX[li], SH / 2)

    // Sample the ENTIRE canvas at 1px step — no stride, no clipping.
    // This guarantees every pixel of every stroke (including thin diagonals
    // and curves) is in the pool before we stride-select from it.
    const { data } = oc.getImageData(0, 0, SW, SH)
    const hits: { rx: number; ry: number }[] = []

    for (let y = 1; y < SH - 1; y++)
      for (let x = 0; x < SW; x++)
        if (data[(y * SW + x) * 4 + 3] > 55)
          hits.push({ rx: x, ry: y })

    // Stride-sample for spatially even coverage
    const stride  = Math.max(1, Math.floor(hits.length / PER_LETTER))
    const sampled = hits.filter((_, i) => i % stride === 0).slice(0, PER_LETTER)

    sampled.forEach(h => {
      const { x: tx, y: ty } = toScreen(h.rx, h.ry)
      const sx  = Math.random() * W
      const sy  = Math.random() * H

      // Explosion: radially outward from its letter's centre on screen
      const letterCx = toScreen(letterX[li] + advances[li] / 2, SH / 2).x
      const letterCy = H / 2
      const ang = Math.atan2(ty - letterCy, tx - letterCx) + (Math.random() - 0.5) * 0.8
      const d   = 280 + Math.random() * Math.hypot(W, H) * 0.4

      all.push({
        sx, sy,
        tx, ty,
        ex: tx + Math.cos(ang) * d,
        ey: ty + Math.sin(ang) * d,
        x: sx, y: sy,
        vx: 0, vy: 0,
        r:        0.9 + Math.random() * 0.65,
        color:    PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha:    0,
        letter:   li,
        initDist: 0,  // set after drift
      })
    })
  })

  return all
}

// ── Render one glowing dot ─────────────────────────────────────────────────
function dot(ctx: CanvasRenderingContext2D, p: Particle, rMul = 1) {
  const a = clamp(p.alpha, 0, 1)
  if (a < 0.01) return
  ctx.save()
  ctx.globalAlpha = a
  ctx.shadowBlur  = p.r * 11
  ctx.shadowColor =
    p.color === '#ffffff' || p.color === '#f7f3ff'
      ? 'rgba(210,200,255,0.55)'
      : p.color
  ctx.fillStyle = p.color
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.r * rMul, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// ── Ambient glow behind the text ───────────────────────────────────────────
function drawGlow(ctx: CanvasRenderingContext2D, W: number, H: number, intensity = 1) {
  const cg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.5)
  cg.addColorStop(0, `rgba(124,58,237,${0.065 * intensity})`)
  cg.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = cg
  ctx.fillRect(0, 0, W, H)
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W   = window.innerWidth
    const H   = window.innerHeight
    canvas.width  = W
    canvas.height = H

    let raf: number
    type Phase = 'drift' | 'assemble' | 'hold' | 'explode' | 'done'
    let phase: Phase = 'drift'
    let phaseStart   = 0

    // Confirm DM Sans 400 loaded before sampling
    document.fonts.load(`400 190px 'DM Sans'`).then(() => {
      const particles = buildParticles(W, H)
      phaseStart = performance.now()

      const tick = (now: number) => {
        const elapsed = now - phaseStart
        ctx.clearRect(0, 0, W, H)

        // ── DRIFT ────────────────────────────────────────────────────────
        // Particles fade in at random screen positions and float gently
        if (phase === 'drift') {
          const t = Math.min(elapsed / T_DRIFT, 1)
          drawGlow(ctx, W, H, easeOut2(t))

          particles.forEach(p => {
            p.alpha = easeOut4(t) * 0.5
            p.x = p.sx + Math.sin(now * 0.0009 + p.sx * 0.009) * 8
            p.y = p.sy + Math.cos(now * 0.0007 + p.sy * 0.009) * 8
            dot(ctx, p)
          })

          if (t >= 1) {
            // Freeze drift positions as new scatter origins for spring start
            particles.forEach(p => {
              p.sx = p.x
              p.sy = p.y
              p.initDist = Math.max(1, Math.hypot(p.tx - p.x, p.ty - p.y))
            })
            phase = 'assemble'
            phaseStart = now
          }

        // ── ASSEMBLE ─────────────────────────────────────────────────────
        // Spring physics, letter by letter: P → R → A → B → H → U
        } else if (phase === 'assemble') {
          let allDone = true
          drawGlow(ctx, W, H, 1)

          particles.forEach(p => {
            const localT = elapsed - p.letter * LETTER_LAG

            if (localT <= 0) {
              // Letter not yet triggered — hold at scatter, very dim
              dot(ctx, p)
              allDone = false
              return
            }

            const dx   = p.tx - p.x
            const dy   = p.ty - p.y
            const dist = Math.hypot(dx, dy)

            if (dist < 0.45) {
              p.x = p.tx
              p.y = p.ty
              p.vx = 0
              p.vy = 0
            } else {
              allDone = false
              // Stiffness ramps as particle closes in → magnetic snap feel
              const prox = 1 - clamp(dist / 320, 0, 1)
              const k    = 0.05 + prox * 0.07
              const dm   = 0.76
              p.vx = (p.vx + dx * k) * dm
              p.vy = (p.vy + dy * k) * dm
              p.x += p.vx
              p.y += p.vy
            }

            // Fade in as it nears its target
            const progress = 1 - clamp(Math.hypot(p.tx - p.x, p.ty - p.y) / p.initDist, 0, 1)
            p.alpha = 0.12 + progress * 0.88
            dot(ctx, p)
          })

          if (allDone || elapsed > T_ASSEMBLE + 500) {
            particles.forEach(p => {
              p.x = p.tx; p.y = p.ty
              p.vx = 0; p.vy = 0
              p.alpha = 1
            })
            phase = 'hold'
            phaseStart = now
          }

        // ── HOLD ─────────────────────────────────────────────────────────
        // Breathing pulse + shimmer sweep left → right
        } else if (phase === 'hold') {
          const t      = clamp(elapsed / T_HOLD, 0, 1)
          const breath = 1 + Math.sin(t * Math.PI) * 0.11
          // Shimmer band sweeps across — starts just off left edge, ends just off right
          const shimX  = lerp(-(W * 0.15), W * 1.15, easeOut2(t))
          drawGlow(ctx, W, H, 1 + Math.sin(t * Math.PI) * 0.4)

          particles.forEach(p => {
            const prox  = clamp(1 - Math.abs(p.x - shimX) / 160, 0, 1)
            p.alpha     = lerp(0.88, 1, prox)
            dot(ctx, p, breath + prox * 0.65)
          })

          if (elapsed > T_HOLD) {
            phase = 'explode'
            phaseStart = now
          }

        // ── BURST ────────────────────────────────────────────────────────
        // Particles scatter radially outward and dissolve
        } else if (phase === 'explode') {
          const t  = clamp(elapsed / T_BURST, 0, 1)
          const te = easeIn3(t)
          const glowFade = 1 - t
          drawGlow(ctx, W, H, glowFade)

          particles.forEach(p => {
            p.x     = lerp(p.tx, p.ex, te)
            p.y     = lerp(p.ty, p.ey, te)
            p.alpha = 1 - easeIn3(clamp(t * 1.35, 0, 1))
            dot(ctx, p)
          })

          if (elapsed > T_BURST) {
            phase = 'done'
            setExiting(true)
            setTimeout(onComplete, 720)
          }
        }

        if (phase !== 'done') raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    })

    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999]"
      style={{ background: '#050507' }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={
        exiting
          ? { duration: 0.78, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  )
}
