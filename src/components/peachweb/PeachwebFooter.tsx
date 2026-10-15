interface PeachwebFooterProps {
  onGetStarted: () => void
  onNavigateToSection: (sectionId: string) => void
}

export default function PeachwebFooter({ onGetStarted, onNavigateToSection }: PeachwebFooterProps) {
  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        background: 'transparent',
        color: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(80px, 14vh, 140px) clamp(24px, 5vw, 64px) 40px',
      }}
    >

      {/* Top CTA Banner */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 'clamp(60px, 12vh, 120px)',
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 32px 0',
          }}
        >
          Ready to elevate your online presence?
        </h2>

        <div>
          <button
            onClick={onGetStarted}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 24px 14px 28px',
              borderRadius: 999,
              background: '#ffffff',
              border: 'none',
              color: '#050505',
              fontSize: '1rem',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 255, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.25)'
            }}
          >
            <span>Get Started</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#050505',
                color: '#ffffff',
                fontSize: '13px',
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>

      {/* Footer Navigation & Columns */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 40,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          {/* Brand info */}
          <div style={{ gridColumn: 'span 12' }} className="md:col-span-6">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#f59e0b',
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              <span style={{ color: '#d97706', fontStyle: 'italic' }}>/</span>logo
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                maxWidth: 380,
                lineHeight: 1.5,
              }}
            >
              Speak to Nord Studios today.{' '}
              <a
                href="mailto:hello@nordstudios.com"
                style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: 4 }}
              >
                hello@nordstudios.com
              </a>
            </p>
          </div>

          {/* Discover Column */}
          <div style={{ gridColumn: 'span 6' }} className="md:col-span-3">
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: 18,
              }}
            >
              Discover
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Home', id: 'top' },
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Work', id: 'work' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigateToSection(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials Column */}
          <div style={{ gridColumn: 'span 6' }} className="md:col-span-3">
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.45)',
                marginBottom: 18,
              }}
            >
              Socials
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['X', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 24,
            fontSize: '0.85rem',
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          <div>© 2026 Nord Studios Inc. All rights reserved.</div>
          <div>hello@nordstudios.com</div>
        </div>
      </div>
    </footer>
  )
}
