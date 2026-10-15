const CLIENT_LOGOS = [
  { name: 'Nike', src: '/peachweb/logos/nike.svg' },
  { name: 'Apple Music', src: '/peachweb/logos/apple-music.svg' },
  { name: 'Sony', src: '/peachweb/logos/sony.svg' },
  { name: 'Prada', src: '/peachweb/logos/prada.svg' },
  { name: 'Google', src: '/peachweb/logos/google.svg' },
  // { name: 'Mercedes-AMG', src: '/peachweb/logos/amg.svg' },
  // { name: 'Nike', src: '/peachweb/logos/nike.svg' },
  // { name: 'Apple Music', src: '/peachweb/logos/apple-music.svg' },
]

export default function PeachwebStudio() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(60px, 10vh, 120px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Studio Statement */}
        <div style={{ maxWidth: 840, marginBottom: 'clamp(80px, 12vh, 140px)' }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: 20,
            }}
          >
            OUR STUDIO
          </div>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            To bring ideas to life through innovative design that blends creativity, strategy, and technology.
          </h2>
        </div>

        {/* Clients Section */}
        <div>
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
            CLIENTS
          </div>
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: 0,
              marginBottom: 36,
            }}
          >
            Trusted by industry leaders.
          </h3>

          {/* 8-Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                style={{
                  height: 128,
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <img
                  src={client.src}
                  alt={client.name}
                  style={{
                    maxHeight: 38,
                    maxWidth: 130,
                    width: 'auto',
                    filter: 'brightness(0) invert(1) opacity(0.85)',
                    transition: 'filter 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(0.85)')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
