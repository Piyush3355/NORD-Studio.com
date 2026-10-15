import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
}

export default function PeachwebApproach() {
  return (
    <section
      id="approach"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)',
        color: '#ffffff',
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes pulse-radar {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes cursor-click {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.85); }
        }
        @keyframes bar-grow {
          0%, 100% { transform: scaleY(0.9); }
          50% { transform: scaleY(1.05); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ maxWidth: 760, marginBottom: 'clamp(44px, 7vh, 60px)' }}
        >
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
            OUR APPROACH
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 16px 0',
            }}
          >
            Where your ambition meets velocity.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            We combine creative design with strategic development to deliver exceptional results.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 20,
          }}
        >
          {/* Card 1: 3D Web Design (Large - 7 cols) with Minimalist 3D Wireframe */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 400,
              background: 'linear-gradient(145deg, #161820 0%, #0c0d12 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(28px, 4vw, 36px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
            className="lg:col-span-7"
          >
            {/* Minimalist 3D Wireframe Geometry Graphic */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: '4%',
                width: 220,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg
                width="210"
                height="190"
                viewBox="0 0 200 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 0 16px rgba(255, 115, 56, 0.25))',
                  animation: 'float-badge 4s ease-in-out infinite',
                }}
              >
                {/* 3D Coordinate Grid Plane */}
                <g opacity="0.25" stroke="#ff7338" strokeWidth="0.8" strokeDasharray="3 3">
                  <line x1="25" y1="130" x2="175" y2="130" />
                  <line x1="100" y1="45" x2="100" y2="160" />
                  <line x1="45" y1="145" x2="155" y2="65" />
                </g>

                {/* Minimalist 3D Orbital Rings */}
                <ellipse
                  cx="100"
                  cy="95"
                  rx="75"
                  ry="24"
                  stroke="rgba(255, 115, 56, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  transform="rotate(-15 100 95)"
                />
                <ellipse
                  cx="100"
                  cy="95"
                  rx="70"
                  ry="22"
                  stroke="rgba(255, 158, 102, 0.4)"
                  strokeWidth="1.2"
                  transform="rotate(25 100 95)"
                />

                {/* Isometric 3D Cube Facets */}
                <polygon
                  points="100,50 142,72 100,96 58,72"
                  fill="rgba(255, 115, 56, 0.12)"
                  stroke="#ffa372"
                  strokeWidth="1.6"
                />
                <polygon
                  points="58,72 100,96 100,140 58,118"
                  fill="rgba(255, 115, 56, 0.05)"
                  stroke="#ff7338"
                  strokeWidth="1.6"
                />
                <polygon
                  points="100,96 142,72 142,118 100,140"
                  fill="rgba(255, 115, 56, 0.18)"
                  stroke="#ff7338"
                  strokeWidth="1.6"
                />

                {/* Inner 3D Axis Lines */}
                <g stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3">
                  <line x1="100" y1="50" x2="100" y2="96" />
                  <line x1="58" y1="118" x2="100" y2="96" />
                  <line x1="142" y1="118" x2="100" y2="96" />
                </g>

                {/* Glowing 3D Vertex Nodes */}
                {[
                  [100, 50],
                  [142, 72],
                  [100, 96],
                  [58, 72],
                  [100, 140],
                  [142, 118],
                  [58, 118],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
                    <circle cx={cx} cy={cy} r="5.5" fill="none" stroke="#ff7338" strokeWidth="1.5" opacity="0.85" />
                  </g>
                ))}

                {/* Minimalist Coordinate Axes Labels */}
                <text x="148" y="70" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+X</text>
                <text x="44" y="70" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+Y</text>
                <text x="105" y="44" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+Z</text>
              </svg>
            </div>

            {/* Subtle 3D Perspective Grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Top Row: Title & Badge */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '5px 12px',
                    borderRadius: 999,
                    background: 'rgba(255, 115, 56, 0.12)',
                    border: '1px solid rgba(255, 115, 56, 0.35)',
                    color: '#ff9e66',
                    fontSize: '11px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff7338', boxShadow: '0 0 8px #ff7338' }} />
                  WebGL • Interactive 3D
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.1rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  3D Web Design
                </h3>
              </div>
            </div>

            {/* Bottom Row: Description */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 440 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.05rem',
                  lineHeight: 1.55,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                }}
              >
                Creating visually stunning and interactive 3D websites that captivate your audience.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Local SEO (Sleek Dark Obsidian & Radar - 5 cols) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 400,
              background: 'linear-gradient(145deg, #121820 0%, #090e14 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(28px, 4vw, 36px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
            className="lg:col-span-5"
          >
            {/* 3D Radar Scanner Graphic */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 170,
                height: 170,
                borderRadius: '50%',
                border: '1px solid rgba(0, 230, 180, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              {/* Radar rings */}
              <div
                style={{
                  position: 'absolute',
                  inset: 20,
                  borderRadius: '50%',
                  border: '1px dashed rgba(0, 230, 180, 0.25)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 45,
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 230, 180, 0.35)',
                }}
              />
              {/* Radar sweep pulse */}
              <div
                style={{
                  position: 'absolute',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(0, 230, 180, 0.4)',
                  animation: 'pulse-radar 2.4s ease-out infinite',
                }}
              />
              {/* Center Map Pin Beacon */}
              <div
                style={{
                  position: 'relative',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#00e6b4',
                  boxShadow: '0 0 16px #00e6b4',
                }}
              />
            </div>

            {/* Top Row: Title & Ranking Badges */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: 'rgba(0, 230, 180, 0.12)',
                  border: '1px solid rgba(0, 230, 180, 0.35)',
                  color: '#00e6b4',
                  fontSize: '11px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e6b4', boxShadow: '0 0 6px #00e6b4' }} />
                Google 3-Pack • Rank #1
              </div>

              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.1rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Local SEO
              </h3>

              {/* Stat metrics pill */}
              <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                <div
                  style={{
                    padding: '8px 14px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ color: '#00e6b4', fontSize: '13px' }}>+340%</strong> Impressions
                </div>
                <div
                  style={{
                    padding: '8px 14px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ color: '#ffb347', fontSize: '13px' }}>4.9 ★</strong> Rating
                </div>
              </div>
            </div>

            {/* Bottom Row: Description */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                }}
              >
                Optimizing your online presence to attract more local customers and boost visibility.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Business Builder (4 cols) with 3D Growth Columns */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 340,
              background: 'linear-gradient(145deg, #141722 0%, #0c0e16 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(24px, 3.5vw, 32px)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
            className="md:col-span-4"
          >
            {/* 3D Growth Bars Background Visual */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 20,
                width: 140,
                height: 100,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 10,
                opacity: 0.85,
                pointerEvents: 'none',
              }}
            >
              {[
                { h: 32, c: 'rgba(88, 140, 255, 0.35)' },
                { h: 54, c: 'rgba(88, 140, 255, 0.55)' },
                { h: 76, c: 'rgba(88, 140, 255, 0.75)' },
                { h: 98, c: '#588cff' },
              ].map((bar, i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: `${bar.h}%`,
                    borderRadius: '6px 6px 2px 2px',
                    background: `linear-gradient(to top, ${bar.c}, #8ab4ff)`,
                    boxShadow: i === 3 ? '0 0 16px rgba(88, 140, 255, 0.6)' : 'none',
                    animation: `bar-grow ${2.2 + i * 0.3}s ease-in-out infinite alternate`,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>

            {/* Top: Title & Badge */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(88, 140, 255, 0.15)',
                  border: '1px solid rgba(88, 140, 255, 0.3)',
                  color: '#8ab4ff',
                  fontSize: '11px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <span>↑ 185%</span> Scaled Growth
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Business Builder
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.925rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Comprehensive solutions to help local businesses establish and grow their digital footprint.
              </p>
            </div>
          </motion.div>

          {/* Card 4: User Experience (4 cols) with Interactive UX Card Stack */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 340,
              background: 'linear-gradient(145deg, #2b1812 0%, #160d0a 100%)',
              border: '1px solid rgba(255, 138, 88, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(24px, 3.5vw, 32px)',
              boxShadow: '0 16px 40px rgba(119, 58, 32, 0.3)',
            }}
            className="md:col-span-4"
          >
            {/* UX Micro-Interaction Visual Mockup */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 20,
                width: 140,
                height: 95,
                perspective: 600,
                pointerEvents: 'none',
              }}
            >
              {/* Back card */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 12,
                  width: 100,
                  height: 60,
                  borderRadius: 12,
                  background: 'rgba(255, 115, 56, 0.1)',
                  border: '1px solid rgba(255, 115, 56, 0.2)',
                  transform: 'rotate(8deg)',
                }}
              />
              {/* Front glass card with toggle */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 0,
                  width: 110,
                  height: 68,
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 138, 88, 0.4)',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transform: 'rotate(-4deg)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 24, height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.4)' }} />
                  {/* Active toggle */}
                  <div
                    style={{
                      width: 26,
                      height: 14,
                      borderRadius: 10,
                      background: '#ff7338',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 2,
                    }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffffff', marginLeft: 'auto' }} />
                  </div>
                </div>
                {/* Pointer icon */}
                <div
                  style={{
                    alignSelf: 'flex-end',
                    color: '#ff9e66',
                    fontSize: '13px',
                    animation: 'cursor-click 1.8s ease-in-out infinite',
                  }}
                >
                  ↖
                </div>
              </div>
            </div>

            {/* Top: Title & Badge */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(255, 115, 56, 0.18)',
                  border: '1px solid rgba(255, 115, 56, 0.35)',
                  color: '#ffa372',
                  fontSize: '11px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <span>★ 99.4%</span> Flow Score
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                User Experience
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.925rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.85)',
                  margin: 0,
                }}
              >
                Designing intuitive and engaging user journeys for optimal interaction and conversion.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Responsive (4 cols) with Multi-Device Frame Visual */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              minHeight: 340,
              background: 'linear-gradient(145deg, #131924 0%, #0a0e16 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(24px, 3.5vw, 32px)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
            className="md:col-span-4"
          >
            {/* Multi-Device 3D Wireframe Visual */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 20,
                width: 140,
                height: 95,
                pointerEvents: 'none',
              }}
            >
              {/* Desktop Frame */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  width: 110,
                  height: 68,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(0, 200, 255, 0.3)',
                  padding: 5,
                }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ width: '80%', height: 4, borderRadius: 2, background: 'rgba(0, 200, 255, 0.3)' }} />
              </div>

              {/* Mobile Phone Mockup overlapping */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  right: 6,
                  width: 44,
                  height: 62,
                  borderRadius: 10,
                  background: 'rgba(10, 15, 25, 0.9)',
                  border: '1.5px solid rgba(0, 200, 255, 0.6)',
                  padding: 4,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: 14, height: 2, borderRadius: 2, background: 'rgba(255,255,255,0.4)', alignSelf: 'center' }} />
                <div style={{ width: '100%', height: 24, borderRadius: 4, background: 'rgba(0, 200, 255, 0.15)', border: '1px dashed rgba(0, 200, 255, 0.3)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', alignSelf: 'center' }} />
              </div>
            </div>

            {/* Top: Title & Badge */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: 'rgba(0, 200, 255, 0.12)',
                  border: '1px solid rgba(0, 200, 255, 0.3)',
                  color: '#38d5ff',
                  fontSize: '11px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                <span>4K → Mobile</span> Fluid Layout
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Responsive
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.925rem',
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Ensuring your website looks and performs flawlessly across all devices and screen sizes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

