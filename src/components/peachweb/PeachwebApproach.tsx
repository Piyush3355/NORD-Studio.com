import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
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
        padding: 'clamp(40px, 6vh, 70px) clamp(20px, 4vw, 40px)',
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
          50% { transform: translateY(-4px); }
        }
        @keyframes cursor-click {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.85); }
        }
        @keyframes bar-grow {
          0%, 100% { transform: scaleY(0.9); }
          50% { transform: scaleY(1.05); }
        }
        .approach-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }
        .approach-card {
          grid-column: span 12;
        }
        @media (min-width: 768px) {
          .approach-card-builder {
            grid-column: span 6;
          }
          .approach-card-ux {
            grid-column: span 6;
          }
          .approach-card-responsive {
            grid-column: span 12;
          }
        }
        @media (min-width: 1024px) {
          .approach-card-3d {
            grid-column: span 7 !important;
          }
          .approach-card-seo {
            grid-column: span 5 !important;
          }
          .approach-card-builder {
            grid-column: span 4 !important;
          }
          .approach-card-ux {
            grid-column: span 4 !important;
          }
          .approach-card-responsive {
            grid-column: span 4 !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ maxWidth: 700, marginBottom: 'clamp(24px, 4vh, 34px)' }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: 10,
            }}
          >
            OUR APPROACH
          </div>

          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 10px 0',
            }}
          >
            Where your ambition meets velocity.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.925rem',
              lineHeight: 1.45,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
            }}
          >
            We combine creative design with strategic development to deliver exceptional results.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="approach-grid">
          {/* Card 1: 3D Web Design (7 cols) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="approach-card approach-card-3d"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 195,
              background: 'linear-gradient(145deg, #161820 0%, #0c0d12 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 24px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
            }}
          >
            {/* Minimalist 3D Wireframe Graphic */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 18,
                width: 110,
                height: 105,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg
                width="105"
                height="100"
                viewBox="0 0 200 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 115, 56, 0.25))',
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

                {/* Coordinate Axes Labels */}
                <text x="148" y="70" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+X</text>
                <text x="44" y="70" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+Y</text>
                <text x="105" y="44" fill="#ffa372" fontSize="9" fontFamily="'Inter', monospace" fontWeight="600">+Z</text>
              </svg>
            </div>

            {/* Subtle Grid Pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Top: Badge & Title */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: 'rgba(255, 115, 56, 0.12)',
                  border: '1px solid rgba(255, 115, 56, 0.35)',
                  color: '#ff9e66',
                  fontSize: '9.5px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                <span style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: '#ff7338', boxShadow: '0 0 5px #ff7338' }} />
                WebGL • Interactive 3D
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(1.25rem, 1.8vw, 1.45rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                3D Web Design
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 360, marginTop: 12 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.84rem',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                }}
              >
                Creating visually stunning and interactive 3D websites that captivate your audience.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Local SEO (5 cols) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="approach-card approach-card-seo"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 195,
              background: 'linear-gradient(145deg, #121820 0%, #090e14 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 24px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
            }}
          >
            {/* Compact 3D Radar Scanner */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 16,
                width: 95,
                height: 95,
                borderRadius: '50%',
                border: '1px solid rgba(0, 230, 180, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 12,
                  borderRadius: '50%',
                  border: '1px dashed rgba(0, 230, 180, 0.25)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 26,
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 230, 180, 0.35)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'rgba(0, 230, 180, 0.35)',
                  animation: 'pulse-radar 2.4s ease-out infinite',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#00e6b4',
                  boxShadow: '0 0 10px #00e6b4',
                }}
              />
            </div>

            {/* Top: Badge & Title */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: 'rgba(0, 230, 180, 0.12)',
                  border: '1px solid rgba(0, 230, 180, 0.35)',
                  color: '#00e6b4',
                  fontSize: '9.5px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                <span style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: '#00e6b4', boxShadow: '0 0 5px #00e6b4' }} />
                Google 3-Pack • Rank #1
              </div>

              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(1.25rem, 1.8vw, 1.45rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Local SEO
              </h3>

              {/* Compact Metrics */}
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10.5px',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ color: '#00e6b4' }}>+340%</strong> Traffic
                </span>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10.5px',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ color: '#ffb347' }}>4.9 ★</strong> Rating
                </span>
              </div>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 2, marginTop: 12 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.84rem',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Optimizing your online presence to attract more local customers and boost visibility.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Business Builder (4 cols) */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="approach-card approach-card-builder"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 180,
              background: 'linear-gradient(145deg, #141722 0%, #0c0e16 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '18px 20px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
            }}
          >
            {/* Compact Growth Bars */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 75,
                height: 44,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 5,
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
                    width: 10,
                    height: `${bar.h}%`,
                    borderRadius: '3px 3px 1px 1px',
                    background: `linear-gradient(to top, ${bar.c}, #8ab4ff)`,
                    boxShadow: i === 3 ? '0 0 10px rgba(88, 140, 255, 0.6)' : 'none',
                    animation: `bar-grow ${2.2 + i * 0.3}s ease-in-out infinite alternate`,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>

            {/* Top: Badge & Title */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2.5px 7px',
                  borderRadius: 999,
                  background: 'rgba(88, 140, 255, 0.15)',
                  border: '1px solid rgba(88, 140, 255, 0.3)',
                  color: '#8ab4ff',
                  fontSize: '9.5px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                <span>↑ 185%</span> Scaled Growth
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Business Builder
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1, marginTop: 10 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.825rem',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                }}
              >
                Comprehensive solutions to help local businesses establish and grow their digital footprint.
              </p>
            </div>
          </motion.div>

          {/* Card 4: User Experience (4 cols) */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="approach-card approach-card-ux"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 180,
              background: 'linear-gradient(145deg, #2b1812 0%, #160d0a 100%)',
              border: '1px solid rgba(255, 138, 88, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '18px 20px',
              boxShadow: '0 12px 30px rgba(119, 58, 32, 0.3)',
            }}
          >
            {/* Compact UX Mockup */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 14,
                width: 80,
                height: 52,
                perspective: 600,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 6,
                  width: 58,
                  height: 35,
                  borderRadius: 6,
                  background: 'rgba(255, 115, 56, 0.1)',
                  border: '1px solid rgba(255, 115, 56, 0.2)',
                  transform: 'rotate(8deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 0,
                  width: 65,
                  height: 40,
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 138, 88, 0.4)',
                  padding: '5px 6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transform: 'rotate(-4deg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 14, height: 2.5, borderRadius: 1.5, background: 'rgba(255,255,255,0.4)' }} />
                  <div
                    style={{
                      width: 14,
                      height: 8,
                      borderRadius: 4,
                      background: '#ff7338',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 1,
                    }}
                  >
                    <div style={{ width: 5.5, height: 5.5, borderRadius: '50%', background: '#ffffff', marginLeft: 'auto' }} />
                  </div>
                </div>
                <div style={{ alignSelf: 'flex-end', color: '#ff9e66', fontSize: '10px', animation: 'cursor-click 1.8s ease-in-out infinite' }}>
                  ↖
                </div>
              </div>
            </div>

            {/* Top: Badge & Title */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2.5px 7px',
                  borderRadius: 999,
                  background: 'rgba(255, 115, 56, 0.18)',
                  border: '1px solid rgba(255, 115, 56, 0.35)',
                  color: '#ffa372',
                  fontSize: '9.5px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                <span>★ 99.4%</span> Flow Score
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                User Experience
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1, marginTop: 10 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.825rem',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                }}
              >
                Designing intuitive and engaging user journeys for optimal interaction and conversion.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Responsive (4 cols) */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
            className="approach-card approach-card-responsive"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 180,
              background: 'linear-gradient(145deg, #131924 0%, #0a0e16 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '18px 20px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
            }}
          >
            {/* Compact Responsive Wireframe */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 14,
                width: 80,
                height: 52,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 12,
                  width: 60,
                  height: 38,
                  borderRadius: 5,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(0, 200, 255, 0.3)',
                  padding: 3,
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ width: '80%', height: 2.5, borderRadius: 1.5, background: 'rgba(0, 200, 255, 0.3)' }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 25,
                  height: 35,
                  borderRadius: 5,
                  background: 'rgba(10, 15, 25, 0.9)',
                  border: '1.2px solid rgba(0, 200, 255, 0.6)',
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: 6, height: 1.2, borderRadius: 1, background: 'rgba(255,255,255,0.4)', alignSelf: 'center' }} />
                <div style={{ width: '100%', height: 13, borderRadius: 2.5, background: 'rgba(0, 200, 255, 0.15)', border: '0.8px dashed rgba(0, 200, 255, 0.3)' }} />
                <div style={{ width: 4, height: 4, borderRadius: '50%', border: '0.8px solid rgba(255,255,255,0.3)', alignSelf: 'center' }} />
              </div>
            </div>

            {/* Top: Badge & Title */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2.5px 7px',
                  borderRadius: 999,
                  background: 'rgba(0, 200, 255, 0.12)',
                  border: '1px solid rgba(0, 200, 255, 0.3)',
                  color: '#38d5ff',
                  fontSize: '9.5px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                <span>4K → Mobile</span> Fluid
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Responsive
              </h3>
            </div>

            {/* Bottom: Description */}
            <div style={{ position: 'relative', zIndex: 1, marginTop: 10 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.825rem',
                  lineHeight: 1.45,
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
