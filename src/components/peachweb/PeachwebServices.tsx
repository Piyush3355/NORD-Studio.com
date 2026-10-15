interface PeachwebServicesProps {
  onGetStarted: () => void
}

const STRATEGIES = [
  {
    title: 'Innovation',
    description: 'We push boundaries with cutting-edge 3D web experiences, ensuring your business stands out.',
    icon: '/peachweb/icons/asterisk.svg',
  },
  {
    title: 'Local Focus',
    description: 'Tailored strategies to help local businesses thrive online and connect with their community.',
    icon: '/peachweb/icons/channel.svg',
  },
  {
    title: 'Visibility',
    description: 'We build websites that not only look great but also perform well, driving traffic and engagement.',
    icon: '/peachweb/icons/border-vertical.svg',
  },
]

export default function PeachwebServices({ onGetStarted }: PeachwebServicesProps) {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 760,
            marginBottom: 'clamp(48px, 8vh, 64px)',
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            SERVICES
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Our approach to success is built on three main strategies.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '8px 0 16px 0',
            }}
          >
            Crafting immersive 3D websites and building robust online presences for local businesses.
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

        {/* 3 Strategy Cards (Crisp Bone-White) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {STRATEGIES.map((strat, i) => (
            <div
              key={i}
              style={{
                background: '#ebe9e5',
                borderRadius: 24,
                padding: '36px 32px 40px',
                color: '#050505',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 280,
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* Icon */}
              <div style={{ width: 32, height: 32, marginBottom: 40 }}>
                <img
                  src={strat.icon}
                  alt={strat.title}
                  style={{ width: 28, height: 28, objectFit: 'contain' }}
                />
              </div>

              {/* Title & Desc */}
              <div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#050505',
                    margin: '0 0 12px 0',
                  }}
                >
                  {strat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    color: 'rgba(5, 5, 5, 0.75)',
                    margin: 0,
                  }}
                >
                  {strat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
