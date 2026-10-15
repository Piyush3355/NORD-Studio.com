import { useState, Suspense } from 'react'
import ProcessWaveCanvas from './ProcessWaveCanvas'

const STEPS = [
  {
    title: 'Initial Consultation',
    desc: 'We discuss your vision, goals, and specific needs for your 3D website or local business project.',
    icon: '/peachweb/icons/asterisk.svg',
  },
  {
    title: 'Design & Development',
    desc: 'Our team crafts a unique design and develops the functionality, including 3D elements.',
    icon: '/peachweb/icons/asterisk.svg',
  },
  {
    title: 'Testing & Refinement',
    desc: 'Thorough testing to ensure flawless performance and fine-tuning based on your feedback.',
    icon: '/peachweb/icons/asterisk.svg',
  },
  {
    title: 'Launch & Support',
    desc: 'Your new 3D website or local business platform goes live, with ongoing support available.',
    icon: '/peachweb/icons/border-vertical.svg',
  },
]

export default function PeachwebProcess() {
  const [activeStep, setActiveStep] = useState(3) // Launch & Support highlighted by default as in video

  return (
    <section
      id="process"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 3D Wave Canvas Backdrop */}
      <Suspense fallback={null}>
        <ProcessWaveCanvas />
      </Suspense>

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Title & Tag */}
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
              HOW IT WORKS
            </div>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Our Process.
            </h2>
          </div>

          {/* Right Column: Stacked Step Cards */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
            className="lg:col-span-7"
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    borderRadius: 20,
                    padding: '24px 28px',
                    background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#050505' : '#ffffff',
                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 12px 32px rgba(0, 0, 0, 0.3)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ width: 20, height: 20, marginBottom: 10 }}>
                        <img
                          src={step.icon}
                          alt=""
                          style={{
                            width: 18,
                            height: 18,
                            filter: isActive ? 'none' : 'brightness(0) invert(1)',
                          }}
                        />
                      </div>
                      <h3
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          margin: '0 0 6px 0',
                        }}
                      >
                        {step.title}
                      </h3>
                      {isActive && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.925rem',
                            lineHeight: 1.5,
                            color: 'rgba(5, 5, 5, 0.75)',
                            margin: '8px 0 0 0',
                          }}
                        >
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
