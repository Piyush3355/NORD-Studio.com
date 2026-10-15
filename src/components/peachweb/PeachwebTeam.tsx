const TEAM = [
  {
    name: 'John Doe',
    role: 'Lead 3D Designer',
    image: '/peachweb/images/team-john.png',
  },
  {
    name: 'Mike Doe',
    role: 'Local Business Strategist',
    image: '/peachweb/images/team-mike.png',
  },
]

export default function PeachwebTeam() {
  return (
    <section
      id="team"
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
            PEOPLE
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 24px 0',
            }}
          >
            Meet the Team.
          </h2>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: 8,
            }}
          >
            FOUNDERS
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            Our passionate team is dedicated to creating innovative 3D web and local business solutions.
          </p>
        </div>

        {/* 2 Founder Profile Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {TEAM.map((member, i) => (
            <div
              key={i}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 11',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#1a1a1a',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(15%)',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              {/* Name, Role & Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {member.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {member.role}
                  </div>
                </div>

                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '16px',
                  }}
                >
                  ↗
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
