import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Metric {
  label: string
  value: string
}

interface Project {
  id: string
  name: string
  subtitle: string
  category: string
  tag: string
  description: string
  image: string
  techStack: string[]
  color: string
  metrics: Metric[]
  highlights: string[]
  architecture: string
  deliverables: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

// Language → accent colour mapping
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  'Next.js 14': '#ffffff',
  'React 18': '#61dafb',
  React: '#61dafb',
  'Three.js': '#00f5ff',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  WebGL: '#990000',
  'Node.js': '#68a063',
  Supabase: '#3ecf8e',
  'Tailwind CSS': '#38bdf8',
  Razorpay: '#02042b',
  Resend: '#ffffff',
  'Web Audio API': '#f43f5e',
  'LLM APIs': '#c084fc',
  'Vector DB': '#38bdf8',
  'SSE Streaming': '#fbbf24',
  'E-Commerce': '#a855f7',
  Lucide: '#f59e0b',
  HTML5: '#e34c26',
}

// ─── 4 Curated Projects Requested by Piyush ──────────────────────────────────
const projects: Project[] = [
  {
    id: 'biller-in',
    name: 'Biller.in',
    subtitle: 'Enterprise Cloud Invoicing & Financial Ledger Suite',
    category: 'FinTech / SaaS Platform',
    tag: 'Next.js 14 / Supabase',
    color: '#a855f7',
    image: '/projects/biller.jpg',
    description:
      'An end-to-end cloud invoice and billing management platform engineered with Next.js 14, Supabase, Tailwind CSS, and shadcn/ui. Handles dynamic GST tax computations, Razorpay instant payment links, branded invoice PDF generation, and automated Resend transactional email dispatches.',
    metrics: [
      { label: 'Tax Accuracy', value: '100% GST' },
      { label: 'Invoice Gen', value: '< 250ms' },
      { label: 'Payment Gateway', value: 'Razorpay' },
      { label: 'Email Engine', value: 'Resend API' },
    ],
    highlights: [
      'Multi-tier GST tax calculator with automated HSN/SAC code mapping and CGST / SGST / IGST breakdown.',
      'Direct Razorpay payment gateway integration with dynamic payment links and automated webhook reconciliation.',
      'Instant PDF invoice generator with custom company branding, logo upload bucket, and digital signatures.',
      'Supabase PostgreSQL backend featuring strict Row-Level Security (RLS) policies and real-time ledger updates.',
      'Automated transactional email notifications with PDF invoice attachments powered by the Resend API.',
    ],
    architecture:
      'Built on Next.js 14 App Router and server actions for zero-leakage financial calculations. Supabase handles relational customer ledger data and logo asset storage, while Razorpay webhooks trigger automated state reconciliation and Resend email workflows.',
    deliverables: [
      'Multi-Tenant Dashboard',
      'Instant Payment Links',
      'PDF Generation Pipeline',
      'Real-time Tax Engine',
      'Client Management Portal',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Razorpay', 'Resend'],
  },
  {
    id: 'idostem-robotics',
    name: 'IDOSTEP Robotics',
    subtitle: 'Interactive 3D STEM Robotics Hardware & E-Commerce Labs',
    category: 'Robotics & 3D Web',
    tag: 'Three.js / WebGL',
    color: '#00f5ff',
    image: '/projects/idostem.jpg',
    description:
      'An immersive 3D robotics and STEM education hardware portal featuring an interactive Three.js viewport, component configurators, and instant checkout for Arduino robotics kits, autonomous RoboCars, drones, and 6-DOF robotic arms.',
    metrics: [
      { label: '3D Frame Rate', value: '60 FPS' },
      { label: 'Interactive 3D', value: 'Three.js / GL' },
      { label: 'Hardware Kits', value: 'Arduino / STEM' },
      { label: 'Checkout Flow', value: 'Instant Cart' },
    ],
    highlights: [
      'Interactive 3D Three.js canvas rendering robotic arms, autonomous rovers, and sensor modules with orbit controls.',
      'Dynamic parts catalogue with multi-filter search for microcontrollers, LiDAR sensors, servos, and chassis.',
      'Real-time interactive hardware specifications inspector with 360° product rotation and wireframe toggle.',
      'Educational curriculum and assembly guide companion for school & college engineering robotics labs.',
      'Ultra-responsive dark glassmorphic interface with low-friction shopping cart and instant checkout.',
    ],
    architecture:
      'Hardware models rendered using Three.js with custom PBR lighting and shadow maps optimized for mobile GPUs. State-managed cart and modular catalog engine designed for minimal bundle overhead and instant load performance.',
    deliverables: [
      'Interactive 3D Viewport',
      'Hardware Specs Inspector',
      'Instant E-Commerce Cart',
      'Curriculum Assembly Guide',
      'Mobile-Optimized WebGL',
    ],
    techStack: ['Three.js', 'JavaScript', 'WebGL', 'HTML5', 'E-Commerce'],
  },
  {
    id: 'melodify',
    name: 'Melodify',
    subtitle: 'High-Fidelity Audio Streaming & Spotify-Inspired Music Engine',
    category: 'Streaming Media / Web App',
    tag: 'React 18 / TypeScript',
    color: '#22c55e',
    image: '/projects/melodify.jpg',
    description:
      'A modern, feature-packed music streaming web application designed with React 18, TypeScript, and Tailwind CSS. Delivers high-fidelity audio playback, responsive waveforms, queue management, and deep catalogue navigation across Bollywood, Hollywood, and international genres.',
    metrics: [
      { label: 'Music Catalog', value: '1,000+ Tracks' },
      { label: 'Audio Latency', value: '< 40ms' },
      { label: 'UI Architecture', value: 'Spotify Dark' },
      { label: 'State Model', value: 'React Context' },
    ],
    highlights: [
      'High-fidelity audio playback engine with waveform scrubber, volume normalization, and loop/shuffle modes.',
      'Spotify-inspired dark glassmorphism interface with responsive desktop and mobile layouts.',
      'Smart genre taxonomy and instant fuzzy search across artists, tracks, and albums.',
      'Custom playlist builder with local storage persistence and CSV bulk-track importer.',
      'Real-time visualizer animations synced with track playback state.',
    ],
    architecture:
      'Architected with React 18 and Vite for sub-second hot reloads. State orchestration via React Context and useReducer for global audio stream synchronization, paired with the Web Audio API for smooth scrubbing and zero playback hiccups.',
    deliverables: [
      'Audio Streaming Engine',
      'Waveform Player Bar',
      'Custom Playlist Manager',
      'Fuzzy Search System',
      'CSV Song Importer',
    ],
    techStack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Web Audio API', 'Lucide'],
  },
  {
    id: 'llm-project',
    name: 'Nexus LLM Studio',
    subtitle: 'Generative AI Multi-Agent Orchestration & Inference Platform',
    category: 'Generative AI / LLM Monorepo',
    tag: 'Full-Stack GenAI',
    color: '#38bdf8',
    image: '/projects/llm-studio.svg',
    description:
      'A full-stack generative AI orchestration monorepo integrating a modern Vite/React frontend with a high-throughput backend server. Powers real-time token streaming, prompt engineering playgrounds, multi-model LLM routing, and structured schema validation.',
    metrics: [
      { label: 'Stream Speed', value: '140+ Tok/s' },
      { label: 'Token Latency', value: '< 25ms' },
      { label: 'Agent Schema', value: 'Zero-Hallucination' },
      { label: 'Architecture', value: 'Full Monorepo' },
    ],
    highlights: [
      'Dual client-server monorepo orchestrating responsive Vite/React with high-concurrency Node.js backend.',
      'Multi-model abstraction layer supporting dynamic switching between GPT-4o, Claude 3.5, and open weights.',
      'Real-time token streaming with Server-Sent Events (SSE) and live Markdown/code block syntax highlighting.',
      'Vector embedding retrieval augmented generation (RAG) with in-memory semantic cache.',
      'Strict JSON Schema guardrails ensuring deterministic and machine-readable agent responses.',
    ],
    architecture:
      'Designed as a modular client-server monorepo with isolated dependency trees and environment configurations. The backend handles secure credential management, rate-limiting, and WebSocket/SSE streams, while the React client renders streaming responses without UI thread stutter.',
    deliverables: [
      'Full-Stack Monorepo',
      'Prompt Engineering Playground',
      'Streaming Token Engine',
      'RAG Retrieval Pipeline',
      'Schema Guardrail System',
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'LLM APIs', 'Vector DB', 'SSE Streaming'],
  },
]

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 })
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px', height: '100%' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(project)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        whileHover={{
          scale: 1.015,
          borderColor: `${project.color}50`,
          boxShadow: `0 20px 40px -15px ${project.color}20`,
        }}
      >
        {/* Top colour gradient line */}
        <div
          style={{
            height: '3px',
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
            flexShrink: 0,
          }}
        />

        {/* Project Thumbnail Image with Hover Zoom */}
        <div
          style={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            background: '#090a10',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <motion.img
            src={project.image}
            alt={project.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
            whileHover={{ scale: 1.06 }}
          />

          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.85) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top corner pill badges */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#ffffff',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(8px)',
                padding: '0.25rem 0.6rem',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.12)',
                letterSpacing: '0.15em',
              }}
            >
              0{index + 1}
            </span>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: project.color,
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${project.color}50`,
                padding: '0.25rem 0.65rem',
                borderRadius: '3px',
                letterSpacing: '0.12em',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Overlay CTA indicator on image bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '1.25rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#c8f0ff',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.6rem',
              borderRadius: '2px',
              border: '1px solid rgba(200,240,255,0.2)',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>CASE STUDY</span>
            <span style={{ color: project.color }}>↗</span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Category */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#888888',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            {project.category}
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 0.4rem 0',
              lineHeight: 1.15,
            }}
          >
            {project.name}
          </h3>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.78rem',
              color: '#999999',
              fontWeight: 400,
              marginBottom: '0.9rem',
              lineHeight: 1.4,
            }}
          >
            {project.subtitle}
          </div>

          {/* Short Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.84rem',
              color: '#a0a0a0',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
              fontWeight: 300,
              flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* Key Metrics Quick Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.55rem',
                    color: '#666666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#e2e8f0',
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.58rem',
                  color: LANG_COLORS[tech] ?? '#888888',
                  border: `1px solid ${LANG_COLORS[tech] ?? '#888888'}35`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '2px',
                  letterSpacing: '0.05em',
                  background: `${LANG_COLORS[tech] ?? '#888888'}0c`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Action Button (Interactive Case Study Opener) */}
          <div
            style={{
              paddingTop: '1.2rem',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#666666',
                letterSpacing: '0.08em',
              }}
            >
              Detailed Architecture & UI
            </span>

            <motion.button
              type="button"
              id={`open-project-${project.id}`}
              data-project={project.id}
              onClick={(e) => {
                e.stopPropagation()
                onOpen(project)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: project.color,
                background: `${project.color}12`,
                border: `1px solid ${project.color}40`,
                padding: '0.45rem 0.9rem',
                borderRadius: '3px',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                transition: 'all 0.2s ease',
              }}
              whileHover={{
                background: project.color,
                color: '#050505',
                borderColor: project.color,
              }}
            >
              Open Project Details
              <span>→</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Modal Component for Deep Case Study View ────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 5, 5, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          background: '#0a0b12',
          border: `1px solid ${project.color}40`,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: `0 25px 70px -15px ${project.color}25, 0 0 0 1px rgba(255,255,255,0.06)`,
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.62rem',
                color: project.color,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: `1px solid ${project.color}40`,
                padding: '0.2rem 0.55rem',
                borderRadius: '2px',
                background: `${project.color}10`,
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#777777',
              }}
            >
              Case Study & Technical Breakdown
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#cccccc',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.15)'
              el.style.color = '#ffffff'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.05)'
              el.style.color = '#cccccc'
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div style={{ overflowY: 'auto', padding: '2rem', flex: 1 }}>
          {/* Hero Preview Visual */}
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              background: '#040508',
            }}
          >
            <img
              src={project.image}
              alt={project.name}
              style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1.25rem',
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#e2e8f0',
              }}
            >
              UI Showcase & Architecture Visualization
            </div>
          </div>

          {/* Title & Subtitle */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                margin: '0 0 0.5rem 0',
              }}
            >
              {project.name}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#a0a0a0',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* 4 KPIs / Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${project.color}30`,
                  borderRadius: '6px',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem',
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '0.25rem',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: project.color,
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Overview Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#4a90b8',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              System Overview
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                color: '#d0d0d0',
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Technical Architecture Breakdown */}
          <div
            style={{
              marginBottom: '2.5rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: project.color,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Architecture & Data Flow
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: '#bbbbbb',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {project.architecture}
            </p>
          </div>

          {/* Core Highlights & Modules */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#4a90b8',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Key Capabilities & Engineering Features
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '0.85rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ color: project.color, fontSize: '0.8rem', marginTop: '0.1rem' }}>
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.88rem',
                      color: '#cccccc',
                      lineHeight: 1.6,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Pills */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#777777',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.85rem',
              }}
            >
              Delivered Modules
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.deliverables.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#e2e8f0',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '3px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#777777',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.85rem',
              }}
            >
              Technology Stack
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: LANG_COLORS[tech] ?? '#ffffff',
                    border: `1px solid ${LANG_COLORS[tech] ?? '#ffffff'}40`,
                    padding: '0.35rem 0.75rem',
                    borderRadius: '3px',
                    background: `${LANG_COLORS[tech] ?? '#ffffff'}10`,
                    letterSpacing: '0.08em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#666666',
            }}
          >
            Ready to build a similar experience?
          </span>

          <a
            href="#contact"
            onClick={onClose}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#050505',
              background: '#c8f0ff',
              textDecoration: 'none',
              padding: '0.5rem 1.1rem',
              borderRadius: '3px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              transition: 'opacity 0.2s ease',
            }}
          >
            Initiate Project Brief →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Portfolio Section Component ─────────────────────────────────────────
export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="portfolio"
      style={{ background: '#050505', padding: '8rem 6vw', position: 'relative' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: '#4a90b8' }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#4a90b8',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Selected Work & Deployments
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <h2
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
              Proven Deployments.
              <br />
              <span style={{ color: '#1a1a1a', WebkitTextStroke: '1px #555555' }}>
                Full-Stack & 3D.
              </span>
            </h2>

            {/* Header Badge (Git link replaced with status badge) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#999999',
                  letterSpacing: '0.1em',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '3px',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 10px #22c55e',
                    display: 'inline-block',
                  }}
                />
                4 Interactive Case Studies
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2-Column Responsive Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
