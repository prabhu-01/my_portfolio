import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number // 0–1, default 0.3
}

export default function MagneticButton({ children, className = '', style, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 280, damping: 28, mass: 0.6 })
  const y = useSpring(0, { stiffness: 280, damping: 28, mass: 0.6 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'flex', alignItems: 'center', ...style }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
