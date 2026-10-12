import { Suspense } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WhyNordSection from './components/WhyNordSection'
import PortfolioSection from './components/PortfolioSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'

function LoadingFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: '#2a2a2a',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        INITIALIZING...
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <HeroSection />
          <WhyNordSection />
          <PortfolioSection />
          <ReviewsSection />
          <ContactSection />
        </main>
      </div>
    </Suspense>
  )
}
