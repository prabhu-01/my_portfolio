import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number // ms
}

/**
 * Smooth reveal on viewport entry.
 * Animates the whole line as a unit (opacity + y lift) so gradient text,
 * shimmer classes, and inline-styles all render perfectly throughout.
 */
export default function ScrambleText({ text, className, style, delay = 0 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {text}
    </motion.span>
  )
}
