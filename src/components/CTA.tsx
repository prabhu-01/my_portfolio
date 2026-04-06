import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, MessageSquare, ArrowRight } from 'lucide-react'
import ScrambleText from './ScrambleText'
import MagneticButton from './MagneticButton'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="relative py-40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="grid-bg absolute inset-0 opacity-20" />
        <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(124,58,237,.28) 0%, transparent 70%)' }} />
        <div className="orb" style={{ width: 350, height: 350, top: 0, right: -80, background: 'radial-gradient(circle, rgba(34,211,238,.2) 0%, transparent 70%)', opacity: .18 }} />
      </div>

      <div className="relative w-full max-w-4xl mx-auto px-6 text-center" style={{ zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #A78BFA)' }} />
          <span className="section-label text-[#A78BFA]">Let's talk</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #A78BFA)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h2
            className="font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 9vw, 5.5rem)', lineHeight: 0.95 }}
          >
            <ScrambleText text="I'M EARLY." /><br />
            <ScrambleText
              text="INTENTIONAL."
              delay={120}
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA 40%, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.35))', display: 'inline-block' }}
            /><br />
            <ScrambleText text="WATCHING." delay={240} />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-lg text-[#9CA3AF] leading-relaxed max-w-xl mx-auto mb-4">
            I'm selective about the conversations I have — and that's why the good ones go deep.{' '}
            <span className="text-white font-medium">If you're building something real, thinking hard about a problem, or looking for someone who'll engage honestly</span>{' '}
            — this is exactly the kind of conversation I want.
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed max-w-lg mx-auto">
            A half-formed idea, a hard problem, a contrarian take you want to pressure-test — bring it. I'd rather have one real conversation than a hundred surface-level ones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <MagneticButton>
            <a
              href="mailto:prabhu@example.com"
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', boxShadow: '0 0 40px rgba(124,58,237,0.4)', fontFamily: 'var(--font-heading)' }}
            >
              <Rocket size={18} />
              Start a conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:prabhu@example.com?subject=Half-baked idea"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 text-[#22D3EE]"
              style={{ border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.05)', fontFamily: 'var(--font-heading)' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(34,211,238,0.6)'; el.style.boxShadow = '0 0 30px rgba(34,211,238,0.2)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(34,211,238,0.3)'; el.style.boxShadow = 'none' }}
            >
              <MessageSquare size={18} />
              Send a half-baked idea
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.7 }}
          className="glass rounded-2xl px-8 py-6 max-w-lg mx-auto"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs font-mono text-[#4B5563] mb-4 uppercase tracking-widest">What I'm open to</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Founder conversations',  color: '#A78BFA' },
              { label: 'Product feedback',        color: '#22D3EE' },
              { label: 'Consulting problems',     color: '#34D399' },
              { label: 'Weird ideas',             color: '#FBBF24' },
              { label: 'Hiring conversations',    color: '#F472B6' },
            ].map(item => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
