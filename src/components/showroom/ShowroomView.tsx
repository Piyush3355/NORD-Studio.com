import { useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF, Float } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'

export type StudioBgTheme = 'studio-slate' | 'cyber-aurora' | 'warm-gallery' | 'clean-platinum'

const STUDIO_BG_PRESETS: Record<StudioBgTheme, { name: string; bg: string; accent: string }> = {
  'studio-slate': {
    name: 'Studio Slate',
    bg: 'radial-gradient(ellipse at 50% 36%, #1e293b 0%, #0f172a 45%, #06090e 82%, #020407 100%)',
    accent: '#38bdf8',
  },
  'cyber-aurora': {
    name: 'Cyber Aurora',
    bg: 'radial-gradient(ellipse at 50% 36%, #112d32 0%, #08171a 45%, #04090b 82%, #010405 100%)',
    accent: '#10b981',
  },
  'warm-gallery': {
    name: 'Warm Gallery',
    bg: 'radial-gradient(ellipse at 50% 36%, #2e231b 0%, #17110c 45%, #0a0705 82%, #040302 100%)',
    accent: '#f59e0b',
  },
  'clean-platinum': {
    name: 'Platinum Lab',
    bg: 'radial-gradient(ellipse at 50% 36%, #334155 0%, #1e293b 45%, #0b111a 82%, #03060a 100%)',
    accent: '#c8f0ff',
  },
}

interface ProductConfig {
  id: string
  tabLabel: string
  icon: string
  name: string
  marketCategory: string
  modelPath: string
  targetSize: number
  price: string
  freelanceFee: string
  turnaround: string
  summary: string
  specs: Array<{ title: string; subtitle: string; desc: string }>
}

