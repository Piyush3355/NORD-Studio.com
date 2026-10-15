interface PeachwebCaseStudiesProps {
  onGetStarted: () => void
}

const CASES = [
  {
    tag: 'LOCAL CAFE',
    description: 'A charming local cafe with a new, engaging 3D web presence that boosted customer visits.',
    image: '/peachweb/images/case-cafe.png',
  },
  {
    tag: 'ART GALLERY',
    description: 'An immersive 3D virtual gallery experience, attracting art lovers from around the globe.',
    image: '/peachweb/images/case-gallery.png',
  },
  {
    tag: 'REAL ESTATE',
    description: 'Interactive 3D property tours for a real estate agency, enhancing client engagement.',
    image: '/peachweb/images/case-realestate.png',
  },
  {
    tag: 'FASHION BRAND',
    description: 'A captivating 3D e-commerce experience that redefined online shopping for a fashion brand.',
    image: '/peachweb/images/case-fashion.png',
  },
]

export default function PeachwebCaseStudies({ onGetStarted }: PeachwebCaseStudiesProps) {
  return (
    <section
      id="work"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 720,
            marginBottom: 'clamp(44px, 7vh, 60px)',
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
            OUR WORK
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Case Studies.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '6px 0 16px 0',
            }}
          >
            From stunning 3D websites to powerful local business platforms, see our projects in action.
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

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {CASES.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Image Container with rounded corners */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.tag}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              {/* Tag & Text */}
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.85)',
                    marginBottom: 6,
                  }}
                >
                  {item.tag}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.9rem',
                    lineHeight: 1.45,
                    color: 'rgba(255, 255, 255, 0.65)',
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
