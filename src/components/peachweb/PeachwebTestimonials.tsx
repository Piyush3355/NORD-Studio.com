const REVIEWS = [
  {
    quote: 'Their expertise in local business builders helped us connect with more customers than ever before.',
    name: 'John Doe',
    role: 'Manager, Boutique Shop',
    avatar: '/peachweb/images/team-john.png',
  },
  {
    quote: 'We saw measurable improvements within the first quarter and continue to benefit from their guidance.',
    name: 'Celine Doe',
    role: 'CEO, Tech Startup',
    avatar: null,
  },
  {
    quote: 'Their insights were practical, data-driven, and immediately actionable.',
    name: 'Mike Doe',
    role: 'Marketing, Art Gallery',
    avatar: '/peachweb/images/team-mike.png',
  },
]

export default function PeachwebTestimonials() {
  return (
    <section
      id="testimonials"
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
        <div style={{ maxWidth: 720, marginBottom: 'clamp(44px, 7vh, 60px)' }}>
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
            TESTIMONIALS
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
            Hear it from our clients themselves.
          </h2>
        </div>

        {/* Featured Big Quote Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 24,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: 'clamp(36px, 6vw, 56px)',
            marginBottom: 20,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#ffffff',
              maxWidth: 820,
              margin: '0 0 32px 0',
            }}
          >
            “Nord Studios transformed our online presence; the 3D website is truly a game-changer.”
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src="/peachweb/images/client-frank.png"
              alt="Frank Doe"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#ffffff',
                }}
              >
                Frank Doe
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                Owner, Local Bakery
              </div>
            </div>
          </div>
        </div>

        {/* 3 Grid Review Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 220,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.975rem',
                  lineHeight: 1.55,
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: '0 0 24px 0',
                }}
              >
                “{rev.quote}”
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#ffffff',
                    }}
                  >
                    {rev.name[0]}
                  </div>
                )}
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#ffffff',
                    }}
                  >
                    {rev.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                    }}
                  >
                    {rev.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