const PRODUCTS: Record<string, ProductConfig> = {
  chronograph: {
    id: 'chronograph',
    tabLabel: 'Horizon Watch',
    icon: '⌚',
    name: 'Horizon Tourbillon Chronograph',
    marketCategory: 'Haute Horlogerie / Luxury Timepiece',
    modelPath: '/models/ChronographWatch.glb',
    targetSize: 2.35,
    price: '$14,200 USD',
    freelanceFee: '$4,500 – $6,500 USD',
    turnaround: '10–14 Business Days',
    summary: 'Luxury Swiss-calibre chronograph with high-gloss zirconium oxide bezel, multi-level tapped guilloché dial, flying tourbillon cage, and top-grain alligator strap.',
    specs: [
      {
        title: 'Guilloché Sunburst Dial',
        subtitle: 'Multi-layer Rhodium Relief with BGW9 Super-LumiNova',
        desc: 'Hand-turned tapisserie engine guilloché dial reflecting dynamic light patterns. Equipped with diamond-cut indices.',
      },
      {
        title: 'Zirconia Ceramic Bezel',
        subtitle: 'Diamond-Polished Vickers Hardness 1500 HV',
        desc: 'Sintered zirconium oxide ceramic bezel impervious to scratching, fastened with 8 functional grade-5 titanium spline screws.',
      },
      {
        title: 'Flying Tourbillon Assembly',
        subtitle: 'Hand-Chamfered Titanium Cage with Escapement',
        desc: 'Precision micro-mechanical escapement compensating for gravitational variance at 28,800 vibrations per hour.',
      },
    ],
  },
  sneaker: {
    id: 'sneaker',
    tabLabel: 'Performance Sneaker',
    icon: '👟',
    name: 'Cyber-Knit Performance Sneaker',
    marketCategory: 'High-Performance Athleisure Footwear',
    modelPath: '/models/MaterialsVariantsShoe.glb',
    targetSize: 2.45,
    price: '$380 USD',
    freelanceFee: '$2,400 – $3,600 USD',
    turnaround: '7–10 Business Days',
    summary: 'Parametrically engineered athletic running shoe featuring engineered knit upper, nitrogen-infused supercritical foam midsole, and zonal traction rubber.',
    specs: [
      {
        title: 'Engineered Dynamic Knit',
        subtitle: 'Variable-Density Hydrophobic Microfiber Weave',
        desc: 'High-tensile jacquard knit upper with targeted zones of breathability and reinforced lateral lock-down.',
      },
      {
        title: 'Supercritical Nitrogen Midsole',
        subtitle: 'Dual-Density Foam with 82% Energy Return',
        desc: 'Gas-expanded elastomer lattice structure offering exceptional rebound dynamics while maintaining ultra-low mass.',
      },
      {
        title: 'Carbon Composite Propulsion Plate',
        subtitle: 'Multi-Axial Spoon Geometry Carbon Insert',
        desc: 'Full-length prepreg carbon fiber plate engineered for explosive toe-off kinetic transfer.',
      },
    ],
  },
  chair: {
    id: 'chair',
    tabLabel: 'Designer Chair',
    icon: '🪑',
    name: 'Eames Lounge & Ottoman Reimagined',
    marketCategory: 'Architectural Furniture & Mid-Century Modern',
    modelPath: '/models/SheenChair.glb',
    targetSize: 2.5,
    price: '$6,800 USD',
    freelanceFee: '$2,800 – $4,200 USD',
    turnaround: '8–12 Business Days',
    summary: 'Iconic molded plywood lounger and ottoman with micro-faceted velvet sheen upholstery and die-cast aluminum swivel base.',
    specs: [
      {
        title: 'Molded Plywood Shell',
        subtitle: '7-Ply Cross-Laminated Santos Palisander Veneer',
        desc: 'Ergonomically contoured hardwood veneers bonded under high pressure, finished with hand-rubbed organic oil polish.',
      },
      {
        title: 'Micro-Faceted Velvet Sheen',
        subtitle: 'Dual-Tone Anisotropic Sheen Shader Material',
        desc: 'Premium velvet textile simulating real-world anisotropic light dispersion with custom roughness falloff.',
      },
      {
        title: 'Die-Cast Aluminum Base',
        subtitle: 'Five-Star Swivel Mechanism with Bronze Bushings',
        desc: 'Mirror-polished aluminum five-star swivel pedestal with hand-turned black anodized risers.',
      },
    ],
  },
  car: {
    id: 'car',
    tabLabel: 'Concept Hypercar',
    icon: '🏎️',
    name: 'Apex Hypercar Aero Concept',
    marketCategory: 'Automotive Design / Track Hypercar',
    modelPath: '/models/CarConcept.glb',
    targetSize: 2.7,
    price: '$2,400,000 USD',
    freelanceFee: '$6,500 – $9,500 USD',
    turnaround: '14–20 Business Days',
    summary: 'Track-focused electric hypercar design featuring active aero venturi tunnels, carbon monocoque cockpit, and high-downforce rear wing.',
    specs: [
      {
        title: 'Carbon Monocoque Chassis',
        subtitle: 'Autoclave Cured T1000 High-Modulus Carbon',
        desc: 'Ultra-rigid passenger safety cell with integrated roll cage and sub-1000kg targeted structural mass.',
      },
      {
        title: 'Active Venturi Aerodynamics',
        subtitle: 'Underbody Ground-Effect Downforce Channels',
        desc: 'Computational fluid dynamic optimized floor producing over 1,200kg of downforce at 250km/h.',
      },
      {
        title: 'Carbon-Ceramic Braking Suite',
        subtitle: '420mm Carbon-Silicon Discs with Monobloc Calipers',
        desc: 'Ventilated ceramic composite brake discs with 10-piston forged titanium monobloc calipers.',
      },
    ],
  },
  helmet: {
    id: 'helmet',
    tabLabel: 'Orbital Helmet',
    icon: '🪖',
    name: 'Battle-Hardened Orbital Helmet',
    marketCategory: 'Sci-Fi Props / Entertainment Asset',
    modelPath: '/models/DamagedHelmet.glb',
    targetSize: 2.3,
    price: '$4,200 USD',
    freelanceFee: '$1,800 – $2,800 USD',
    turnaround: '5–8 Business Days',
    summary: 'Photorealistic weathered helmet asset featuring procedural scratches, oxidized metal plating, and reflective polarized visor.',
    specs: [
      {
        title: 'Multi-Layer Weathered PBR',
        subtitle: 'Weathered Paint Chipping, Rust, and Scratches',
        desc: 'Sub-surface paint layers exposed beneath battle impacts with micro-detail normal occlusion.',
      },
      {
        title: 'Polarized HUD Visor',
        subtitle: 'Reflective Thin-Film Interference Glass',
        desc: 'Dual-curvature polycarbonate visor coated with holographic heads-up tactical interface glass.',
      },
    ],
  },
  boombox: {
    id: 'boombox',
    tabLabel: 'Retro Boombox',
    icon: '📻',
    name: 'StreetSonic Retro Boombox',
    marketCategory: 'Consumer Electronics / Vintage Audio',
    modelPath: '/models/BoomBox.glb',
    targetSize: 2.45,
    price: '$850 USD',
    freelanceFee: '$1,600 – $2,400 USD',
    turnaround: '5–7 Business Days',
    summary: '80s street sound system with chrome rotary dials, dual cassette decks, high-excursion woofers, and analog VU meters.',
    specs: [
      {
        title: 'Brushed Aluminum Accents',
        subtitle: 'Diamond-Cut Rotary Knobs and Switches',
        desc: 'Tactile switches and volume dials rendered with anisotropic metallic sheen.',
      },
      {
        title: 'Dual Cassette Deck Mechanism',
        subtitle: 'High-Precision Tape Transport Assembly',
        desc: 'Twin mechanism with mechanical counter, mechanical eject dampers, and LED peak meters.',
      },
    ],
  },
}

