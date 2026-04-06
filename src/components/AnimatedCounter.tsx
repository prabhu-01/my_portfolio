import { useEffect, useRef, useState } from 'react'
import { useInView, animate, motion } from 'framer-motion'

interface Props {
  value: string   // e.g. "2y+", "3", "∞"
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedCounter({ value, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  const startedRef = useRef(false)

  const isInfinity = value === '∞'
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView || startedRef.current || isInfinity) return
    startedRef.current = true

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setDisplay(String(Math.round(v))),
    })
    return () => controls.stop()
  }, [inView, target, isInfinity])

  if (isInfinity) {
    return (
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={className}
        style={style}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        ∞
      </motion.span>
    )
  }

  return (
    <span ref={ref} className={className} style={style}>
      {display}{suffix}
    </span>
  )
}
