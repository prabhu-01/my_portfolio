import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, MessageSquare, ArrowRight } from 'lucide-react'
import ScrambleText from './ScrambleText'
import MagneticButton from './MagneticButton'

export default function CTA() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="relative py-40 overflow-hidden">

      {/* Layered animated orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="grid-bg absolute inset-0 opacity-20" />

        {/* Central big glow */}
        <motion.div
          className="orb absolute"
          style={{
            width: 800, height: 800,
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(124,58,237,.24) 0%, transparent 65%)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Top-right accent */}
        <motion.div
          className="orb absolute"
          style={{
            width: 380, height: 380,
            top: -60, right: -60,
            background: 'radial-gradient(circle, rgba(34,211,238,.2) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        {/* Bottom-left */}
        <motion.div
          className="orb absolute"
          style={{
            width: 280, height: 280,
            bottom: 20, left: -40,
            background: 'radial-gradient(circle, rgba(244,114,182,.18) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-6 text-center" style={{ zIndex: 1 }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 origin-right"
            style={{ background: 'linear-gradient(to left, #A78BFA, transparent)' }}
          />
          <span className="section-label text-[#A78BFA]">Let's talk</span>
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 origin-left"
            style={{ background: 'linear-gradient(to right, #A78BFA, transparent)' }}
          />
        </motion.div>

        {/* Big headline */}
        <div className="mb-8 overflow-hidden">
          {["I'M EARLY.", 'INTENTIONAL.', 'WATCHING.'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="font-black tracking-tight leading-none block"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3rem, 9vw, 5.5rem)',
                  ...(i === 1
                    ? {
                        background: 'linear-gradient(135deg, #7C3AED, #A78BFA 40%, #22D3EE)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 50px rgba(124,58,237,0.4))',
                      }
                    : { color: '#fff' }),
                }}
              >
                <ScrambleText text={line} delay={i * 140} />
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-lg text-[#9CA3AF] leading-relaxed max-w-xl mx-auto mb-4">
            I'm selective about the conversations I have — and that's why the good ones go deep.{' '}
            <span className="text-white font-medium">
              If you're building something real, thinking hard about a problem, or looking for someone who'll engage honestly
            </span>{' '}
            — this is exactly the kind of conversation I want.
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed max-w-lg mx-auto">
            A half-formed idea, a hard problem, a contrarian take you want to pressure-test — bring it.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <MagneticButton>
            <a
              href="mailto:prabhubarik001@gmail.com"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden transition-all duration-300 shimmer-btn cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                boxShadow: '0 0 50px rgba(124,58,237,0.45), 0 8px 32px rgba(124,58,237,0.3)',
                fontFamily: 'var(--font-heading)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 70px rgba(124,58,237,0.6), 0 12px 40px rgba(124,58,237,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.45), 0 8px 32px rgba(124,58,237,0.3)'
              }}
            >
              <Rocket size={18} />
              Start a conversation
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="mailto:prabhubarik001@gmail.com?subject=Half-baked idea"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 cursor-pointer"
              style={{
                border: '1px solid rgba(34,211,238,0.3)',
                background: 'rgba(34,211,238,0.05)',
                color: '#22D3EE',
                fontFamily: 'var(--font-heading)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.6)'
                e.currentTarget.style.background = 'rgba(34,211,238,0.1)'
                e.currentTarget.style.boxShadow = '0 0 40px rgba(34,211,238,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'
                e.currentTarget.style.background = 'rgba(34,211,238,0.05)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <MessageSquare size={18} />
              Send a half-baked idea
            </a>
          </MagneticButton>
        </motion.div>

        {/* What I'm open to */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.68, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl px-8 py-6 max-w-lg mx-auto"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-xs font-mono text-[#4B5563] mb-4 uppercase tracking-widest">What I'm open to</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Founder conversations', color: '#A78BFA' },
              { label: 'Product feedback',       color: '#22D3EE' },
              { label: 'Consulting problems',    color: '#34D399' },
              { label: 'Weird ideas',            color: '#FBBF24' },
              { label: 'Hiring conversations',   color: '#F472B6' },
            ].map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.75 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-default"
                style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                whileHover={{ scale: 1.06, background: `${item.color}20` } as { scale: number; background: string }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                {item.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
