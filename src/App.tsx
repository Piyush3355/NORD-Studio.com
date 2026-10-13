import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import InteractiveShowcaseSection from './components/InteractiveShowcaseSection'
import ProjectEstimatorSection from './components/ProjectEstimatorSection'
import WhyNordSection from './components/WhyNordSection'
import PortfolioSection from './components/PortfolioSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'

const ShowroomView = lazy(() => import('./components/showroom/ShowroomView'))

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
        INITIALIZING 3D LAB...
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'home' | 'showroom'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/showroom' || window.location.hash === '#showroom'
        ? 'showroom'
        : 'home'
    }
    return 'home'
  })

  useEffect(() => {
    const handleLocation = () => {
      const isShowroom =
        window.location.pathname === '/showroom' || window.location.hash === '#showroom'
      setView(isShowroom ? 'showroom' : 'home')
    }

    window.addEventListener('popstate', handleLocation)
    window.addEventListener('hashchange', handleLocation)
    return () => {
      window.removeEventListener('popstate', handleLocation)
      window.removeEventListener('hashchange', handleLocation)
    }
  }, [])

  const navigateTo = (nextView: 'home' | 'showroom', sectionId?: string) => {
    if (nextView === 'showroom') {
      window.history.pushState({}, '', '/showroom')
      setView('showroom')
      window.scrollTo(0, 0)
    } else {
      window.history.pushState({}, '', sectionId ? `#${sectionId}` : '/')
      setView('home')
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        {view === 'showroom' ? (
          <ShowroomView onBack={() => navigateTo('home')} />
        ) : (
          <>
            <Navbar
              currentView="home"
              onNavigateToShowroom={() => navigateTo('showroom')}
              onNavigateToHome={(sec) => navigateTo('home', sec)}
            />
            <main>
              <HeroSection />
              <InteractiveShowcaseSection />
              <WhyNordSection />
              <ProjectEstimatorSection />
              <PortfolioSection />
              <ReviewsSection />
              <ContactSection />
            </main>
          </>
        )}
      </div>
    </Suspense>
  )
}
