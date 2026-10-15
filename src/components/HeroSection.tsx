import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface HeroSectionProps {
  onNavigateToShowroom?: () => void
}

export default function HeroSection({ onNavigateToShowroom }: HeroSectionProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffectRef = useRef<{ destroy: () => void } | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let isMounted = true

    const initVanta = async () => {
      try {
        const OrigDataTexture = THREE.DataTexture
        class PatchedDataTexture extends OrigDataTexture {
          constructor(...args: ConstructorParameters<typeof OrigDataTexture>) {
            super(...args)
            this.needsUpdate = true
          }
        }

        // Polyfill Number.prototype.clamp for Vanta color calculations
        // @ts-expect-error - augmentation
        if (typeof Number.prototype.clamp !== 'function') {
          // @ts-expect-error - augmentation
          Number.prototype.clamp = function (min: number, max: number) {
            return Math.min(Math.max(Number(this), min), max)
          }
        }

        const threeCompat = Object.assign({}, THREE, {
          PlaneBufferGeometry: THREE.PlaneGeometry,
          DataTexture: PatchedDataTexture,
        })

        if (typeof window !== 'undefined') {
          // Expose THREE globally with legacy compatibility polyfill
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ; (window as any).THREE = threeCompat
        }

        // Dynamically load Vanta Birds
        // @ts-expect-error - vanta has no official typescript declarations
        const vantaModule = await import('vanta/dist/vanta.birds.min')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const BIRDS = (window as any).VANTA?.BIRDS || vantaModule.default?.default || vantaModule.default || vantaModule

        if (isMounted && vantaRef.current && !vantaEffectRef.current && typeof BIRDS === 'function') {
          vantaEffectRef.current = BIRDS({
            el: vantaRef.current,
            THREE: threeCompat,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x06111f,
            color1: 0xff9d4d,
            color2: 0xe879f9,
            colorMode: 'varianceGradient',
            birdSize: 1.4,
            wingSpan: 28.0,
            speedLimit: 4.0,
            separation: 22.0,
            alignment: 18.0,
            cohesion: 18.0,
            quantity: 4.0,
          })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (window as any).vantaEffect = vantaEffectRef.current
        }
      } catch (err) {
        console.error('Failed to initialize Vanta Birds:', err)
      }
    }

    initVanta()

    return () => {
      isMounted = false
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy()
        vantaEffectRef.current = null
      }
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06111f 0%, #0d1f3a 35%, #1a1042 65%, #2d0a3a 100%)',
      }}
    >
      {/* ── Premium background: glowing radial blobs (Home-only) ── */}
      {/* Deep Indigo blob — top-left */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          width: '65vw',
          height: '65vw',
          maxWidth: '820px',
          maxHeight: '820px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #1e3a5f 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.8,
          zIndex: 0,
        }}
      />
      {/* Dark Emerald blob — bottom-right */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: '-8%',
          right: '-5%',
          width: '55vw',
          height: '55vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #7c1d6f 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* 3D Vanta Birds WebGL Canvas Container */}
      <div
        id="webgl-canvas"
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Subtle Dark Gradient overlays */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #06111f, transparent)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #06111f 0%, transparent 100%)' }}
      />

      {/* Hero content overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-center z-20 pointer-events-none"
        style={{
          padding: '0 6vw',
          transition: 'opacity 1.2s ease',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: '#c8f0ff', boxShadow: '0 0 8px #c8f0ff' }}
          />
          <span style={{ color: '#4a90b8', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Enterprise 3D Studio — Est. 2024
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: 0,
          }}
        >
          WE BUILD
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c8f0ff 50%, #7ab8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            UNBREAKABLE
          </span>
          <br />
          <span style={{ color: '#1a1a1a', WebkitTextStroke: '1px #555555' }}>3D.</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: '#999999',
            marginTop: '2.5rem',
            maxWidth: '480px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Enterprise-grade 3D experiences with rigorous automated QA testing.{' '}
          <span style={{ color: '#4a90b8' }}>Zero dropped frames. Zero compromises.</span>
        </p>

        {/* CTA row */}
        <div
          className="flex items-center gap-4 mt-10 pointer-events-auto"
          style={{ flexWrap: 'wrap' }}
        >
          {onNavigateToShowroom && (
            <button
              type="button"
              id="hero-cta-showroom"
              onClick={onNavigateToShowroom}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%)',
                border: '1px solid rgba(34, 211, 238, 0.45)',
                boxShadow: '0 0 25px rgba(34, 211, 238, 0.18)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0.85rem 1.6rem',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.32) 0%, rgba(99, 102, 241, 0.38) 100%)'
                el.style.borderColor = 'rgba(34, 211, 238, 0.85)'
                el.style.boxShadow = '0 0 35px rgba(34, 211, 238, 0.4)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%)'
                el.style.borderColor = 'rgba(34, 211, 238, 0.45)'
                el.style.boxShadow = '0 0 25px rgba(34, 211, 238, 0.18)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#22d3ee',
                  boxShadow: '0 0 8px #22d3ee',
                }}
              />
              <span>3D Product Lab</span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.62rem',
                  color: '#22d3ee',
                  background: 'rgba(34, 211, 238, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  letterSpacing: '0.1em',
                }}
              >
                LIVE CAD
              </span>
            </button>
          )}

          <a
            href="#portfolio"
            id="cta-work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#c8f0ff',
              color: '#050505',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.9rem 2rem',
              borderRadius: '2px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#c8f0ff'
            }}
          >
            View Our Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#why-nord"
            id="cta-learn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#707070',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.color = '#c8f0ff'
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLAnchorElement).style.color = '#707070'
            }}
          >
            Why NORD?
          </a>
        </div>
      </div>

      {/* Bottom nav hint */}
      <div
        className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: '#555555',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #555555, transparent)',
            animation: 'pulse 2s infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
