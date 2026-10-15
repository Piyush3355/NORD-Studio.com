export default function PeachwebApproach() {
  return (
    <section
      id="approach"
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
        <div style={{ maxWidth: 760, marginBottom: 'clamp(44px, 7vh, 60px)' }}>
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
            OUR APPROACH
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 16px 0',
            }}
          >
            Where your ambition meets velocity.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            We combine creative design with strategic development to deliver exceptional results.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 20,
          }}
        >
          {/* Card 1: 3D Web Design (Large - 7 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 380,
              background: '#151515',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 36,
            }}
            className="lg:col-span-7"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/peachweb/images/approach-3d.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.9,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
                zIndex: 1,
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                3D Web Design
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 440 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                }}
              >
                Creating visually stunning and interactive 3D websites that captivate your audience.
              </p>
            </div>
          </div>

          {/* Card 2: Local SEO (Clean White Card - 5 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              borderRadius: 24,
              background: '#ffffff',
              color: '#050505',
              padding: 36,
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
            }}
            className="lg:col-span-5"
          >
            <div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#050505',
                  margin: 0,
                }}
              >
                Local SEO
              </h3>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  color: 'rgba(5, 5, 5, 0.75)',
                  margin: 0,
                }}
              >
                Optimizing your online presence to attract more local customers and boost visibility.
              </p>
            </div>
          </div>

          {/* Card 3: Business Builder (4 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 320,
              background: '#141416',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 32,
            }}
            className="md:col-span-4"
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '60%',
                backgroundImage: 'url(/peachweb/images/approach-map.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.7,
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Business Builder
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Comprehensive solutions to help local businesses establish and grow their digital footprint.
              </p>
            </div>
          </div>

          {/* Card 4: User Experience (Terracotta Card - 4 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              borderRadius: 24,
              background: '#773a20',
              color: '#ffffff',
              padding: 32,
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 28px rgba(119, 58, 32, 0.35)',
            }}
            className="md:col-span-4"
          >
            <div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                User Experience
              </h3>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                }}
              >
                Designing intuitive and engaging user journeys for optimal interaction and conversion.
              </p>
            </div>
          </div>

          {/* Card 5: Responsive (4 cols) */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 320,
              background: '#141416',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 32,
            }}
            className="md:col-span-4"
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '60%',
                backgroundImage: 'url(/peachweb/images/approach-responsive.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.8,
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Responsive
              </h3>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Ensuring your website looks and performs flawlessly across all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
