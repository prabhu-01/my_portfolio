import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socials = [
  { Icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/prabhubarik' },
  { Icon: GitHubIcon,   label: 'GitHub',   href: 'https://github.com/prabhubarik'      },
  { Icon: XIcon,        label: 'Twitter',  href: 'https://twitter.com/prabhubarik'     },
]

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      {/* Top border with gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), rgba(34,211,238,0.15), transparent)' }}
      />

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <motion.div
            className="flex flex-col items-center sm:items-start gap-1"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <a href="#" className="group">
              <span
                className="text-2xl font-black text-white transition-all duration-300 group-hover:text-gradient-purple"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                PRABHU
              </span>
            </a>
            <span className="text-xs text-[#4B5563] font-mono">Built with intention · {new Date().getFullYear()}</span>
          </motion.div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl text-[#4B5563] transition-all duration-250 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)'
                  e.currentTarget.style.color = '#A78BFA'
                  e.currentTarget.style.background = 'rgba(167,139,250,0.08)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.color = '#4B5563'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs text-[#4B5563]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse"
              style={{ boxShadow: '0 0 6px #22D3EE' }}
            />
            Open to opportunities
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-[10px] text-[#4B5563] font-mono">Designed & developed with intention. No templates.</p>
          <motion.a
            href="#"
            className="flex items-center gap-1.5 text-[10px] font-mono group transition-colors duration-200 cursor-pointer"
            style={{ color: '#4B5563' }}
            whileHover={{ y: -2 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#A78BFA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
          >
            Back to top
            <ArrowUpRight
              size={10}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
