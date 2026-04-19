import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const dotX  = useMotionValue(-100)
  const dotY  = useMotionValue(-100)
  const rawX  = useMotionValue(-100)
  const rawY  = useMotionValue(-100)

  const ringX     = useSpring(rawX,  { stiffness: 450, damping: 32, mass: 0.35 })
  const ringY     = useSpring(rawY,  { stiffness: 450, damping: 32, mass: 0.35 })
  const ringScale = useSpring(1,     { stiffness: 300, damping: 22 })
  const ringOpacity = useSpring(0.55, { stiffness: 300, damping: 22 })

  const rafRef = useRef<number>(0)

  useEffect(() => {
    let latest = { x: -100, y: -100 }

    const onMove = (e: MouseEvent) => {
      latest = { x: e.clientX, y: e.clientY }
    }

    const tick = () => {
      dotX.set(latest.x - 4)
      dotY.set(latest.y - 4)
      rawX.set(latest.x - 18)
      rawY.set(latest.y - 18)
      rafRef.current = requestAnimationFrame(tick)
    }

    // Scale up cursor ring over interactive elements
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [role="button"], .cursor-pointer, label')) {
        ringScale.set(1.75)
        ringOpacity.set(0.8)
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, [role="button"], .cursor-pointer, label')) {
        ringScale.set(1)
        ringOpacity.set(0.55)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover',  onOver,  { passive: true })
    document.addEventListener('mouseout',   onOut,   { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [dotX, dotY, rawX, rawY, ringScale, ringOpacity])

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="cursor-dot"
        style={{ left: dotX, top: dotY }}
      />

      {/* Ring — spring follow with scale on hover */}
      <motion.div
        className="cursor-ring"
        style={{
          left:    ringX,
          top:     ringY,
          scale:   ringScale,
          opacity: ringOpacity,
        }}
      />
    </>
  )
}
