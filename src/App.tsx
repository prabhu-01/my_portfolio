import { useEffect, useState } from 'react'
import Lenis, { type LenisOptions } from 'lenis'
import CustomCursor    from './components/CustomCursor'
import Loader          from './components/Loader'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import About           from './components/About'
import Projects        from './components/Projects'
import Thinking        from './components/Thinking'
import Experiments     from './components/Experiments'
import LifeSystem      from './components/LifeSystem'
import CTA             from './components/CTA'
import Footer          from './components/Footer'
import SectionDivider  from './components/SectionDivider'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Prevent scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [loading])

  // Init Lenis after loader finishes
  useEffect(() => {
    if (loading) return

    const options: LenisOptions = {
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }
    const lenis = new Lenis(options)

    let raf: number
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className="relative w-full overflow-x-hidden bg-[#050507] text-white">
        {/* Fixed noise texture overlay — purely decorative, never touches layout */}
        <div className="noise-overlay" aria-hidden="true" />

        <CustomCursor />
        <Navbar />
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Thinking />
        <SectionDivider />
        <Experiments />
        <SectionDivider />
        <LifeSystem />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
