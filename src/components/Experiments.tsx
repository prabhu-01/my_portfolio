import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FlaskConical, Brain, Globe, Dumbbell, ChefHat, Cpu, BookMarked } from 'lucide-react'
import ScrambleText from './ScrambleText'

const experiments = [
  {
    icon: Cpu,
    title: 'AI reconciliation layer',
    status: 'HALF-BUILT',
    statusColor: '#FBBF24',
    type: 'Technical',
    accent: '#A78BFA',
    chaos: 4,
    tags: ['AI', 'Fintech'],
    desc: "After the hackathon, I kept poking at the reconciliation problem. The hypothesis: an LLM that understands accounting logic could catch errors that rules-based systems miss. Still figuring out if the latency is acceptable.",
  },
  {
    icon: ChefHat,
    title: 'Meal-to-macro inference',
    status: 'PROTOTYPING',
    statusColor: '#22D3EE',
    type: 'ML / Product',
    accent: '#22D3EE',
    chaos: 5,
    tags: ['Nutrition', 'ML'],
    desc: "The core engine for the nutrition system. If you describe a meal in natural language, can we estimate macros within ±15%? Turns out GPT-4 is surprisingly decent at this. The hard part is calibrating for cooking methods.",
  },
  {
    icon: Globe,
    title: 'Pet-friendly listing scraper',
    status: 'RUNNING',
    statusColor: '#34D399',
    type: 'Research Tool',
    accent: '#34D399',
    chaos: 2,
    tags: ['Travel', 'Data'],
    desc: "Built a scraper to pull 'pet-friendly' listings from major booking platforms and categorise the actual terms. Finding: 60%+ of listings are misleading. That data is the seed of the marketplace.",
  },
  {
    icon: Brain,
    title: 'Personal knowledge graph',
    status: 'ONGOING',
    statusColor: '#F472B6',
    type: 'Personal Infra',
    accent: '#F472B6',
    chaos: 3,
    tags: ['PKM', 'Obsidian'],
    desc: "Everything I read, every project, every conversation — linked and tagged in Obsidian. The goal is to be able to pull relevant context on any topic in under 60 seconds. It's changed how I think and write significantly.",
  },
  {
    icon: BookMarked,
    title: 'Annual reading → action system',
    status: 'LIVE',
    statusColor: '#A78BFA',
    type: 'Habit System',
    accent: '#A78BFA',
    chaos: 1,
    tags: ['Reading', 'Systems'],
    desc: "I read 25+ books a year. The system: book → highlight → weekly review → monthly synthesis → linked note in graph. Nothing goes in unless I can explain how I'll use it. Retention went from ~10% to closer to 60%.",
  },
  {
    icon: Dumbbell,
    title: 'Training + nutrition protocol',
    status: 'ITERATING',
    statusColor: '#22D3EE',
    type: 'Biohacking',
    accent: '#22D3EE',
    chaos: 3,
    tags: ['Fitness', 'Performance'],
    desc: "Current stack: 4× strength training, 2× Zone 2 cardio, creatine + protein + magnesium. Tracking HRV to measure recovery. I run this like an n=1 experiment — changing one variable per 4-week block.",
  },
]

function Chaos({ level }: { level: number }) {
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-1 rounded-full" style={{ height: 6 + i * 3, background: i < level ? '#A78BFA' : 'rgba(255,255,255,0.08)' }} />
      ))}
    </div>
  )
}

export default function Experiments() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experiments" ref={ref} className="relative py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orb" style={{ width: 600, height: 600, top: 0, right: 0, background: 'radial-gradient(circle, rgba(34,211,238,.2) 0%, transparent 70%)', opacity: .11 }} />
        <div className="orb" style={{ width: 400, height: 400, bottom: 80, left: -80, background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)', opacity: .11 }} />
      </div>
      <div className="relative w-full max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #FBBF24)' }} />
            <span className="section-label text-[#FBBF24]">Currently running</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            <ScrambleText text="Things in my lab" /><br />
            <ScrambleText
              text="right now."
              delay={120}
              style={{ background: 'linear-gradient(135deg, #FBBF24, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            />
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            Some of these will become products. Most won't. All of them are teaching me something. The chaos meter shows how far from done we are.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <FlaskConical size={14} className="text-[#FBBF24]" />
            <span className="text-sm text-[#9CA3AF]">
              <span className="text-white font-medium">{experiments.length} active threads</span> across products, systems, and personal experiments
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiments.map((exp, i) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-6 relative cursor-default"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                     style={{ background: `radial-gradient(circle at 50% 0%, ${exp.accent}12, transparent 70%)`, border: `1px solid ${exp.accent}20` }} />

                <div className="relative flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl" style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}25` }}>
                    <Icon size={18} style={{ color: exp.accent }} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 rounded-full"
                          style={{ color: exp.statusColor, background: `${exp.statusColor}12`, border: `1px solid ${exp.statusColor}25` }}>
                      {exp.status}
                    </span>
                    <span className="text-[9px] font-mono text-[#4B5563]">{exp.type}</span>
                  </div>
                </div>

                <h3 className="relative text-base font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{exp.title}</h3>
                <p className="relative text-xs text-[#9CA3AF] leading-relaxed mb-5">{exp.desc}</p>

                <div className="relative flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(t => (
                      <span key={t} className="text-[9px] text-[#4B5563] px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(255,255,255,0.04)' }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[8px] font-mono text-[#4B5563]">CHAOS</span>
                    <Chaos level={exp.chaos} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
