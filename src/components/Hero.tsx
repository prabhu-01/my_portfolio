import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Zap } from 'lucide-react'
import HeroVisual from './HeroVisual'
import MagneticButton from './MagneticButton'
import AnimatedCounter from './AnimatedCounter'
import ScrambleText from './ScrambleText'

const headline = ['I BUILD THINGS', "THAT SHOULDN'T", 'WORK. BUT DO.']

const stats = [
  { value: '1y+', label: 'At Deloitte'     },
  { value: '3',   label: 'Products scoped' },
  { value: '∞',   label: 'Still curious'   },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="grid-bg absolute inset-0 opacity-50" />

        {/* Primary purple glow */}
        <motion.div
          className="orb absolute"
          style={{
            width: 750, height: 750,
            top: -150, left: -220,
            background: 'radial-gradient(circle, rgba(124,58,237,.32) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cyan bottom-right glow */}
        <motion.div
          className="orb absolute"
          style={{
            width: 480, height: 480,
            bottom: 0, right: 30,
            background: 'radial-gradient(circle, rgba(34,211,238,.22) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Pink mid glow */}
        <motion.div
          className="orb absolute"
          style={{
            width: 320, height: 320,
            top: '40%', left: '45%',
            background: 'radial-gradient(circle, rgba(244,114,182,.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-8">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-fit"
            >
              <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(167,139,250,0.22)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.1)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" style={{ boxShadow: '0 0 10px #22D3EE' }} />
                <span className="text-xs font-medium text-[#9CA3AF] tracking-wide">Analyst @ Deloitte</span>
                <span className="text-[#4B5563]">·</span>
                <span className="text-xs font-medium text-[#A78BFA]">Building on the side</span>
              </div>
            </motion.div>

            {/* Headline — clip-path reveal per line */}
            <div className="flex flex-col gap-1">
              {headline.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.3 + i * 0.13, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1
                      className="font-black tracking-tight leading-none"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
                    >
                      {i === 1
                        ? <ScrambleText text={line} className="text-shimmer" delay={600} />
                        : <span className="text-white">{line}</span>
                      }
                    </h1>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg leading-relaxed max-w-md text-[#9CA3AF]"
            >
              Analyst at Deloitte by day. Builder, systems-thinker, and future founder by night.{' '}
              <span className="text-white font-medium">
                I get obsessed with problems that seem too chaotic to solve — and then solve them.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="group relative flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 cursor-pointer shimmer-btn"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                    boxShadow: '0 0 40px rgba(124,58,237,0.45), 0 8px 24px rgba(124,58,237,0.25)',
                    fontFamily: 'var(--font-heading)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.6), 0 12px 32px rgba(124,58,237,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.45), 0 8px 24px rgba(124,58,237,0.25)'
                  }}
                >
                  <Zap size={15} />
                  See What I'm Building
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="flex items-center px-6 py-3.5 rounded-xl text-sm font-bold text-[#9CA3AF] transition-all duration-300 cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-heading)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.color = '#fff'
                    el.style.borderColor = 'rgba(167,139,250,0.45)'
                    el.style.background = 'rgba(124,58,237,0.1)'
                    el.style.boxShadow = '0 0 20px rgba(124,58,237,0.2)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.color = '#9CA3AF'
                    el.style.borderColor = 'rgba(255,255,255,0.12)'
                    el.style.background = 'transparent'
                    el.style.boxShadow = 'none'
                  }}
                >
                  Let's Talk
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="flex gap-10 pt-2"
            >
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.1, duration: 0.5 }}
                >
                  <AnimatedCounter
                    value={value}
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  />
                  <span className="text-xs text-[#4B5563] font-medium mt-0.5">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D card cluster */}
          <div className="relative hidden lg:block">
            <HeroVisual />
          </div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} className="text-[#4B5563]" />
        </motion.div>
        <span className="text-[10px] font-mono text-[#4B5563] tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  )
}
