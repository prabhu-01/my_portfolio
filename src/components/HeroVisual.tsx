import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MapPin, Zap, BookOpen, Circle, Activity } from 'lucide-react'

const STACK = [
  { label: 'React',      color: '#61DAFB' },
  { label: 'Next.js',    color: '#ffffff' },
  { label: 'TypeScript', color: '#3B82F6' },
  { label: 'Node.js',    color: '#68A063' },
  { label: 'Python',     color: '#FFD43B' },
  { label: 'PostgreSQL', color: '#22D3EE' },
  { label: 'Redux',      color: '#A78BFA' },
  { label: 'MongoDB',    color: '#34D399' },
]

const BUILDS = [
  { name: 'AI Reconciliation Layer',  status: 'BUILDING',    dot: '#FBBF24' },
  { name: 'Meal-to-Macro Engine',     status: 'PROTOTYPING', dot: '#22D3EE' },
  { name: 'Pet Travel Marketplace',   status: 'CONCEPT',     dot: '#A78BFA' },
]

const CARD = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px   = useSpring(rawX, { stiffness: 50, damping: 18 })
  const py   = useSpring(rawY, { stiffness: 50, damping: 18 })

  const onMouseMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect()
    if (!r) return
    rawX.set((e.clientX - r.left - r.width  / 2) * 0.015)
    rawY.set((e.clientY - r.top  - r.height / 2) * 0.015)
  }
  const onLeave = () => { rawX.set(0); rawY.set(0) }

  const card = (delay: number, cls: string, children: React.ReactNode, style?: React.CSSProperties, posStyle?: React.CSSProperties) => (
    <motion.div
      className={`absolute ${cls}`}
      style={posStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl p-5 h-full" style={{ ...CARD, ...style }}>
        {children}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      style={{ height: 560, x: px, y: py }}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
    >

      {/* ── Card 1: Live status ── float-a */}
      <div className="float-a absolute" style={{ top: 0, left: 8, width: 252 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl p-5" style={{ ...CARD, border: '1px solid rgba(167,139,250,0.22)', boxShadow: '0 0 40px rgba(124,58,237,0.1)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" style={{ boxShadow: '0 0 8px #22D3EE' }} />
              <span className="text-[10px] font-mono text-[#4B5563] tracking-widest uppercase">Live status</span>
            </div>
            <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Analyst @ Deloitte</p>
            <p className="text-[#4B5563] text-xs">Bengaluru · Mercedes-Benz MBRDI</p>
            <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <MapPin size={11} className="text-[#4B5563]" />
              <span className="text-[11px] text-[#4B5563]">Bengaluru, Karnataka</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Card 2: Currently building ── float-b */}
      <div className="float-b absolute" style={{ top: 18, right: 0, width: 228 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl p-5" style={{ ...CARD, background: 'linear-gradient(135deg, rgba(124,58,237,0.13), rgba(34,211,238,0.07))', border: '1px solid rgba(167,139,250,0.25)', boxShadow: '0 0 50px rgba(124,58,237,0.13)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={12} className="text-[#A78BFA]" />
              <span className="text-[10px] font-mono text-[#A78BFA] tracking-widest uppercase">Building now</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {BUILDS.map(b => (
                <div key={b.name} className="flex items-start gap-2">
                  <Circle size={6} style={{ color: b.dot, fill: b.dot, flexShrink: 0, marginTop: 3 }} />
                  <span className="text-[11px] text-[#9CA3AF] leading-snug flex-1">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Card 3: Stack ── float-c */}
      <div className="float-c absolute" style={{ top: 185, left: 0, width: 286 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl p-5" style={{ ...CARD, border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[10px] font-mono text-[#4B5563] tracking-widest uppercase mb-3">Tech stack</p>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map((s, i) => (
                <motion.span
                  key={s.label}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                  style={{ color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}28` }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {s.label}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Card 4: Daily schedule ── float-d */}
      <div className="float-d absolute" style={{ top: 205, right: 4, width: 188 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl p-5" style={{ ...CARD, border: '1px solid rgba(34,211,238,0.18)' }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={11} className="text-[#22D3EE]" />
              <span className="text-[10px] font-mono text-[#22D3EE] tracking-widest uppercase">Today</span>
            </div>
            {[
              { time: '05:45', label: 'Up + training' },
              { time: '07:30', label: 'Deep work' },
              { time: '09:00', label: 'Deloitte' },
              { time: '19:00', label: 'Build + read' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[10px] font-mono text-[#4B5563] w-9 flex-shrink-0">{row.time}</span>
                <span className="text-[11px] text-[#9CA3AF]">{row.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Card 5: Actual traction ── float-e */}
      <div className="float-e absolute" style={{ bottom: 28, left: 16, width: 178 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl p-5" style={{ ...CARD, background: 'linear-gradient(135deg, rgba(34,211,238,0.09), rgba(124,58,237,0.09))', border: '1px solid rgba(34,211,238,0.2)', boxShadow: '0 0 30px rgba(34,211,238,0.07)' }}>
            <Activity size={14} className="text-[#22D3EE] mb-2" />
            <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>1,000+</p>
            <p className="text-[11px] text-[#4B5563] leading-snug">Real users on a product I built from scratch</p>
          </div>
        </motion.div>
      </div>

      {/* ── Card 6: Currently reading (unhinged) ── float-a reversed */}
      <div className="float-b absolute" style={{ bottom: 18, right: 8, width: 205 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl px-5 py-4" style={{ ...CARD, border: '1px solid rgba(251,191,36,0.22)' }}>
            <p className="text-[9px] font-mono text-[#FBBF24] tracking-widest uppercase mb-2">Currently reading</p>
            <p className="text-[12px] font-black text-white leading-snug mb-1" style={{ fontFamily: 'var(--font-heading)' }}>How to Get Rich</p>
            <p className="text-[10px] text-[#4B5563]">Naval Ravikant — not what you think</p>
          </div>
        </motion.div>
      </div>

      {/* ── Ambient glows ── */}
      <div className="absolute pointer-events-none" style={{ width: 280, height: 280, top: '25%', left: '35%', background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
      <div className="absolute pointer-events-none" style={{ width: 180, height: 180, bottom: '18%', right: '12%', background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)' }} />
    </motion.div>
  )
}
