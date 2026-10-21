import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WhyNordSection from './components/WhyNordSection'
import PortfolioSection from './components/PortfolioSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'

const ShowroomView = lazy(() => import('./components/showroom/ShowroomView'))
import PeachwebView from './components/peachweb/PeachwebView'

function LoadingFallback() {
  return (
    <div style={{ position:'fixed',inset:0,background:'#050505',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100 }}>
      <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:'0.85rem',color:'#f59e0b',letterSpacing:'0.2em',textTransform:'uppercase' }}>
        LOADING EXPERIENCE...
      </div>
    </div>
  )
}

export function HomeView({ navigateTo }: { navigateTo: (v:'home'|'showroom', sec?:string) => void }) {

  // ── Scroll reveal observer ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div id="home-scroll-wrapper" style={{ minHeight:'100vh', position:'relative', background:'#0b0716' }}>

      {/* ── Aurora waving gradient background ── */}
      <div aria-hidden="true" className="aurora-bg" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />

      {/* ── Glow Orb 1 — Violet, top-left ── */}
      <div aria-hidden="true" style={{
        position:'fixed', top:'-10vh', left:'-10vw',
        width:'70vw', height:'70vw', maxWidth:'900px', maxHeight:'900px',
        borderRadius:'50%',
        background:'radial-gradient(circle, #7c3aed 0%, transparent 65%)',
        filter:'blur(130px)', opacity:0.35, pointerEvents:'none', zIndex:0,
      }} />

      {/* ── Glow Orb 2 — Cyan, bottom-right ── */}
      <div aria-hidden="true" style={{
        position:'fixed', bottom:'-15vh', right:'-8vw',
        width:'60vw', height:'60vw', maxWidth:'780px', maxHeight:'780px',
        borderRadius:'50%',
        background:'radial-gradient(circle, #06b6d4 0%, transparent 65%)',
        filter:'blur(140px)', opacity:0.3, pointerEvents:'none', zIndex:0,
      }} />

      {/* ── Glow Orb 3 — Magenta, center-right ── */}
      <div aria-hidden="true" style={{
        position:'fixed', top:'40vh', right:'10vw',
        width:'40vw', height:'40vw', maxWidth:'550px', maxHeight:'550px',
        borderRadius:'50%',
        background:'radial-gradient(circle, #ec4899 0%, transparent 65%)',
        filter:'blur(150px)', opacity:0.2, pointerEvents:'none', zIndex:0,
      }} />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes auroraShift {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 60% 20%; }
          50%  { background-position: 100% 60%; }
          75%  { background-position: 40% 100%; }
          100% { background-position: 0% 50%; }
        }
        .aurora-bg {
          background: linear-gradient(
            135deg,
            #0b0716 0%,
            #150b30 15%,
            #0d1a3a 30%,
            #0a2040 45%,
            #12082a 60%,
            #1a0a35 75%,
            #0d1230 90%,
            #0b0716 100%
          );
          background-size: 400% 400%;
          animation: auroraShift 18s ease infinite;
        }
      `}</style>

      {/* ── Page content ── */}
      <div style={{ position:'relative', zIndex:1 }}>
        <Navbar currentView="home" onNavigateToShowroom={() => navigateTo('showroom')} onNavigateToHome={(sec) => navigateTo('home', sec)} />
        <main>
          <HeroSection onNavigateToShowroom={() => navigateTo('showroom')} />
          <div className="aurora-divider" />
          <div className="reveal"><WhyNordSection /></div>
          <div className="aurora-divider" />
          <div className="reveal reveal-delay-1"><PortfolioSection /></div>
          <div className="aurora-divider" />
          <div className="reveal reveal-delay-2"><ReviewsSection /></div>
          <div className="aurora-divider" />
          <div className="reveal reveal-delay-1"><ContactSection /></div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'home'|'showroom'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/showroom' || window.location.hash === '#showroom' ? 'showroom' : 'home'
    }
    return 'home'
  })

  useEffect(() => {
    const handle = () => {
      setView(window.location.pathname === '/showroom' || window.location.hash === '#showroom' ? 'showroom' : 'home')
    }
    window.addEventListener('popstate', handle)
    window.addEventListener('hashchange', handle)
    return () => { window.removeEventListener('popstate', handle); window.removeEventListener('hashchange', handle) }
  }, [])

  const navigateTo = (nextView:'home'|'showroom', sectionId?:string) => {
    if (nextView === 'showroom') {
      window.history.pushState({}, '', '/showroom'); setView('showroom'); window.scrollTo(0, 0)
    } else {
      window.history.pushState({}, '', sectionId ? `#${sectionId}` : '/'); setView('home')
      if (sectionId) setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior:'smooth' }), 100)
    }
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      {view === 'showroom' ? (
        <div style={{ background:'#050505', minHeight:'100vh' }}>
          <ShowroomView onBack={() => navigateTo('home')} />
        </div>
      ) : (
        <PeachwebView onNavigateToShowroom={() => navigateTo('showroom')} />
      )}
    </Suspense>
  )
}
