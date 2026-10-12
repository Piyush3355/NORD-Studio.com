import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#why-nord', label: 'Why NORD' },
  { href: '#portfolio', label: 'Work' },
  { href: '/showroom', label: '3D Lab', isLab: true },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

interface NavbarProps {
  currentView?: 'home' | 'showroom'
  onNavigateToShowroom?: () => void
  onNavigateToHome?: (sectionId?: string) => void
}

export default function Navbar({
  currentView = 'home',
  onNavigateToShowroom,
  onNavigateToHome,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '1rem 6vw' : '1.8rem 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          id="nav-logo"
          style={{ textDecoration: 'none' }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.05em',
            }}
          >
            NORD
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.5rem',
              color: '#4a90b8',
              letterSpacing: '0.2em',
              marginLeft: '4px',
              verticalAlign: 'super',
              textTransform: 'uppercase',
            }}
          >
            Studio
          </span>
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: '2.5rem', alignItems: 'center' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={link.isLab ? 'nav-link-showroom' : undefined}
              onClick={(e) => {
                if (link.isLab) {
                  e.preventDefault()
                  if (onNavigateToShowroom) {
                    onNavigateToShowroom()
                  } else {
                    window.history.pushState({}, '', '/showroom')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }
                } else if (currentView === 'showroom') {
                  e.preventDefault()
                  if (onNavigateToHome) {
                    onNavigateToHome(link.href.replace('#', ''))
                  } else {
                    window.history.pushState({}, '', '/' + link.href)
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }
                }
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: link.isLab ? '#e2e8f0' : '#7a7a7a',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = '#e8e8e8'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = link.isLab ? '#e2e8f0' : '#7a7a7a'
              }}
            >
              {link.label}
              {link.isLab && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  style={{
                    boxShadow: '0 0 6px #10b981',
                  }}
                  title="Live WebGL Playground"
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            id="nav-cta"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#050505',
              background: '#c8f0ff',
              padding: '0.55rem 1.4rem',
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#c8f0ff'
            }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="nav-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#e8e8e8',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ width: 22, height: 1, background: '#e8e8e8', transition: 'background 0.2s' }}
            />
            <motion.div
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ width: 22, height: 1, background: '#e8e8e8' }}
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ width: 22, height: 1, background: '#e8e8e8' }}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(24px)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                id={link.isLab ? 'nav-mobile-link-showroom' : undefined}
                onClick={(e) => {
                  setMenuOpen(false)
                  if (link.isLab) {
                    e.preventDefault()
                    if (onNavigateToShowroom) {
                      onNavigateToShowroom()
                    } else {
                      window.history.pushState({}, '', '/showroom')
                      window.dispatchEvent(new PopStateEvent('popstate'))
                    }
                  } else if (currentView === 'showroom') {
                    e.preventDefault()
                    if (onNavigateToHome) {
                      onNavigateToHome(link.href.replace('#', ''))
                    } else {
                      window.history.pushState({}, '', '/' + link.href)
                      window.dispatchEvent(new PopStateEvent('popstate'))
                    }
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#e8e8e8',
                  textDecoration: 'none',
                  letterSpacing: '-0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                }}
              >
                {link.label}
                {link.isLab && (
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"
                    style={{
                      boxShadow: '0 0 10px #10b981',
                    }}
                  />
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
