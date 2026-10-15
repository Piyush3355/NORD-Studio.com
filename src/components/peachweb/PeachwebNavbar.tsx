import { useState, useEffect } from 'react'

interface PeachwebNavbarProps {
  onNavigateToSection: (sectionId: string) => void
  onNavigateToShowroom?: () => void
}

export default function PeachwebNavbar({ onNavigateToSection, onNavigateToShowroom }: PeachwebNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    onNavigateToSection(id)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 20px',
        pointerEvents: 'none',
      }}
    >
      <nav
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 960,
          height: 56,
          padding: '0 16px 0 24px',
          borderRadius: 999,
          background: scrolled ? 'rgba(30, 30, 35, 0.85)' : 'rgba(55, 55, 60, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Brandmark / Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#f59e0b',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#d97706', fontStyle: 'italic', marginRight: 1 }}>/</span>logo
        </a>

        {/* Center Nav Links (Desktop) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 2.5vw, 28px)',
          }}
          className="hidden md:flex"
        >
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'work' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#e5e7eb',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                cursor: 'pointer',
                padding: '6px 4px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
            >
              {item.label}
            </button>
          ))}

          {onNavigateToShowroom && (
            <button
              onClick={onNavigateToShowroom}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#38bdf8',
                fontSize: '0.75rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                borderRadius: 999,
                padding: '4px 10px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'
                e.currentTarget.style.borderColor = '#38bdf8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              }}
            >
              3D LAB ↗
            </button>
          )}
        </div>

        {/* Right CTA & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => handleNavClick('contact')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px 7px 18px',
              borderRadius: 999,
              background: '#ffffff',
              border: 'none',
              color: '#050505',
              fontSize: '0.875rem',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.15)'
            }}
          >
            <span>Get Started</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#050505',
                color: '#ffffff',
                fontSize: '11px',
              }}
            >
              →
            </span>
          </button>

          {/* Hamburger button (Mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              width: 36,
              height: 36,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              cursor: 'pointer',
              padding: 6,
            }}
          >
            <span
              style={{
                width: 20,
                height: 2,
                background: '#ffffff',
                borderRadius: 2,
                transition: 'all 0.25s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(3px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                background: '#ffffff',
                borderRadius: 2,
                transition: 'all 0.25s ease',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: 20,
                height: 2,
                background: '#ffffff',
                borderRadius: 2,
                transition: 'all 0.25s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(3px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 960,
            marginTop: 10,
            borderRadius: 20,
            background: 'rgba(15, 15, 18, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
          }}
          className="flex md:hidden"
        >
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'work' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.05rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {item.label}
            </button>
          ))}

          {onNavigateToShowroom && (
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onNavigateToShowroom()
              }}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                fontSize: '0.875rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                borderRadius: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              ENTER 3D SHOWROOM LAB ↗
            </button>
          )}
        </div>
      )}
    </header>
  )
}