function FpsTracker({ onFps }: { onFps: (fps: number) => void }) {
  const lastTime = useRef<number | null>(null)
  const frames = useRef(0)

  useFrame(() => {
    const now = performance.now()
    if (lastTime.current === null) {
      lastTime.current = now
      return
    }
    frames.current++
    if (now >= lastTime.current + 1000) {
      const currentFps = Math.round((frames.current * 1000) / (now - lastTime.current))
      onFps(currentFps)
      frames.current = 0
      lastTime.current = now
    }
  })

  return null
}

function ShowcaseModel({
  config,
  autoRotate = true,
}: {
  config: ProductConfig
  autoRotate?: boolean
}) {
  const gltf = useGLTF(config.modelPath)
  const groupRef = useRef<THREE.Group>(null)

  // Compute normalized scale so all models (shoes, chairs, watches, cars) fill the viewport heroically
  const normalizedScene = useMemo(() => {
    const cloned = gltf.scene.clone(true)
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const target = config.targetSize || 2.4
    const scaleFactor = target / (maxDim > 0 ? maxDim : 1)
    cloned.scale.setScalar(scaleFactor)
    return cloned
  }, [gltf.scene, config.targetSize])

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={normalizedScene} position={[0, 0, 0]} />
      </Center>
    </group>
  )
}

interface ShowroomViewProps {
  onBack?: () => void
}

