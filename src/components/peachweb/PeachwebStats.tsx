interface PeachwebStatsProps {
  onGetStarted: () => void
}

const STATS = [
  { val: '50 +', label: 'Projects Concluded' },
  { val: '4 weeks', label: 'Average Project Time' },
  { val: '- 20%', label: 'Marketing Cost' },
  { val: 'x 5', label: 'Engagement Boost' },
  { val: '+ 50', label: 'Happy clients' },
  { val: '8 years', label: 'Experience' },
]

export default function PeachwebStats({ onGetStarted }: PeachwebStatsProps) {
  return (
    <section
      id="stats"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading & CTA */}
          <div style={{ gridColumn: 'span 12' }} className="lg:col-span-5">
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: 16,
              }}
            >
              KEY STATS
            </div>

            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(2.2rem, 4.4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: '0 0 16px 0',
              }}
            >
              We drive real business results for your project.
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.05rem',
                lineHeight: 1.55,
                color: 'rgba(255, 255, 255, 0.7)',
                margin: '0 0 28px 0',
              }}
            >
              We help businesses leverage cutting-edge 3D web technology for a competitive edge.
            </p>

            <div>
              <button
                onClick={onGetStarted}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 18px 10px 22px',
                  borderRadius: 999,
                  background: '#ffffff',
                  border: 'none',
                  color: '#050505',
                  fontSize: '0.9rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
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
            </div>
          </div>

          {/* Right Column: 6 Stat Cards Grid (3 cols x 2 rows) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
            className="lg:col-span-7"
          >
            {STATS.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 20,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 140,
                  transition: 'all 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
