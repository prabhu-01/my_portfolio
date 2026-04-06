import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, Zap, Utensils, PawPrint, Lightbulb, Target, GitBranch, MessageSquare } from 'lucide-react'

const projects = [
  {
    id: 1,
    icon: Zap,
    accent: '#7C3AED',
    statusColor: '#22D3EE',
    status: 'SHIPPED',
    title: 'Payment Automation System',
    tagline: 'Built in 48 hours for a hackathon. Won. Then realised the problem was real.',
    tags: ['Automation', 'Fintech', 'B2B'],
    context: "This started as a hackathon idea but the problem we were solving is genuinely painful. Finance teams at mid-sized companies are drowning in manual reconciliation — copying numbers between systems, chasing approvals over email, fixing errors nobody spotted until month-end.",
    whatWeBuilt: "An end-to-end payment automation layer: bank API integration, approval routing logic, automated reconciliation, and a dashboard that shows finance teams exactly where every payment is and why. We built it in 48 hours. Rough, but it worked.",
    whatISawAfterwards: "The judges were impressed, but more interesting — one of the mentors pulled me aside and said 'we've been trying to solve this internally for two years'. That's when I knew it wasn't just a hackathon project.",
    hardPart: "The hardest part wasn't the tech. It was figuring out the approval logic — every company has different rules, exceptions, and edge cases. A generic solution doesn't fit. You'd need to build configurability in from the start.",
    architecture: ['Bank API Layer', 'Approval Engine', 'Reconciliation Module', 'Finance Dashboard'],
    whatNext: "If I were to take this further: SMB SaaS, $30-50/user/month, integration with Xero and QuickBooks. The moat would be the reconciliation logic — that's where the real time is saved.",
    metrics: { Built: '48 hours', Result: 'Hackathon win', Signal: 'Real problem confirmed' },
  },
  {
    id: 2,
    icon: Utensils,
    accent: '#22D3EE',
    statusColor: '#FBBF24',
    status: 'BUILDING',
    title: 'Kitchen Nutrition System',
    tagline: 'I was tracking my own macros and getting frustrated. That\'s usually where the real ideas come from.',
    tags: ['Health', 'Consumer', 'Habit'],
    context: "I'm serious about training. That means I track nutrition. Every app I tried treated food like a database query — scan barcode, log it, done. But cooking doesn't work like that. I make a chicken stir-fry with whatever's in the fridge. No barcode. No exact weights.",
    whatWeBuilt: "Designing a system that understands meals, not just ingredients. You tell it what you made — rough quantities, cooking method — and it figures out the nutrition. It learns your habits. It doesn't ask you to be a lab scientist.",
    whatISawAfterwards: "Talked to 20+ people who train seriously. The pattern: they all started tracking, most gave up within a month because it was too tedious, and the ones who stuck with it had simplified their meals to the point of boredom. That's a product failure.",
    hardPart: "The hard part is the edge cases in nutrition data — cooking changes nutritional values, portion estimation is inherently imprecise, and people lie to themselves about quantities. You have to design for approximate truth, not exact data.",
    architecture: ['Ingredient Intelligence', 'Meal Inference Engine', 'Habit Model', 'Progress Layer'],
    whatNext: "Freemium app with a coaching tier. The real business might actually be B2B — gym chains, nutrition coaches, corporate wellness programs that need something their clients will actually use.",
    metrics: { Status: 'Active design', Interviews: '20+ people', Insight: 'Friction kills habits' },
  },
  {
    id: 3,
    icon: PawPrint,
    accent: '#F472B6',
    statusColor: '#F472B6',
    status: 'CONCEPT',
    title: 'Pet Travel Platform',
    tagline: 'My friend tried to take her dog to Goa. Took 3 weeks of research just to book 4 nights.',
    tags: ['Marketplace', 'Travel', 'Consumer'],
    context: "Pet ownership in India (and globally) has exploded. But travel infrastructure hasn't caught up. 'Pet-friendly' on most booking sites means nothing — it might mean the hotel allows pets in theory but charges ₹3000 extra and puts you in the basement room.",
    whatWeBuilt: "A full product map: verified pet-friendly listings (with actual details — size limits, breed restrictions, pet facilities), a vet network for emergencies, community-driven reviews from pet owners, and an itinerary builder that accounts for your pet's needs.",
    whatISawAfterwards: "The more I dug in, the bigger it looked. The problem isn't just accommodation — it's the entire travel experience. Pet owners travel differently. They need rest stops, vet proximity, pet food availability, outdoor spaces. No platform thinks about this holistically.",
    hardPart: "The cold-start problem is brutal for a marketplace. You need supply and demand simultaneously. The wedge would be picking one city, building deep coverage there, and expanding. Probably start with Delhi or Bangalore.",
    architecture: ['Verified Listings', 'Vet Network', 'Community Reviews', 'Trip Planner'],
    whatNext: "Commission on bookings, premium membership for priority access and exclusive deals. Long-term: partnerships with pet food brands, insurance, and airlines (the pet cargo market is messy and needs fixing).",
    metrics: { Stage: 'Deep research', Opportunity: '$200B+ global TAM', Timing: 'Right now' },
  },
]

