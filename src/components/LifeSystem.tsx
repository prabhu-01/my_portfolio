import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sun, Dumbbell, BookOpen, Briefcase, Moon, Coffee, Repeat, TrendingUp } from 'lucide-react'
import ScrambleText from './ScrambleText'

const schedule = [
  { time: '05:45', icon: Sun,       color: '#FBBF24', label: 'Up before the city', note: 'No alarm lately. The routine has its own gravity now.'           },
  { time: '06:00', icon: Dumbbell,  color: '#F472B6', label: 'Training',            note: '4× strength, 2× Zone 2 per week. This is not negotiable.'        },
  { time: '07:30', icon: Coffee,    color: '#A78BFA', label: 'Deep work block',     note: 'First coffee. Work on the most important thing before email.'      },
  { time: '09:00', icon: Briefcase, color: '#22D3EE', label: 'Deloitte',            note: 'Client work, internal projects, learning enterprise from inside.'  },
  { time: '19:00', icon: BookOpen,  color: '#34D399', label: 'Reading + processing',note: '45 min minimum. Book, article, or a paper. Then notes into graph.' },
  { time: '21:30', icon: Moon,      color: '#818CF8', label: 'Wind down',           note: 'Review the day. Write tomorrow\'s priority. Screens off by 22:00.' },
]

const principles = [
  {
    icon: Repeat,
    color: '#A78BFA',
    title: "I don't rely on motivation",
    desc: "Motivation is unreliable. I've built systems that run regardless of how I feel. The training happens. The reading happens. The deep work block happens. I designed my environment so that the default action is the right action.",
    items: ['Fixed schedule blocks', 'No decisions before 9am', 'Default to done'],
  },
  {
    icon: TrendingUp,
    color: '#22D3EE',
    title: 'Everything compounds',
    desc: "I'm playing a long game. Each book connects to something else. Each project teaches something that makes the next one better. Each conversation with a smart person opens a door. I think about 10-year returns on daily investments.",
    items: ['Knowledge graph links ideas', 'Projects inform each other', 'Relationships built slowly'],
  },
  {
    icon: Briefcase,
    color: '#34D399',
    title: 'Deloitte is research, not just a job',
    desc: "I pay close attention at work. How do large organisations make decisions? Where do things break down? What do clients actually need vs. what they say they need? Every engagement teaches me something I can use when I build.",
    items: ['Stakeholder dynamics', 'What enterprise actually buys', 'How change actually happens'],
  },
]

export default function LifeSystem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="life" ref={ref} className="relative py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orb" style={{ width: 400, height: 400, top: 80, left: 0, background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)', opacity: .12 }} />
      </div>
      <div className="relative w-full max-w-6xl mx-auto px-6" style={{ zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #34D399)' }} />
            <span className="section-label text-[#34D399]">How I operate</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            <ScrambleText text="The infrastructure" /><br />
            <ScrambleText text="behind the work." className="text-gradient-green" delay={120} />
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            Output is a lagging indicator. What actually matters is the daily input — the reading, the training, the thinking. I've spent two years designing that layer deliberately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Schedule */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="glass rounded-2xl p-7" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-bold uppercase tracking-widest font-mono text-[#4B5563] mb-1">A TYPICAL DAY</p>
              <p className="text-xs text-[#4B5563] mb-7">Give or take. It's a guide, not a prison.</p>
              <div className="relative">
                <div className="absolute" style={{ left: 52, top: 16, bottom: 16, width: 1, background: 'linear-gradient(to bottom, #FBBF24, #A78BFA, rgba(129,140,248,.1))' }} />
                <div className="flex flex-col gap-5">
                  {schedule.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.time}
                        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                        className="flex items-start gap-4 group"
                      >
                        <span className="flex-shrink-0 text-right font-mono text-[#4B5563] text-[10px] pt-2" style={{ width: 44 }}>{item.time}</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative mt-0.5 transition-transform duration-300 group-hover:scale-110"
                             style={{ zIndex: 1, background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                          <Icon size={14} style={{ color: item.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{item.label}</p>
                          <p className="text-xs text-[#4B5563] mt-0.5 leading-relaxed">{item.note}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Principles */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}
                      className="flex flex-col gap-4">
            {principles.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}>
                      <Icon size={18} style={{ color: p.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.items.map(it => (
                          <span key={it} className="text-[10px] font-medium px-2 py-1 rounded-lg"
                                style={{ color: p.color, background: `${p.color}10`, border: `1px solid ${p.color}20` }}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
