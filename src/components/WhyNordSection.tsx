import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  tag: string
  index: number
}

function FeatureCard({ icon, title, description, tag, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '4px',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, background 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(200,240,255,0.15)'
        el.style.background = 'rgba(255,255,255,0.04)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.background = 'rgba(255,255,255,0.025)'
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(200,240,255,0.3), transparent)',
          opacity: 0.5,
        }}
      />

      <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{icon}</div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#4a90b8',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#e8e8e8',
          margin: '0 0 0.8rem 0',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: '#888888',
          lineHeight: 1.75,
          margin: 0,
          fontWeight: 300,
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

const features = [
  {
    icon: '⬡',
    tag: '01 / Design',
    title: 'Pixel-Perfect 3D Design',
    description:
      'Every scene is art-directed to the voxel. We combine GPU-accelerated shaders with GSAP choreography to deliver visual experiences your competitors can\'t replicate.',
  },
  {
    icon: '◈',
    tag: '02 / Engineering',
    title: 'Bulletproof Architecture',
    description:
      'React Three Fiber on a battle-tested Next.js foundation. Custom GLSL shaders, adaptive LOD, and WebGPU-ready pipelines. Frame budgets are contracts, not suggestions.',
  },
  {
    icon: '⬕',
    tag: '03 / QA',
    title: 'Automated WebGL QA',
    description:
      'Every 3D component ships with Playwright smoke tests verifying the WebGL context, zero console errors, and 60fps validation. K6 load testing baked in from day one.',
  },
  {
    icon: '◉',
    tag: '04 / Performance',
    title: 'Zero Dropped Frames',
    description:
      'Our Playwright + K6 pipelines guarantee frame-level consistency at scale. We monitor GPU timings, JS thread contention, and memory pressure before you ever go live.',
  },
]

const stats = [
  { value: '60', unit: 'fps', label: 'Guaranteed Frame Rate' },
  { value: '0', unit: 'err', label: 'Console Errors on Ship' },
  { value: '100%', unit: '', label: 'WebGL Context Coverage' },
  { value: '<2s', unit: '', label: 'First 3D Contentful Paint' },
]

export default function WhyNordSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="why-nord"
      ref={ref}
      style={{ background: 'transparent', padding: '8rem 6vw', position: 'relative' }}
    >
      {/* Background grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: '#4a90b8',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#4a90b8',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Our Engineering Moat
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            Beautiful Design.
            <br />
            <span style={{ color: '#1a1a1a', WebkitTextStroke: '1px #555555' }}>
              Bulletproof Code.
            </span>
          </motion.h2>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '4rem',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#050505',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#c8f0ff',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
                <span style={{ fontSize: '1rem', color: '#4a90b8', marginLeft: '2px' }}>
                  {stat.unit}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#666666',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '0.5rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Feature cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>

        {/* Pipeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '4rem',
            padding: '2rem 2.5rem',
            background: 'rgba(200,240,255,0.03)',
            border: '1px solid rgba(200,240,255,0.08)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#4a90b8',
              letterSpacing: '0.15em',
            }}
          >
            CI/CD PIPELINE
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
            {['Playwright E2E', 'K6 Load Tests', 'WebGL Context QA', 'Lighthouse CI', 'GPU Profiling'].map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#777777',
                  border: '1px solid #2a2a2a',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '2px',
                  letterSpacing: '0.1em',
                  background: 'rgba(124,58,237,0.08)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#4ade80',
                letterSpacing: '0.1em',
              }}
            >
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
