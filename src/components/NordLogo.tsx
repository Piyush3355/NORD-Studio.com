/**
 * NordLogo — Reusable NORD Studio brand mark.
 *
 * Renders an isometric 3D cube SVG icon whose internal geometric planes
 * form a sharp architectural "N" in warm amber/gold (#F59E0B), paired with
 * the "NORD" wordmark in bold white and a small "STUDIO" superscript.
 *
 * Props:
 *   size    — controls icon size in px (default: 28)
 *   variant — "full" (icon + wordmark) | "icon" (cube only)
 */
import type { CSSProperties } from 'react'

interface NordLogoProps {
  size?: number
  variant?: 'full' | 'icon'
  className?: string
  style?: CSSProperties
}

export default function NordLogo({
  size = 28,
  variant = 'full',
  className,
  style,
}: NordLogoProps) {
  const w = size
  const h = size
  const cx = w / 2
  const cy = h / 2

  const r  = w * 0.48   // outer radius
  const ri = r * 0.88   // inner radius (depth planes)

  // ── Isometric cube face polygon points ──────────────────────────────────
  // Top face (lightest amber)
  const topFace   = `${cx},${cy - r * 0.92}  ${cx + ri * 0.86},${cy - ri * 0.44}  ${cx},${cy}  ${cx - ri * 0.86},${cy - ri * 0.44}`
  // Left face (mid amber)
  const leftFace  = `${cx - ri * 0.86},${cy - ri * 0.44}  ${cx},${cy}  ${cx},${cy + r * 0.92}  ${cx - ri * 0.86},${cy + ri * 0.44}`
  // Right face (dark amber for depth)
  const rightFace = `${cx + ri * 0.86},${cy - ri * 0.44}  ${cx},${cy}  ${cx},${cy + r * 0.92}  ${cx + ri * 0.86},${cy + ri * 0.44}`

  // ── "N" strokes projected over cube faces ───────────────────────────────
  const sw = size * 0.075  // stroke width
  const nPath = [
    `M ${cx - ri * 0.55} ${cy + ri * 0.18} L ${cx - ri * 0.55} ${cy + ri * 0.84}`,
    `M ${cx + ri * 0.55} ${cy - ri * 0.18} L ${cx + ri * 0.55} ${cy + ri * 0.62}`,
    `M ${cx - ri * 0.55} ${cy + ri * 0.18} L ${cx + ri * 0.55} ${cy + ri * 0.62}`,
  ].join(' ')

  const cubeIcon = (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <defs>
        <filter id="ng" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Cube faces */}
      <polygon points={topFace}   fill="#F59E0B" fillOpacity="0.96" />
      <polygon points={leftFace}  fill="#D97706" fillOpacity="0.92" />
      <polygon points={rightFace} fill="#B45309" fillOpacity="0.88" />

      {/* Edge highlights */}
      <polygon points={topFace}   fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.55" />
      <polygon points={leftFace}  fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.55" />
      <polygon points={rightFace} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.55" />

      {/* Spine */}
      <line x1={cx} y1={cy - r * 0.9} x2={cx} y2={cy + r * 0.9}
            stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" />

      {/* Architectural N mark */}
      <path
        d={nPath}
        stroke="rgba(255,255,255,0.93)"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ng)"
      />
    </svg>
  )

  if (variant === 'icon') return cubeIcon

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.3,
        userSelect: 'none',
        ...style,
      }}
    >
      {cubeIcon}

      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
            fontSize: size * 0.75,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.08em',
            lineHeight: 1,
          }}
        >
          NORD
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Inter', monospace",
            fontSize: size * 0.29,
            fontWeight: 600,
            color: '#F59E0B',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginLeft: 2,
          }}
        >
          Studio
        </span>
      </span>
    </span>
  )
}
