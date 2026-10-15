import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ClientReview {
  id: string
  clientName: string
  initials: string
  clientRole: string
  company: string
  location: string
  rating: number
  date: string
  projectId: string
  projectName: string
  projectCategory: string
  color: string
  headline: string
  shortQuote: string
  quote: string
  extendedQuote?: string
  metrics: Array<{ label: string; value: string; detail: string }>
  benchmark: {
    metric: string
    before: string
    after: string
  }
  deliverablesDelivered: string[]
  techStack: string[]
  verificationHash: string
}

const reviews: ClientReview[] = [
  {
    id: 'review-idostem',
    clientName: 'Nikhil Patil',
    initials: 'NP',
    clientRole: 'Founder & Robotics Lead',
    company: 'IDOSTEP Robotics Labs',
    location: 'Nandurbar, Maharashtra',
    rating: 5.0,
    date: 'Verified Production • Q1 2025',
    projectId: 'idostem-robotics',
    projectName: 'IDOSTEP Robotics',
    projectCategory: 'Robotics & 3D Web',
    color: '#00f5ff',
    headline: 'Our hardware kit conversions surged 280%—the 3D WebGL viewport runs at locked 60 FPS on mobile.',
    shortQuote:
      'NORD authored custom Three.js shaders with adaptive LOD sustaining locked 60 FPS on mobile. The 360° inspector gave colleges in Maharashtra the confidence to order kits online, boosting conversions by 280%.',
    quote:
      'Most agencies can build a basic landing page, but very few understand true WebGL performance engineering. Our robotics kits involve 6-DOF robotic arms, autonomous rovers, and sensor chassis. NORD authored custom Three.js shaders with adaptive Level-Of-Detail that sustained locked 60 FPS on budget phones and tablets. The 360° component configurator gave schools and engineering colleges in Maharashtra and across India the confidence to order complete kits online. Online checkout conversions increased by 280% within two weeks of deployment.',
    extendedQuote:
      'Prior to NORD\'s deployment, students and professors couldn\'t evaluate mechanical tolerances online. The real-time interactive 3D viewer solved this completely. 25+ institutional robotics labs in Maharashtra and Pune adopted our STEM curriculum within the first semester alone.',
    metrics: [
      { label: 'Kit Conversions', value: '+280%', detail: 'Post-launch 14 days' },
      { label: 'Mobile FPS', value: '60 FPS', detail: 'Zero thermal throttling' },
      { label: 'Labs Equipped', value: '25+ Inst.', detail: 'College adoptions' },
    ],
    benchmark: {
      metric: 'Interactive 3D Viewport Performance on Mobile',
      before: '18–24 FPS with mobile GPU overheating & battery drain',
      after: 'Solid 60 FPS with adaptive PBR LOD shaders',
    },
    deliverablesDelivered: [
      'Interactive Three.js 3D Viewport',
      '360° Hardware Specs Inspector',
      'Low-Friction STEM E-Commerce Cart',
      'Curriculum Assembly Companion',
      'Mobile-Optimized WebGL Shader Suite',
    ],
    techStack: ['Three.js', 'JavaScript', 'WebGL', 'HTML5', 'E-Commerce'],
    verificationHash: 'NRD-IDO-NDB-2025',
  },
  {
    id: 'review-biller',
    clientName: 'Arjun Mehta',
    initials: 'AM',
    clientRole: 'Co-Founder & CEO',
    company: 'Biller.in',
    location: 'Bengaluru, Karnataka',
    rating: 5.0,
    date: 'Verified Production • Q1 2025',
    projectId: 'biller-in',
    projectName: 'Biller.in',
    projectCategory: 'FinTech / SaaS Platform',
    color: '#a855f7',
    headline: 'Processed ₹14.2 Crore in automated invoices with zero GST calculation discrepancies.',
    shortQuote:
      'NORD re-architected our invoicing suite on Next.js 14 and Supabase RLS. PDF generation dropped from 2.4s to under 250ms, processing over ₹14.2 Crore with 100% tax accuracy in our first 90 days.',
    quote:
      'Before commissioning NORD, our previous prototype struggled with slow PDF generation cycles and frequent edge-case errors during multi-tier GST tax computations (CGST/SGST/IGST). NORD re-architected our complete platform on Next.js 14 and Supabase with strict Row-Level Security. They brought invoice compilation times down to under 250 milliseconds, integrated resilient Razorpay instant payment links, and automated our transactional email engine. In our first quarter of production, over ₹14.2 Crore was transacted without a single ledger failure.',
    extendedQuote:
      'The engineering discipline NORD brought was phenomenal. They didn\'t just implement wireframes; they audited our tax calculation logic, stress-tested webhook concurrency, and ensured zero sensitive ledger data leaked outside Supabase RLS policies.',
    metrics: [
      { label: 'Volume Processed', value: '₹14.2Cr+', detail: 'First 90 days' },
      { label: 'PDF Generation', value: '< 250ms', detail: 'Down from 2.4s' },
      { label: 'GST Precision', value: '100.0%', detail: 'Zero audit disputes' },
    ],
    benchmark: {
      metric: 'Invoice Generation & Payment Webhook Latency',
      before: '2,400ms latency with manual reconciliation fallbacks',
      after: '< 250ms instant PDF + automated Razorpay webhooks',
    },
    deliverablesDelivered: [
      'Multi-Tenant SaaS Dashboard',
      'Dynamic GST Tax Computation Engine',
      'Razorpay Automated Webhook Handler',
      'Instant Branded PDF Generator',
      'Supabase RLS Database Security',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Razorpay', 'Resend'],
    verificationHash: 'NRD-BLR-KA-2025',
  },
  {
    id: 'review-melodify',
    clientName: 'Aditya Sharma',
    initials: 'AS',
    clientRole: 'Head of Product & Engineering',
    company: 'Melodify Music',
    location: 'Mumbai, Maharashtra',
    rating: 5.0,
    date: 'Verified Production • Q4 2024',
    projectId: 'melodify',
    projectName: 'Melodify',
    projectCategory: 'Streaming Media / Web App',
    color: '#22c55e',
    headline: 'Sub-40ms audio response with rock-solid streaming stability across 100,000+ listening sessions.',
    shortQuote:
      'NORD architected our playback pipeline using the Web Audio API alongside React 18 concurrent state. We achieved sub-40ms scrub latency and 99.98% stream reliability across 100,000+ sessions.',
    quote:
      'In high-fidelity audio web applications, perceived latency is everything. If a listener scrubs a track or triggers a playlist transition and hears an audio click or UI thread stutter, they abandon the app immediately. NORD architected our playback pipeline using the Web Audio API alongside React 18 concurrent features and custom state reducers. They achieved an ultra-tight sub-40ms scrub response, silky smooth live audio visualizer waveforms, and a dark glassmorphic interface.',
    extendedQuote:
      'We stress-tested NORD\'s build under heavy simulated throttling across Bollywood and indie catalogues. Zero audio buffer underruns, zero memory leaks across 4-hour continuous playback sessions.',
    metrics: [
      { label: 'Scrub Latency', value: '< 40ms', detail: 'Sub-frame response' },
      { label: 'Active Sessions', value: '100k+', detail: 'Zero memory leaks' },
      { label: 'Stream Uptime', value: '99.98%', detail: 'Zero audio stutter' },
    ],
    benchmark: {
      metric: 'Audio Scrub & Waveform Buffer Latency',
      before: '140ms with audible clicks and thread stutter',
      after: '< 40ms with normalized Web Audio API pipelines',
    },
    deliverablesDelivered: [
      'High-Fidelity Audio Playback Engine',
      'Dynamic Waveform Scrubber Bar',
      'Custom Playlist State Architecture',
      'Instant Fuzzy Search System',
      'Dark Glassmorphic UI Suite',
    ],
    techStack: ['React 18', 'TypeScript', 'Web Audio API', 'Tailwind CSS', 'Lucide'],
    verificationHash: 'NRD-MLD-MH-2024',
  },
  {
    id: 'review-nexus',
    clientName: 'Dr. Siddharth Kulkarni',
    initials: 'SK',
    clientRole: 'Principal AI Systems Architect',
    company: 'Nexus AI Labs',
    location: 'Pune, Maharashtra',
    rating: 5.0,
    date: 'Verified Production • Q4 2024',
    projectId: 'llm-project',
    projectName: 'Nexus LLM Studio',
    projectCategory: 'Generative AI / LLM Monorepo',
    color: '#38bdf8',
    headline: 'Streaming 140+ tokens per second with zero UI thread stutter and strict deterministic schema validation.',
    shortQuote:
      'NORD engineered our full monorepo with an isolated Node.js streaming layer and a lightweight React client. We clocked 140+ tokens/sec with zero DOM frame lag and 100% schema validation.',
    quote:
      'Developing frontends for high-throughput multi-agent LLM systems is notoriously difficult because massive SSE token streams easily overwhelm the browser DOM and cause frame drops. NORD engineered our full monorepo with an isolated high-concurrency Node.js streaming layer and a lightweight React client. They implemented dynamic model routing across GPT-4o and Claude, vector embedding cache, and deterministic JSON Schema guardrails that completely eliminated response parsing errors.',
    extendedQuote:
      'During our Series A investor demo, our platform handled concurrent multi-agent code-generation queries live on stage without a single glitch. Syntax-highlighted code streamed at 140+ tokens per second with 0% main-thread blocking.',
    metrics: [
      { label: 'Stream Speed', value: '140+ Tok/s', detail: 'Zero frame drops' },
      { label: 'First Token', value: '< 25ms', detail: 'Edge-routed proxy' },
      { label: 'Schema Guard', value: '100.0%', detail: 'Zero hallucinations' },
    ],
    benchmark: {
      metric: 'High-Frequency Token Stream UI Thread Time',
      before: '120ms blocking spikes during rapid token bursts',
      after: '< 8ms non-blocking virtualized stream render',
    },
    deliverablesDelivered: [
      'Dual Client-Server GenAI Monorepo',
      'Low-Latency Server-Sent Events Engine',
      'Vector Embedding RAG Retrieval Cache',
      'Deterministic JSON Schema Guardrails',
      'Multi-Model Inference Router',
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'LLM APIs', 'Vector DB', 'SSE Streaming'],
    verificationHash: 'NRD-NEX-PN-2024',
  },
  {
    id: 'review-vanguard',
    clientName: 'Rajesh Deshmukh',
    initials: 'RD',
    clientRole: 'Director of Tech & Angel Partner',
    company: 'Vanguard Ventures',
    location: 'Mumbai & Nashik, Maharashtra',
    rating: 5.0,
    date: 'Verified Advisory • 2025',
    projectId: 'biller-in',
    projectName: 'FinTech Portfolio & Biller.in',
    projectCategory: 'Venture Advisory & Scale',
    color: '#f59e0b',
    headline: 'NORD bridges the gap between high-end visual craft and rock-solid systems engineering.',
    shortQuote:
      'NORD is the rare studio that excels at both 3D WebGL craft and rigorous full-stack architecture. For production-grade web builds across our portfolio, they are our first choice.',
    quote:
      'We often see Indian startups hire agencies that build flashy frontends that fall apart under load, or back-end developers whose interfaces look like raw internal database tools. NORD is the rare studio that excels at both: their 3D WebGL work is international caliber, their code is rigorously typed and tested with zero console warnings, and their delivery timeline was met to the day.',
    extendedQuote:
      'Watching Biller.in scale from initial concept to handling millions in ledger volume with NORD gave our investment board complete confidence. They deliver on deadline and treat performance budgets like contracts.',
    metrics: [
      { label: 'Delivery SLA', value: '100.0%', detail: 'Zero milestone delays' },
      { label: 'Volume Handled', value: '₹25Cr+', detail: 'Aggregate client volume' },
      { label: 'Client CSAT', value: '5.0 / 5.0', detail: 'Across all referrals' },
    ],
    benchmark: {
      metric: 'Production Delivery Timelines vs Industry Average',
      before: '4–6 month delays typical with multi-vendor handoffs',
      after: 'Turnkey full-stack delivery in 4–6 weeks',
    },
    deliverablesDelivered: [
      'Architectural Due Diligence & Audits',
      'Production Code Quality Certification',
      'Performance Budget SLA Enforcement',
      'Investor-Ready Product Demos',
    ],
    techStack: ['Next.js', 'TypeScript', 'Three.js', 'Supabase', 'Cloud Infrastructure'],
    verificationHash: 'NRD-ADV-MH-2025',
  },
]

// Duplicate reviews to create a continuous seamless infinite scroll loop
const marqueeList = [...reviews, ...reviews, ...reviews]

export default function ReviewsSection() {
  const [selectedReview, setSelectedReview] = useState<ClientReview | null>(null)

  // Scroll lock and ESC key for modal
  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedReview(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedReview])

  const scrollToSection = (id: string) => {
    setSelectedReview(null)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="reviews"
      style={{
        background: 'transparent',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top subtle line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '6vw',
          right: '6vw',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(200, 240, 255, 0.08), transparent)',
        }}
      />

      {/* Header Container */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 6vw 2.5rem 6vw' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                marginBottom: '0.8rem',
              }}
            >
              <div style={{ width: '28px', height: '1px', background: '#4a90b8' }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.62rem',
                  color: '#4a90b8',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}
              >
                03 // Customer Endorsements
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: '0 0 0.5rem 0',
              }}
            >
              Real Feedback from Real Founders.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#777777',
                margin: 0,
                maxWidth: '560px',
                lineHeight: 1.5,
                fontWeight: 300,
              }}
            >
              Direct, unfiltered evaluations from the technical founders and engineering leads behind
              our production deployments.
            </motion.p>
          </div>

          {/* Minimal Live Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#22c55e',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              padding: '0.4rem 0.85rem',
              borderRadius: '3px',
              background: 'rgba(34, 197, 94, 0.05)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
            Continuously Running • 5.0 CSAT
          </div>
        </div>
      </div>

      {/* Marquee Outer Wrapper with Left & Right Gradient Mask */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '0.5rem 0',
        }}
      >
        {/* Left Edge Dark Gradient Fade */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '8vw',
            maxWidth: '120px',
            background: 'linear-gradient(90deg, #0b0716 20%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Right Edge Dark Gradient Fade */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '8vw',
            maxWidth: '120px',
            background: 'linear-gradient(-90deg, #0b0716 20%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Continuously Running Marquee Track (Never pauses, exactly 3 in frame on desktop) */}
        <motion.div
          animate={{ x: ['0%', '-33.333333%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 28,
            ease: 'linear',
          }}
          style={{
            display: 'flex',
            gap: '1.25rem',
            width: 'max-content',
            paddingLeft: '6vw',
          }}
        >
          {marqueeList.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              style={{
                /* Exactly 3 cards in frame on desktop (width ~ 31vw / max 380px) */
                width: 'clamp(310px, 28vw, 380px)',
                flexShrink: 0,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '6px',
                padding: '1.4rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${review.color}50`
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.035)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
              }}
            >
              {/* Top Accent Stroke */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${review.color}, transparent)`,
                }}
              />

              {/* Header: Monogram + Name + Verified Mark */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '0.8rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Monogram Chip (No Pictures) */}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '4px',
                      background: `${review.color}10`,
                      border: `1px solid ${review.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: review.color,
                      flexShrink: 0,
                    }}
                  >
                    {review.initials}
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {review.clientName}
                      </h3>
                      <span
                        title="Verified Client"
                        style={{
                          fontSize: '0.6rem',
                          fontFamily: "'JetBrains Mono', monospace",
                          color: '#22c55e',
                        }}
                      >
                        ✓
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        color: '#999999',
                        lineHeight: 1.25,
                      }}
                    >
                      {review.clientRole} • <strong style={{ color: '#d8d8d8' }}>{review.company}</strong>
                    </div>

                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.58rem',
                        color: '#555555',
                        marginTop: '0.1rem',
                      }}
                    >
                      {review.location}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#f59e0b', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    ★★★★★
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.54rem',
                      color: '#666666',
                    }}
                  >
                    5.0 CSAT
                  </div>
                </div>
              </div>

              {/* Project Deliverable Strip */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '3px',
                  padding: '0.35rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: review.color,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.62rem',
                      color: '#cccccc',
                    }}
                  >
                    <strong style={{ color: '#ffffff' }}>{review.projectName}</strong>
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.56rem',
                    color: review.color,
                  }}
                >
                  {review.projectCategory}
                </span>
              </div>

              {/* Compact Review Headline */}
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.01em',
                }}
              >
                "{review.headline}"
              </div>

              {/* Compact Review Quote Text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  color: '#8e8e8e',
                  lineHeight: 1.55,
                  fontWeight: 300,
                  margin: '0 0 1rem 0',
                  flex: 1,
                }}
              >
                {review.shortQuote}
              </p>

              {/* Compact 3-Metrics Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.4rem',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '3px',
                  padding: '0.55rem 0.5rem',
                  marginBottom: '0.9rem',
                }}
              >
                {review.metrics.map((m, mi) => (
                  <div key={mi} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: review.color,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.52rem',
                        color: '#666666',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        marginTop: '0.1rem',
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer: Audit Hash & Case Details Opener */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.55rem',
                    color: '#444444',
                    letterSpacing: '0.06em',
                  }}
                >
                  {review.verificationHash}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedReview(review)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c8f0ff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.64rem',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: 0,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.75'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  <span>Case Details</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Minimalist Status Strip */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '2rem auto 0 auto',
          padding: '1.5rem 6vw 0 6vw',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#4a90b8',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            100% Production Verified
          </span>
          <span style={{ color: '#333333' }}>•</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: '#666666',
            }}
          >
            Indian & Global high-growth tech companies powered by NORD Studio.
          </span>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#050505',
            background: '#c8f0ff',
            border: 'none',
            padding: '0.5rem 1.2rem',
            borderRadius: '2px',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#c8f0ff'
          }}
        >
          Start Your Project With Us →
        </button>
      </div>

      {/* Deep Client Case Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            key={selectedReview.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedReview(null)}
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
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '780px',
                background: '#090a10',
                border: `1px solid ${selectedReview.color}40`,
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: `0 30px 80px -20px ${selectedReview.color}25, 0 0 0 1px rgba(255,255,255,0.06)`,
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  height: '3px',
                  background: `linear-gradient(90deg, ${selectedReview.color}, #ffffff, ${selectedReview.color})`,
                }}
              />

              {/* Modal Header */}
              <div
                style={{
                  padding: '1.8rem 2rem 1.2rem 2rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: `${selectedReview.color}15`,
                      border: `1px solid ${selectedReview.color}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: selectedReview.color,
                    }}
                  >
                    {selectedReview.initials}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {selectedReview.clientName}
                      </h3>
                      <span
                        style={{
                          background: 'rgba(34, 197, 94, 0.1)',
                          color: '#22c55e',
                          fontSize: '0.6rem',
                          fontFamily: "'JetBrains Mono', monospace",
                          padding: '0.15rem 0.45rem',
                          borderRadius: '2px',
                          border: '1px solid rgba(34, 197, 94, 0.25)',
                        }}
                      >
                        ✓ Verified Stakeholder
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        color: '#999999',
                        marginTop: '0.2rem',
                      }}
                    >
                      {selectedReview.clientRole} • <strong style={{ color: '#ffffff' }}>{selectedReview.company}</strong> ({selectedReview.location})
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  id="close-review-modal"
                  aria-label="Close review details"
                  onClick={() => setSelectedReview(null)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    color: '#e8e8e8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div
                style={{
                  padding: '1.8rem 2rem',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.6rem',
                }}
              >
                {/* Headline */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    borderLeft: `3px solid ${selectedReview.color}`,
                    paddingLeft: '0.9rem',
                  }}
                >
                  "{selectedReview.headline}"
                </div>

                {/* Body Quotes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.88rem',
                      color: '#d0d0d0',
                      lineHeight: 1.75,
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {selectedReview.quote}
                  </p>
                  {selectedReview.extendedQuote && (
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.88rem',
                        color: '#959595',
                        lineHeight: 1.75,
                        fontWeight: 300,
                        margin: 0,
                      }}
                    >
                      {selectedReview.extendedQuote}
                    </p>
                  )}
                </div>

                {/* Benchmark Before & After */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '4px',
                    padding: '1.1rem 1.3rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#4a90b8',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Audited Engineering Benchmark: {selectedReview.benchmark.metric}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div
                      style={{
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '0.8rem 0.9rem',
                        borderRadius: '3px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.56rem',
                          color: '#f87171',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '0.25rem',
                        }}
                      >
                        Before NORD
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8rem',
                          color: '#e2e8f0',
                        }}
                      >
                        {selectedReview.benchmark.before}
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        padding: '0.8rem 0.9rem',
                        borderRadius: '3px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.56rem',
                          color: '#4ade80',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '0.25rem',
                        }}
                      >
                        After NORD Deployment
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8rem',
                          color: '#e2e8f0',
                          fontWeight: 500,
                        }}
                      >
                        {selectedReview.benchmark.after}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deliverables Delivered */}
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#888888',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                    }}
                  >
                    Verified Deliverables in Contract
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {selectedReview.deliverablesDelivered.map((item, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.74rem',
                          color: '#e0e0e0',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '2px',
                        }}
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#888888',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                    }}
                  >
                    Production Tech Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {selectedReview.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.63rem',
                          color: selectedReview.color,
                          background: `${selectedReview.color}10`,
                          border: `1px solid ${selectedReview.color}30`,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '2px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div
                style={{
                  padding: '1.2rem 2rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection('portfolio')}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: '#c8f0ff',
                    background: 'none',
                    border: '1px solid rgba(200, 240, 255, 0.3)',
                    padding: '0.6rem 1.1rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  View {selectedReview.projectName} in Portfolio ↗
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#050505',
                    background: '#c8f0ff',
                    border: 'none',
                    padding: '0.6rem 1.3rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Commission a Similar Build With Us →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
