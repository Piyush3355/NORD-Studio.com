import { useRef, useCallback, Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import Monolith from './Monolith'

function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} color="#c8f0ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4a6080" />
      <pointLight position={[3, 5, 2]} intensity={0.3} color="#ffffff" />
      <Stars radius={120} depth={60} count={2000} factor={4} fade speed={0.5} />
      <Suspense fallback={null}>
        <Monolith mouse={mouse} />
        <Environment preset="night" />
      </Suspense>
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0008)}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  )
}

export default function HeroSection() {
  const mouse = useRef<[number, number]>([0, 0])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = -(e.clientY / window.innerHeight - 0.5) * 2
    mouse.current = [x * 0.015, y * 0.015]
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#050505' }}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Canvas */}
      <div id="webgl-canvas" className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, 2]}
        >
          <Scene mouse={mouse} />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #050505, transparent)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)' }}
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
          className="flex items-center gap-6 mt-10 pointer-events-auto"
          style={{ flexWrap: 'wrap' }}
        >
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
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#c8f0ff'
            }}
          >
            View Our Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#c8f0ff'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#707070'
            }}
          >
            Why NORD?
          </a>
        </div>
      </div>

      {/* Bottom nav hint */}
      <div
        className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2"
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
