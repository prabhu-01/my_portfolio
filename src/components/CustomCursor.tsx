import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // Dot follows mouse with zero lag — direct assignment
  const dotX  = useMotionValue(-100)
  const dotY  = useMotionValue(-100)

  // Ring has a short, tight trail
  const rawX  = useMotionValue(-100)
  const rawY  = useMotionValue(-100)
  const ringX = useSpring(rawX, { stiffness: 500, damping: 35, mass: 0.4 })
  const ringY = useSpring(rawY, { stiffness: 500, damping: 35, mass: 0.4 })

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

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [dotX, dotY, rawX, rawY])

  return (
    <>
      <motion.div className="cursor-dot"  style={{ left: dotX,  top: dotY  }} />
      <motion.div className="cursor-ring" style={{ left: ringX, top: ringY }} />
    </>
  )
}
