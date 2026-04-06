import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Cpu, Brain, Flame } from 'lucide-react'
import ScrambleText from './ScrambleText'

const layers = [
  {
    icon: Briefcase,
    title: 'Analyst at Deloitte',
    tag: 'DAY JOB',
    color: '#A78BFA',
    desc: "I work on real enterprise problems — process design, stakeholder management, translating what a client says they want into what they actually need. It's taught me how organisations actually make decisions. That's priceless.",
  },
  {
    icon: Cpu,
    title: 'Product Builder',
    tag: 'SIDE WORK',
    color: '#22D3EE',
    desc: "React, Next.js, Node.js, Python — I reach for whatever gets the idea out fastest. I've been prototyping seriously for a few years now. Not side-project energy — more like: what would this look like if real people depended on it?",
  },
  {
    icon: Brain,
    title: 'Systems Thinker',
    tag: 'HOW I OPERATE',
    color: '#F472B6',
    desc: "I map everything. Revenue models, user flows, org structures, my own habits. Once you see the levers in a system, you stop guessing and start pulling the right ones. This is the skill I'm most proud of.",
  },
  {
    icon: Flame,
    title: 'Obsessive Learner',
    tag: 'ALWAYS',
    color: '#34D399',
    desc: "Nutrition science. Behavioral economics. How Notion was built. Why Airbnb's early growth worked. I consume things that shouldn't be related and find the thread. That's usually where the interesting ideas live.",
  },
]

const timeline = [
  {
    year: '2021',
    title: 'CS at VIT — and got serious',
    desc: "Started B.Tech in Computer Science at VIT. Stopped treating code as a subject and started treating it as a tool. The shift from studying to building happened fast.",
    now: false,
  },
  {
    year: '2022',
    title: 'Built first thing',
    desc: "A rough web tool — imperfect, but shipped. That feeling of having made something real from nothing got me immediately. I've been building ever since.",
    now: false,
  },
  {
    year: '2023',
    title: 'First real product role',
    desc: "React Developer at Squibix Digital. Built scalable dashboards and a live quiz platform used by 1,000+ employees. Learned what it means to build for real users under real constraints.",
    now: false,
  },
  {
    year: '2024',
    title: 'Started thinking like a founder',
    desc: "Stopped building for the sake of it. Started asking: does this solve a real problem? Would someone pay for this? Who exactly? Graduated from VIT with a CGPA of 8.8.",
    now: false,
  },
  {
    year: '2025',
    title: 'Joined Deloitte as Analyst',
    desc: "Seeing how enterprise decisions happen — at scale, with real stakes — changes how you think about everything. Best research I could have asked for.",
    now: true,
  },
  {
    year: '2026→',
    title: 'Something is forming',
    desc: "The ideas are sharper. The conviction is stronger. I know what I'm building toward — and every week the picture gets clearer.",
    now: false,
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orb" style={{ width: 500, height: 500, top: 80, right: -160, background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)', opacity: .16 }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6" style={{ zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #A78BFA)' }} />
            <span className="section-label text-[#A78BFA]">Who I am</span>
          </div>
          <h2 className="section-heading text-white mb-5">
            <ScrambleText text="Not a developer who does" /><br />
            <ScrambleText text="strategy on the side." className="text-gradient-purple" delay={120} />
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-lg leading-relaxed">
            I operate at the intersection of consultant, builder, and systems thinker. Most people pick a lane. I've decided the intersection <span className="text-white font-medium">is</span> the point — it's where the interesting problems live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Layers */}
          <div className="flex flex-col gap-4">
            {layers.map((l, i) => {
              const Icon = l.icon
              return (
                <motion.div
                  key={l.title}
                  initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card group relative p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl flex-shrink-0 mt-0.5"
                         style={{ background: `${l.color}18`, border: `1px solid ${l.color}30` }}>
                      <Icon size={17} style={{ color: l.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-full"
                              style={{ color: l.color, background: `${l.color}18`, border: `1px solid ${l.color}30` }}>
                          {l.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{l.title}</h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">{l.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: l.color }} />
                </motion.div>
              )
            })}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-32">
              <div className="glass rounded-2xl p-8" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest font-mono text-[#4B5563] mb-8">THE STORY SO FAR</p>

                <div className="relative">
                  <div className="absolute" style={{ left: 16, top: 16, bottom: 16, width: 1, background: 'linear-gradient(to bottom, #7C3AED, #A78BFA, rgba(167,139,250,0.08))' }} />

                  <div className="flex flex-col gap-8">
                    {timeline.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        className="relative" style={{ paddingLeft: 48 }}
                      >
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center"
                             style={{
                               background: item.now ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)',
                               border: item.now ? '1px solid #A78BFA' : '1px solid rgba(255,255,255,0.1)',
                               boxShadow: item.now ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
                             }}>
                          <div className="w-2 h-2 rounded-full" style={{ background: item.now ? '#A78BFA' : '#4B5563' }} />
                        </div>
                        <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                          <span className="text-xs font-mono font-bold" style={{ color: item.now ? '#A78BFA' : '#4B5563' }}>{item.year}</span>
                          <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)', color: item.now ? '#fff' : '#9CA3AF' }}>{item.title}</span>
                          {item.now && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse"
                                  style={{ color: '#22D3EE', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                              NOW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4B5563] leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
