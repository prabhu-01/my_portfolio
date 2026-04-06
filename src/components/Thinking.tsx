import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Filter, Scale, Repeat, ChevronRight } from 'lucide-react'
import ScrambleText from './ScrambleText'

const frameworks = [
  {
    id: 'validate',
    icon: Filter,
    color: '#A78BFA',
    title: 'How I validate ideas',
    tagline: "I've killed more ideas than I've built. That's not a failure — that's the process.",
    intro: "Most people fall in love with their idea before they know if it's real. I've learned to be suspicious of ideas I find exciting. The question isn't 'is this interesting?' — it's 'is this a real problem for a specific person who'd pay to fix it?'",
    steps: [
      { label: 'Write it as a problem statement, not a solution', desc: "Don't say 'I want to build a nutrition app'. Say 'people who train seriously abandon nutrition tracking because the friction is too high'. Now you can validate the problem without the product." },
      { label: 'Find 10 people who have this exact problem', desc: "Not your friends who politely nod. People who are actively frustrated by this right now. If you can't find 10, the market might be too thin." },
      { label: 'Listen for the workarounds', desc: "The best signal isn't 'yes this is a problem'. It's 'I built a spreadsheet to handle this' or 'I hired someone to do this manually'. Workarounds mean people care enough to suffer." },
      { label: 'Try to pre-sell before you build anything', desc: "Not a survey. Not a waitlist. An actual conversation where you ask someone to commit — money, time, a pilot. Their reaction tells you everything." },
      { label: 'Be honest about what disproves the idea', desc: "Decide upfront: what would make you kill this? Then look for that evidence. Most people only look for confirmation." },
    ],
    insight: "The best ideas survive being poked. If yours doesn't, better to know now.",
  },
  {
    id: 'systems',
    icon: Scale,
    color: '#22D3EE',
    title: 'How I think in systems',
    tagline: "Everything is a system. Understanding the system means you can change it — or break it deliberately.",
    intro: "I picked this up partly from work at Deloitte, partly from reading everything I could about how organisations and products actually function. When something isn't working, the problem is almost never where people think it is. It's usually upstream.",
    steps: [
      { label: 'Map the inputs and the intended output', desc: "Before fixing anything, understand what the system is supposed to produce and what it's currently producing. The gap between those two is your problem space." },
      { label: 'Follow the information, not the org chart', desc: "Where does information flow? Where does it get distorted, delayed, or dropped? That's where the real bottlenecks are — and it's rarely where leadership thinks." },
      { label: 'Find what breaks the system under load', desc: "Any system works fine at normal volume. Stress-test it. What happens when 10× the users show up? When the team doubles? When the assumptions change?" },
      { label: 'Look for the feedback loops', desc: "What reinforces good behaviour? What reinforces bad behaviour? Most broken systems have a feedback loop that's pointing in the wrong direction." },
      { label: 'Change one variable at a time', desc: "It sounds obvious. Nobody does it. Changing multiple things at once means you'll never know what actually worked." },
    ],
    insight: "If you can't draw the system on a whiteboard, you don't understand it well enough to fix it.",
  },
  {
    id: 'scale',
    icon: Repeat,
    color: '#F472B6',
    title: 'How I think about scale',
    tagline: "Scale isn't about technology. It's about what breaks when volume increases — and designing for that from the start.",
    intro: "I've watched enough Deloitte engagements to see what happens when things built for small scale get big. The assumptions baked into the design become liabilities. The things that were 'good enough' become catastrophic. Scale has to be designed for — not bolted on later.",
    steps: [
      { label: "Identify every human touch point", desc: "List everything that currently requires a person. Each one is a scaling bottleneck. Decide which ones must stay human (trust, judgment, exceptions) and which ones should be automated." },
      { label: 'Design the data layer first', desc: "Whatever you build, the data model will outlive everything else. If it's wrong, fixing it later is extraordinarily painful. I've seen it. Think about what you'll need to measure at 100× now." },
      { label: 'Build for async by default', desc: "Synchronous processes — things that require two parties to be available simultaneously — don't scale. Async-first design survives growth. It also forces clearer communication." },
      { label: 'What compounds?', desc: "The best businesses get stronger with time passively. More users → more data → better product → more users. Where's your compounding loop? If there isn't one, that's a problem worth solving." },
      { label: 'What does a 10× failure look like?', desc: "If you had 10× the users tomorrow, what would break first? Design for that now. Not perfectly — but enough that it won't be catastrophic." },
    ],
    insight: "The decisions you make at 10 users set the ceiling for what's possible at 10,000.",
  },
]