export default function ShowroomView({ onBack }: ShowroomViewProps) {
  const productKeys = Object.keys(PRODUCTS)
  const [selectedKey, setSelectedKey] = useState<string>('chronograph')
  const [theme, setTheme] = useState<StudioBgTheme>('studio-slate')
  const [autoRotate, setAutoRotate] = useState(true)
  const [activeSpecIndex, setActiveSpecIndex] = useState(0)
  const [fps, setFps] = useState<number>(60)
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const activeProduct = PRODUCTS[selectedKey] || PRODUCTS.chronograph
  const activeBg = STUDIO_BG_PRESETS[theme]

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const handleEnquireWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Piyush! I am interested in commissioning a 3D CAD model like the *${activeProduct.name}* (${activeProduct.marketCategory}).\nEstimated Scope: ${activeProduct.freelanceFee}.`
    )
    window.open(`https://wa.me/917875417830?text=${text}`, '_blank')
  }

  return (
    <div
      id="showroom-root"
      className="relative w-full min-h-screen text-white select-none overflow-x-hidden flex flex-col justify-between"
      style={{
        background: activeBg.bg,
        transition: 'background 0.6s ease',
      }}
    >
      {/* ================= TOP NAVIGATION HUD ================= */}
      <header
        className="relative z-30 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: 'rgba(5, 8, 14, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Back Button & Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            id="showroom-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono tracking-wider transition-all cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              color: '#c8f0ff',
            }}
          >
            <span>←</span>
            <span>Back to Studio</span>
          </button>

          <div className="flex items-baseline gap-2">
            <span
              className="text-lg font-bold tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              NORD
            </span>
            <span
              className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded"
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              3D Lab
            </span>
          </div>
        </div>

        {/* Center Title */}
        <div className="hidden lg:flex flex-col items-center">
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase"
            style={{ color: '#38bdf8' }}
          >
            Real Market Product CAD &amp; Specs
          </span>
          <span className="text-[11px] text-neutral-400 font-light">
            Interactive commercial asset inspection • 360° Real-time WebGL
          </span>
        </div>

        {/* Right Status & Theme Selector */}
        <div className="flex items-center gap-3">
          {/* FPS Badge */}
          <div
            id="showroom-fps-counter"
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-mono"
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: '#38bdf8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{fps} FPS • Verified</span>
          </div>

          {/* Cyclorama Backdrop Presets */}
          <div
            id="showroom-backdrop-selector"
            className="flex items-center gap-1 p-1 rounded-lg border"
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            {(Object.keys(STUDIO_BG_PRESETS) as StudioBgTheme[]).map((tKey) => {
              const bg = STUDIO_BG_PRESETS[tKey]
              const isCur = theme === tKey
              return (
                <button
                  key={tKey}
                  type="button"
                  id={`backdrop-${tKey.split('-')[1]}`}
                  onClick={() => setTheme(tKey)}
                  title={bg.name}
                  className="w-5 h-5 rounded-full transition-all cursor-pointer"
                  style={{
                    background: bg.accent,
                    border: isCur ? '2px solid #ffffff' : '2px solid transparent',
                    transform: isCur ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: isCur ? `0 0 10px ${bg.accent}` : 'none',
                  }}
                />
              )
            })}
          </div>
        </div>
      </header>

      {/* ================= MAIN 3D LAB VIEWPORT & SIDEBAR ================= */}
      <main className="relative flex-1 w-full flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* 3D Canvas Viewport */}
        <div
          id="showroom-canvas-container"
          className="relative flex-1 min-h-[500px] lg:min-h-[640px] flex items-center justify-center overflow-hidden"
        >
          {/* ================= ELEVATED MODEL SWITCHER TABS (TOP OF CANVAS) ================= */}
          <div
            id="showroom-model-tabs"
            className="absolute top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-20 flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-xl shadow-2xl overflow-x-auto max-w-full sm:max-w-[94%] scrollbar-none"
            style={{
              background: 'rgba(5, 8, 14, 0.88)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {productKeys.map((key) => {
              const p = PRODUCTS[key]
              const isSelected = key === selectedKey
              return (
                <button
                  key={key}
                  type="button"
                  id={`model-tab-${key}`}
                  onClick={() => {
                    setSelectedKey(key)
                    setActiveSpecIndex(0)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.28) 0%, rgba(99, 102, 241, 0.35) 100%)'
                      : 'transparent',
                    border: isSelected
                      ? '1px solid rgba(56, 189, 248, 0.6)'
                      : '1px solid transparent',
                    color: isSelected ? '#ffffff' : '#9ca3af',
                    boxShadow: isSelected ? '0 0 18px rgba(56, 189, 248, 0.25)' : 'none',
                  }}
                >
                  <span className="text-sm">{p.icon}</span>
                  <span>{p.tabLabel}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                    style={{
                      background: isSelected
                        ? 'rgba(56, 189, 248, 0.3)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isSelected ? '#c8f0ff' : '#6b7280',
                    }}
                  >
                    {p.price}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Three.js R3F Canvas */}
          <div className="absolute inset-0 w-full h-full">
            <Canvas
              shadows
              camera={{ position: [0, 0.8, 4.4], fov: 40 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              dpr={[1, 2]}
            >
              <FpsTracker onFps={setFps} />
              <ambientLight intensity={1.6} />
              <directionalLight position={[5, 8, 5]} intensity={2.6} color="#ffffff" castShadow />
              <directionalLight position={[-5, 4, 2]} intensity={1.4} color="#7dd3fc" />
              <directionalLight position={[0, -3, 3]} intensity={0.9} color="#38bdf8" />
              <directionalLight position={[0, 4, -4]} intensity={1.8} color="#e0f2fe" />

              {/* Pedestal Stage Floor */}
              <group position={[0, -1.3, 0]}>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[3.0, 64]} />
                  <meshStandardMaterial color="#0c131f" roughness={0.8} metalness={0.2} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[2.95, 3.02, 64]} />
                  <meshBasicMaterial color={activeBg.accent} transparent opacity={0.4} />
                </mesh>
              </group>

              {/* 3D Normalized Real Model (No Price Tag) */}
              <Suspense
                fallback={
                  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <mesh>
                      <boxGeometry args={[1, 1, 1]} />
                      <meshStandardMaterial color="#1e293b" wireframe />
                    </mesh>
                  </Float>
                }
              >
                <ShowcaseModel
                  config={activeProduct}
                  autoRotate={autoRotate}
                />
              </Suspense>

              <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                enablePan={false}
                maxPolarAngle={Math.PI / 2 + 0.1}
                minPolarAngle={Math.PI / 4}
                dampingFactor={0.06}
              />
            </Canvas>
          </div>

          {/* Canvas Floating Utility Buttons */}
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
            <button
              type="button"
              id="showroom-autorotate-btn"
              onClick={() => setAutoRotate(!autoRotate)}
              className="px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer backdrop-blur-md shadow-lg"
              style={{
                background: autoRotate ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 0, 0, 0.65)',
                borderColor: autoRotate ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.12)',
                color: autoRotate ? '#c8f0ff' : '#aaaaaa',
              }}
            >
              {autoRotate ? '↻ Auto: ON' : '↻ Auto: OFF'}
            </button>
            <button
              type="button"
              onClick={handleResetCamera}
              className="px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer backdrop-blur-md text-neutral-300 shadow-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
              }}
            >
              ⊙ Reset View
            </button>
          </div>

          {/* Bottom Left Interaction Guide */}
          <div
            className="absolute bottom-5 left-5 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border backdrop-blur-md pointer-events-none"
            style={{
              background: 'rgba(5, 8, 14, 0.65)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: '#94a3b8',
              }}
            >
              Drag to orbit 360° • Scroll to zoom • CAD model normalized
            </span>
          </div>
        </div>

        {/* Sidebar Specs & Commercial Feasibility */}
        <aside
          className="w-full lg:w-[420px] p-6 lg:p-8 border-t lg:border-t-0 lg:border-l flex flex-col justify-between overflow-y-auto"
          style={{
            background: 'rgba(5, 8, 14, 0.85)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            {/* Category & Icon */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#38bdf8',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {activeProduct.marketCategory}
              </span>
              <span className="text-2xl">{activeProduct.icon}</span>
            </div>

            {/* Product Title */}
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {activeProduct.name}
            </h2>

            {/* Pricing Tag */}
            <div className="flex items-baseline gap-2.5 mb-5">
              <span className="text-3xl font-extrabold text-cyan-300 font-mono">
                {activeProduct.price}
              </span>
              <span className="text-xs text-neutral-400 font-mono uppercase">
                Retail Market Valuation
              </span>
            </div>

            {/* Summary */}
            <p className="text-xs text-neutral-300 leading-relaxed mb-6 font-light">
              {activeProduct.summary}
            </p>

            {/* Engineering Hotspots Tabs */}
            <div className="mb-6">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                CAD Micro-Specifications ({activeProduct.specs.length})
              </div>
              <div className="flex gap-1.5 mb-3">
                {activeProduct.specs.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSpecIndex(i)}
                    className="px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer"
                    style={{
                      background:
                        activeSpecIndex === i
                          ? 'rgba(56, 189, 248, 0.2)'
                          : 'rgba(255, 255, 255, 0.04)',
                      color: activeSpecIndex === i ? '#38bdf8' : '#777777',
                      border:
                        activeSpecIndex === i
                          ? '1px solid rgba(56, 189, 248, 0.4)'
                          : '1px solid transparent',
                    }}
                  >
                    0{i + 1}. {h.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Active Spec Info Box */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="text-xs font-semibold text-white mb-1">
                  {activeProduct.specs[activeSpecIndex]?.title}
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mb-2">
                  {activeProduct.specs[activeSpecIndex]?.subtitle}
                </div>
                <div className="text-[11px] text-neutral-300 leading-relaxed">
                  {activeProduct.specs[activeSpecIndex]?.desc}
                </div>
              </div>
            </div>
          </div>

          {/* Freelance Commission Quote Box */}
          <div
            className="p-5 rounded-2xl border mt-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.1) 100%)',
              borderColor: 'rgba(56, 189, 248, 0.25)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-neutral-400 font-mono">Freelance 3D CAD Fee:</span>
              <span className="text-cyan-300 font-mono font-bold text-sm">
                {activeProduct.freelanceFee}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mb-4">
              <span className="text-neutral-400 font-mono">Turnaround:</span>
              <span className="text-white font-mono">{activeProduct.turnaround}</span>
            </div>

            <button
              type="button"
              id="showroom-embed-cta"
              onClick={handleEnquireWhatsApp}
              className="w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: '#c8f0ff',
                color: '#050505',
              }}
            >
              <span>Commission This CAD Model</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="#050505"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}
