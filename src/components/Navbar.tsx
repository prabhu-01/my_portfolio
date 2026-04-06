import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#projects',     label: 'Work'        },
  { href: '#experiments',  label: 'Experiments' },
  { href: '#thinking',     label: 'Ideas'       },
  { href: '#contact',      label: 'Contact'     },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[900] px-4 sm:px-6 py-4"
    >
      {/* Inner pill */}
      <div
        className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
        style={{
          background:    scrolled ? 'rgba(5,5,7,0.88)' : 'transparent',
          backdropFilter:scrolled ? 'blur(20px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          border:        scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          boxShadow:     scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#" className="group flex flex-col leading-none select-none">
          <span className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}>
            PRABHU
          </span>
          <span className="text-[9px] font-medium tracking-[0.25em] uppercase mt-0.5 transition-colors duration-200 text-[#4B5563] group-hover:text-[#A78BFA]">
            build • think • scale
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors duration-200 group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #A78BFA, #22D3EE)' }} />
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            style={{
              border: '1px solid rgba(167,139,250,0.3)',
              fontFamily: 'var(--font-heading)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = '#A78BFA'
              el.style.background  = 'rgba(124,58,237,0.15)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(167,139,250,0.3)'
              el.style.background  = 'transparent'
            }}
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#9CA3AF] hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{    opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl overflow-hidden"
            style={{
              background:    'rgba(5,5,7,0.96)',
              backdropFilter:'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:        '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex flex-col p-3 gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#9CA3AF] hover:text-white px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ hover: { background: 'rgba(255,255,255,0.05)' } } as React.CSSProperties}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