export default function Thinking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(frameworks[0].id)
  const current = frameworks.find(f => f.id === active)!
  const CIcon = current.icon

  return (
    <section id="thinking" ref={ref} className="relative py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orb" style={{ width: 500, height: 500, top: 80, right: 0, background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)', opacity: .12 }} />
      </div>
      <div className="relative w-full max-w-6xl mx-auto px-6" style={{ zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #F472B6)' }} />
            <span className="section-label text-[#F472B6]">How I think</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            <ScrambleText text="Mental models I" /><br />
            <ScrambleText text="actually use." className="text-gradient-pink" delay={120} />
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            These aren't frameworks I read about. They're patterns I've developed through doing things wrong, watching things fail, and trying to understand why.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-col gap-3"
          >
            {frameworks.map(fw => {
              const FIcon = fw.icon
              const isActive = active === fw.id
              return (
                <button
                  key={fw.id}
                  onClick={() => setActive(fw.id)}
                  className="glass text-left p-5 rounded-2xl transition-all duration-300 relative"
                  style={{ border: isActive ? `1px solid ${fw.color}40` : '1px solid rgba(255,255,255,0.07)', background: isActive ? `${fw.color}08` : undefined, boxShadow: isActive ? `0 0 24px ${fw.color}12` : undefined }}
                >
                  {isActive && <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full" style={{ background: fw.color }} />}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl transition-all"
                           style={{ background: isActive ? `${fw.color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? fw.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                        <FIcon size={14} style={{ color: isActive ? fw.color : '#4B5563' }} />
                      </div>
                      <span className="text-sm font-bold leading-snug text-left" style={{ fontFamily: 'var(--font-heading)', color: isActive ? '#fff' : '#9CA3AF' }}>
                        {fw.title.replace('How I ', '')}
                      </span>
                    </div>
                    <ChevronRight size={13} style={{ color: isActive ? fw.color : '#4B5563', transform: isActive ? 'rotate(90deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }} />
                  </div>
                </button>
              )
            })}
          </motion.div>

          {/* Detail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-8"
                style={{ border: `1px solid ${current.color}20`, background: `${current.color}04` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl flex-shrink-0" style={{ background: `${current.color}18`, border: `1px solid ${current.color}30` }}>
                    <CIcon size={22} style={{ color: current.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{current.title}</h3>
                    <p className="text-sm text-[#9CA3AF] italic">"{current.tagline}"</p>
                  </div>
                </div>

                <p className="text-sm text-[#9CA3AF] leading-relaxed mb-7 pl-1 border-l-2" style={{ borderColor: `${current.color}40`, paddingLeft: 12 }}>
                  {current.intro}
                </p>

                <div className="flex flex-col gap-4 mb-7">
                  {current.steps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-transform group-hover:scale-110"
                             style={{ color: current.color, borderColor: `${current.color}40`, background: `${current.color}10` }}>
                          {i + 1}
                        </div>
                        {i < current.steps.length - 1 && <div className="w-px mt-2" style={{ height: 20, background: `${current.color}20` }} />}
                      </div>
                      <div className="pb-1">
                        <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{step.label}</p>
                        <p className="text-xs text-[#4B5563] leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: `${current.color}10`, border: `1px solid ${current.color}25` }}>
                  <ArrowRight size={14} style={{ color: current.color, flexShrink: 0 }} />
                  <span className="text-sm font-semibold italic" style={{ color: current.color }}>{current.insight}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
