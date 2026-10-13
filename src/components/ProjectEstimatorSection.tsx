import { useState, useRef, useCallback } from 'react'

export default function ProjectEstimatorSection() {
  // Value from 1 to 40 on the dial
  const [assetCount, setAssetCount] = useState(6)
  const [isDragging, setIsDragging] = useState(false)
  const dialRef = useRef<HTMLDivElement>(null)

  // Calculate angle from mouse position
  const handlePointer = useCallback((e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
    if (!dialRef.current) return
    const rect = dialRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY

    // Angle in degrees from 12 o'clock (0 to 360)
    let deg = Math.atan2(dx, -dy) * (180 / Math.PI)
    if (deg < 0) deg += 360

    // Map 0 - 360 degrees to 1 - 40 assets
    const mapped = Math.round((deg / 360) * 39) + 1
    setAssetCount(Math.max(1, Math.min(40, mapped)))
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    handlePointer(e)
    const onMove = (ev: PointerEvent) => handlePointer(ev)
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // Calculate plan tier based on asset count
  const isHero = assetCount <= 3
  const isEcommerce = assetCount > 3 && assetCount <= 10
  const isCatalog = assetCount > 10 && assetCount <= 22
  const tierName = isHero
    ? 'Single Hero CAD'
    : isEcommerce
    ? 'E-Commerce Suite'
    : isCatalog
    ? 'Brand 3D Catalog'
    : 'Enterprise WebGL Ecosystem'

  const tierPrice = isHero
    ? `$${(assetCount * 320).toLocaleString()}`
    : isEcommerce
    ? `$${(960 + (assetCount - 3) * 240).toLocaleString()}`
    : isCatalog
    ? `$${(2640 + (assetCount - 10) * 190).toLocaleString()}`
    : `$${(4920 + (assetCount - 22) * 160).toLocaleString()}`

  const turnaround = isHero
    ? '3–5 Business Days'
    : isEcommerce
    ? '7–12 Business Days'
    : isCatalog
    ? '3–4 Weeks'
    : 'Dedicated Monthly Sprint'

  // Knob coordinate on circle (radius = 120)
  const angleRad = ((assetCount - 1) / 39) * (2 * Math.PI) - Math.PI / 2
  const r = 120
  const knobX = 140 + r * Math.cos(angleRad)
  const knobY = 140 + r * Math.sin(angleRad)

  return (
    <section
      id="estimator"
      className="relative w-full py-28 px-6 md:px-12 select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 80%, #0a111a 0%, #050505 65%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                color: '#38bdf8',
                textTransform: 'uppercase',
              }}
            >
              04 / Transparent Scope Estimator
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
            style={{ fontFamily: "'Space Grotesk', -apple-system, sans-serif" }}
          >
            Interactive 3D Pipeline Estimator
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed font-light">
            Dial your project's 3D asset requirements to calculate delivery timelines, engineering tiers, and transparent freelance pricing. Zero surprise costs.
          </p>
        </div>

        {/* Pricing Layout: Left Circular Gauge, Right Tier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive Circular Dial */}
          <div
            className="flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl border relative"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'rgba(255, 255, 255, 0.07)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            <span
              className="text-xs uppercase tracking-widest mb-6 font-mono"
              style={{ color: '#38bdf8' }}
            >
              Drag Dial: How many 3D assets do you need?
            </span>

            <div
              ref={dialRef}
              onPointerDown={handlePointerDown}
              className="relative w-[280px] h-[280px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
              style={{ touchAction: 'none' }}
            >
              {/* SVG Circular Track */}
              <svg width="280" height="280" className="absolute inset-0">
                {/* Dotted Background Ring */}
                <circle
                  cx="140"
                  cy="140"
                  r={r}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="4"
                  strokeDasharray="4 6"
                />
                {/* Active Progress Arc */}
                <circle
                  cx="140"
                  cy="140"
                  r={r}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeDasharray={2 * Math.PI * r}
                  strokeDashoffset={2 * Math.PI * r * (1 - (assetCount - 1) / 39)}
                  strokeLinecap="round"
                  transform="rotate(-90 140 140)"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))',
                    transition: isDragging ? 'none' : 'stroke-dashoffset 0.15s ease',
                  }}
                />
              </svg>

              {/* Draggable Knob */}
              <div
                className={`absolute w-7 h-7 rounded-full bg-white border-2 border-cyan-400 shadow-xl flex items-center justify-center transition-transform ${
                  isDragging ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  left: `${knobX - 14}px`,
                  top: `${knobY - 14}px`,
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.8)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>

              {/* Center Counter */}
              <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                <span
                  className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-none font-mono"
                  style={{
                    textShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
                  }}
                >
                  {String(assetCount).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium text-neutral-400 mt-2 tracking-widest uppercase font-mono">
                  3D Assets / Models
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 mt-8">
              {[
                { count: 1, label: '1 Hero' },
                { count: 6, label: '6 Suite' },
                { count: 15, label: '15 Catalog' },
                { count: 30, label: '30 Ecosystem' },
              ].map((p) => (
                <button
                  key={p.count}
                  type="button"
                  onClick={() => setAssetCount(p.count)}
                  className="px-2.5 py-1 rounded text-[11px] font-mono border transition-all cursor-pointer"
                  style={{
                    background: assetCount === p.count ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: assetCount === p.count ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.06)',
                    color: assetCount === p.count ? '#c8f0ff' : '#777777',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-neutral-500 mt-4">
              Drag knob along circular perimeter to recalculate
            </span>
          </div>

          {/* Right Plan Card matching NORD Dark Luxury */}
          <div
            className="p-8 sm:p-10 rounded-3xl border flex flex-col justify-between"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(13, 21, 32, 0.6) 100%)',
              borderColor: 'rgba(56, 189, 248, 0.25)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                    CALCULATED SCOPE
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                  {turnaround}
                </span>
              </div>

              <h3
                className="text-3xl font-extrabold text-white mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tierName}
              </h3>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span
                  className="text-5xl sm:text-6xl font-extrabold text-cyan-300 tracking-tight font-mono"
                >
                  {tierPrice}
                </span>
                <span className="text-neutral-400 text-xs font-medium font-mono">
                  USD (Flat Project Fee)
                </span>
              </div>

              {/* Tier Specs */}
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 mb-8 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>
                    Up to <strong>{assetCount} bespoke 3D CAD/PBR models</strong> delivered
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>4K Photorealistic PBR Texture Maps (Albedo, Normal, Roughness, Metalness)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Zero dropped frames guarantee — 60 FPS verified WebGL topology</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Multi-format export: .GLB (Web), .USDZ (iOS AR QuickLook), Blender source</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Production-ready embed code snippet for React, Next.js, or Shopify</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-4 rounded-xl text-center text-sm font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer block text-decoration-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: '#c8f0ff',
                color: '#050505',
              }}
            >
              Lock In This Scope with Piyush
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