type Project = typeof projects[0]

function Card({ project: p, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = p.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
        style={{ border: open ? `1px solid ${p.accent}40` : '1px solid rgba(255,255,255,0.07)', boxShadow: open ? `0 0 40px ${p.accent}18` : 'none' }}
        onClick={() => setOpen(!open)}
      >
        {/* Header */}
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="p-3 rounded-xl flex-shrink-0 mt-0.5"
                   style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}30` }}>
                <Icon size={20} style={{ color: p.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-full"
                        style={{ color: p.statusColor, background: `${p.statusColor}15`, border: `1px solid ${p.statusColor}25` }}>
                    ● {p.status}
                  </span>
                  {p.tags.map(t => (
                    <span key={t} className="text-[9px] font-medium px-2 py-0.5 rounded-full text-[#4B5563]"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{p.title}</h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed italic">"{p.tagline}"</p>
              </div>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}
                        className="flex-shrink-0 p-2 rounded-xl text-[#4B5563] transition-all"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <ChevronDown size={16} />
            </motion.div>
          </div>

          <div className="flex gap-6 mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {Object.entries(p.metrics).map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#4B5563] mb-0.5">{k}</p>
                <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-7 pb-7" style={{ borderTop: `1px solid ${p.accent}20` }}>
                <div className="flex flex-col gap-4 mt-6">

                  {[
                    { icon: Lightbulb, color: p.accent,  label: 'What sparked it',        body: p.context         },
                    { icon: GitBranch, color: '#A78BFA',  label: 'What we actually built', body: p.whatWeBuilt     },
                    { icon: Target,    color: '#22D3EE',  label: 'What I saw afterwards',  body: p.whatISawAfterwards },
                    { icon: MessageSquare, color:'#F472B6',label: 'The hard part',          body: p.hardPart        },
                  ].map(b => {
                    const BIcon = b.icon
                    return (
                      <div key={b.label} className="rounded-xl p-5"
                           style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <BIcon size={13} style={{ color: b.color }} />
                          <span className="text-[10px] font-bold tracking-widest uppercase text-[#4B5563]">{b.label}</span>
                        </div>
                        <p className="text-sm text-[#9CA3AF] leading-relaxed">{b.body}</p>
                      </div>
                    )
                  })}

                  {/* System + next */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl p-5"
                         style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#4B5563] mb-3">How it's structured</p>
                      <div className="flex flex-wrap gap-2">
                        {p.architecture.map((item, i) => (
                          <div key={item} className="flex items-center gap-1.5">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-lg"
                                  style={{ color: p.accent, background: `${p.accent}12`, border: `1px solid ${p.accent}25` }}>
                              {item}
                            </span>
                            {i < p.architecture.length - 1 && <span className="text-xs text-[#4B5563]">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl p-5"
                         style={{ background: `${p.accent}08`, border: `1px solid ${p.accent}20` }}>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#4B5563] mb-3">If I took it further</p>
                      <p className="text-sm leading-relaxed" style={{ color: p.accent }}>{p.whatNext}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="orb" style={{ width: 400, height: 400, bottom: 0, left: -80, background: 'radial-gradient(circle, rgba(34,211,238,.2) 0%, transparent 70%)', opacity: .16 }} />
      </div>
      <div className="relative w-full max-w-5xl mx-auto px-6" style={{ zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #22D3EE)' }} />
            <span className="section-label text-[#22D3EE]">Work</span>
          </div>
          <h2 className="section-heading text-white mb-4">
            Things I've built,<br />
            <span className="text-gradient-cyan">thought through, and shipped.</span>
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-xl leading-relaxed">
            Not a portfolio of pretty screenshots. Click into any project — I'll show you the actual thinking, what surprised me, and what I'd do differently.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {projects.map((p, i) => <Card key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
