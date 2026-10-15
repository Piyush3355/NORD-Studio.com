interface PeachwebHeroProps {
  onGetStarted: () => void
  onLearnMore: () => void
}

export default function PeachwebHero({ onGetStarted, onLearnMore }: PeachwebHeroProps) {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(90px, 14vh, 130px) clamp(24px, 5vw, 64px) clamp(32px, 5vh, 48px)',
        overflow: 'hidden',
        color: '#ffffff',
      }}
    >
      {/* Hero Header & Headline Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 820,
          pointerEvents: 'auto',
        }}
      >
        <h1
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(2.6rem, 5.6vw, 5.2rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            margin: 0,
            marginBottom: 'clamp(24px, 4vh, 36px)',
          }}
        >
          Nord Studios: 3D Web &amp; Local Business Solutions.
        </h1>

        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button
            onClick={onGetStarted}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px 12px 24px',
              borderRadius: 999,
              background: '#ffffff',
              border: 'none',
              color: '#050505',
              fontSize: '0.95rem',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(255, 255, 255, 0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            <span>Get Started</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#050505',
                color: '#ffffff',
                fontSize: '12px',
              }}
            >
              →
            </span>
          </button>

          <button
            onClick={onLearnMore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.24)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom Row: Scroll down indicator (left) + Subtitle (right) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
          marginTop: 'clamp(40px, 8vh, 80px)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#f59e0b',
            }}
          />
          Scroll down
        </div>

        <div
          style={{
            maxWidth: 380,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.975rem',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'right',
          }}
          className="text-left md:text-right"
        >
          Crafting immersive 3D websites and building robust online presences for local businesses.
        </div>
      </div>
    </section>
  )
}
