import { useState, Suspense, lazy } from 'react'
import PeachwebPreloader from './PeachwebPreloader'
import PeachwebNavbar from './PeachwebNavbar'
import PeachwebHero from './PeachwebHero'
import PeachwebStudio from './PeachwebStudio'
import PeachwebServices from './PeachwebServices'
import PeachwebCaseStudies from './PeachwebCaseStudies'
import PeachwebApproach from './PeachwebApproach'
import PeachwebProcess from './PeachwebProcess'
import PeachwebStats from './PeachwebStats'
import PeachwebTestimonials from './PeachwebTestimonials'
import PeachwebFooter from './PeachwebFooter'

const TwisterHeroCanvas = lazy(() => import('./TwisterHeroCanvas'))

interface PeachwebViewProps {
  onNavigateToShowroom?: () => void
}

export default function PeachwebView({ onNavigateToShowroom }: PeachwebViewProps) {
  const [loaded, setLoaded] = useState(false)

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      style={{
        background: '#050505',
        color: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {!loaded && <PeachwebPreloader onLoaded={() => setLoaded(true)} />}

      {/* ── Fixed 3D Twister Scene with Studio Grey Gradient ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <TwisterHeroCanvas />
        </Suspense>
      </div>

      <PeachwebNavbar
        onNavigateToSection={scrollToSection}
        onNavigateToShowroom={onNavigateToShowroom}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <PeachwebHero
          onGetStarted={() => scrollToSection('contact')}
          onLearnMore={() => scrollToSection('about')}
        />

        <PeachwebStudio />

        <PeachwebServices onGetStarted={() => scrollToSection('contact')} />

        <PeachwebCaseStudies onGetStarted={() => scrollToSection('contact')} />

        <PeachwebApproach />

        <PeachwebProcess />

        <PeachwebStats onGetStarted={() => scrollToSection('contact')} />

        <PeachwebTestimonials />

        {/* Team section removed per user request: solo founder */}

        <PeachwebFooter
          onGetStarted={() => scrollToSection('contact')}
          onNavigateToSection={scrollToSection}
        />
      </main>
    </div>
  )
}
