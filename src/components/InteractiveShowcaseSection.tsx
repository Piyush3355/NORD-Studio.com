import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'
import PaperPriceTag from './PaperPriceTag'

interface ProductConfig {
  id: string
  tabLabel: string
  icon: string
  name: string
  marketCategory: string
  modelPath: string
  scale: number
  price: string
  freelanceFee: string
  turnaround: string
  summary: string
  priceTagPos: [number, number, number]
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
    scale: 0.388,
    price: '$14,200 USD',
    freelanceFee: '$4,500 – $6,500 USD',
    turnaround: '10–14 Business Days',
    summary: 'Luxury Swiss-calibre chronograph with high-gloss zirconium oxide bezel, multi-level tapped guilloché dial, flying tourbillon cage, and top-grain alligator strap.',
    priceTagPos: [-1.2, 0.9, 0.2],
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
    scale: 1.45,
    price: '$380 USD',
    freelanceFee: '$2,400 – $3,600 USD',
    turnaround: '7–10 Business Days',
    summary: 'Parametrically engineered athletic running shoe featuring engineered knit upper, nitrogen-infused supercritical foam midsole, and zonal traction rubber.',
    priceTagPos: [-1.1, 0.8, 0.2],
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
    scale: 0.85,
    price: '$6,800 USD',
    freelanceFee: '$2,800 – $4,200 USD',
    turnaround: '8–12 Business Days',
    summary: 'Iconic molded plywood lounger and ottoman with micro-faceted velvet sheen upholstery and die-cast aluminum swivel base.',
    priceTagPos: [-1.2, 0.9, 0.2],
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
    scale: 0.58,
    price: '$2,400,000 USD',
    freelanceFee: '$6,500 – $9,500 USD',
    turnaround: '14–20 Business Days',
    summary: 'Track-focused electric hypercar design featuring active aero venturi tunnels, carbon monocoque cockpit, and high-downforce rear wing.',
    priceTagPos: [-1.3, 0.9, 0.2],
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
    scale: 1.1,
    price: '$4,200 USD',
    freelanceFee: '$1,800 – $2,800 USD',
    turnaround: '5–8 Business Days',
    summary: 'Photorealistic weathered helmet asset featuring procedural scratches, oxidized metal plating, and reflective polarized visor.',
    priceTagPos: [-1.0, 0.8, 0.2],
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
    scale: 65,
    price: '$850 USD',
    freelanceFee: '$1,600 – $2,400 USD',
    turnaround: '5–7 Business Days',
    summary: '80s street sound system with chrome rotary dials, dual cassette decks, high-excursion woofers, and analog VU meters.',
    priceTagPos: [-1.1, 0.8, 0.2],
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

function ShowcaseModel({
  config,
  showTag = true,
}: {
  config: ProductConfig
  showTag?: boolean
}) {
  const gltf = useGLTF(config.modelPath)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={gltf.scene}
          scale={config.scale}
          position={[0, 0, 0]}
        />
      </Center>
      {showTag && (
        <PaperPriceTag
          price={config.price}
          position={config.priceTagPos}
          tagLabel="NORD 3D"
          scale={0.9}
        />
      )}
    </group>
  )
}

export default function InteractiveShowcaseSection() {
  const productKeys = Object.keys(PRODUCTS)
  const [selectedKey, setSelectedKey] = useState<string>('chronograph')
  const [showTag, setShowTag] = useState(true)
  const [activeSpecIndex, setActiveSpecIndex] = useState(0)

  const activeProduct = PRODUCTS[selectedKey] || PRODUCTS.chronograph

  return (
    <section
      id="showcase"
      className="relative w-full py-28 px-6 md:px-12 select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #0d1522 0%, #06090f 55%, #050505 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Background Accent Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] pointer-events-none rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #6366f1 70%, transparent 100%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
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
                02 / Interactive 3D Showcase
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Real Market Product CAD &amp; Specs
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl mt-3 font-light leading-relaxed">
              Explore production-ready client assets in real-time WebGL. Orbit 360°, inspect physical luggage price tags, and review engineered topology.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowTag(!showTag)}
              className="px-3.5 py-2 rounded border text-xs font-mono tracking-wider transition-all cursor-pointer"
              style={{
                background: showTag ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.03)',
                borderColor: showTag ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.1)',
                color: showTag ? '#c8f0ff' : '#888888',
              }}
            >
              {showTag ? '🏷️ Hide Price Tag' : '🏷️ Show Price Tag'}
            </button>
            <a
              href="#estimator"
              className="px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer text-decoration-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: '#c8f0ff',
                color: '#050505',
                boxShadow: '0 0 18px rgba(200, 240, 255, 0.25)',
              }}
            >
              <span>Project Estimator</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="#050505" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Product Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {productKeys.map((key) => {
            const p = PRODUCTS[key]
            const isSelected = key === selectedKey
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedKey(key)
                  setActiveSpecIndex(0)
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all cursor-pointer"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  borderColor: isSelected ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.07)',
                  color: isSelected ? '#ffffff' : '#888888',
                  boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'none',
                }}
              >
                <span>{p.icon}</span>
                <span>{p.tabLabel}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                  style={{
                    background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#c8f0ff' : '#666666',
                  }}
                >
                  {p.price}
                </span>
              </button>
            )
          })}
        </div>

        {/* 3D Showcase Stage Grid: Left Stage (65%), Right Specs & Client Card (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 3D Canvas Box */}
          <div
            className="lg:col-span-8 relative h-[520px] rounded-2xl border overflow-hidden flex items-center justify-center"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #111a28 0%, #090e17 55%, #04070b 100%)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* 3D R3F Canvas */}
            <div className="absolute inset-0 w-full h-full">
              <Canvas
                shadows
                camera={{ position: [0, 0.8, 4.2], fov: 42 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 8, 5]} intensity={2.6} color="#ffffff" castShadow />
                <directionalLight position={[-5, 4, 2]} intensity={1.4} color="#7dd3fc" />
                <directionalLight position={[0, -3, 3]} intensity={0.9} color="#38bdf8" />
                <directionalLight position={[0, 4, -4]} intensity={1.8} color="#e0f2fe" />

                {/* Studio Circular Stage Floor */}
                <group position={[0, -1.2, 0]}>
                  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[2.8, 64]} />
                    <meshStandardMaterial
                      color="#0c131f"
                      roughness={0.8}
                      metalness={0.2}
                    />
                  </mesh>
                  {/* Subtle Neon Stage Rim */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.75, 2.82, 64]} />
                    <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
                  </mesh>
                </group>

                {/* 3D Real Model with Floating Tag */}
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
                  <ShowcaseModel config={activeProduct} showTag={showTag} />
                </Suspense>

                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2 + 0.1}
                  minPolarAngle={Math.PI / 4}
                  dampingFactor={0.06}
                  autoRotateSpeed={0.8}
                />
              </Canvas>
            </div>

            {/* Bottom Interaction Guide HUD */}
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-lg border backdrop-blur-md pointer-events-none"
              style={{
                background: 'rgba(5, 8, 14, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#94a3b8',
                    letterSpacing: '0.06em',
                  }}
                >
                  Interactive 3D Stage • Drag to Orbit • Scroll to Zoom
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#38bdf8',
                }}
              >
                60 FPS WebGL
              </span>
            </div>
          </div>

          {/* Right Specs & Commercial Feasibility Card */}
          <div
            className="lg:col-span-4 rounded-2xl border p-6 md:p-7 flex flex-col justify-between"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'rgba(255, 255, 255, 0.07)',
            }}
          >
            <div>
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
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
                <span className="text-xl">{activeProduct.icon}</span>
              </div>

              {/* Title & Retail Price */}
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {activeProduct.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-extrabold text-cyan-300 font-mono">
                  {activeProduct.price}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Retail Valuation</span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                {activeProduct.summary}
              </p>

              {/* Hotspot Micro-Specs Tabs */}
              {activeProduct.specs.length > 0 && (
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                    Engineering Hotspots ({activeProduct.specs.length})
                  </div>
                  <div className="flex gap-1.5 mb-3">
                    {activeProduct.specs.map((h, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveSpecIndex(i)}
                        className="px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer"
                        style={{
                          background: activeSpecIndex === i ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: activeSpecIndex === i ? '#38bdf8' : '#777777',
                          border: activeSpecIndex === i ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                        }}
                      >
                        0{i + 1}. {h.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Active Spec Info */}
                  <div
                    className="p-3.5 rounded-lg border"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div className="text-xs font-semibold text-white mb-1">
                      {activeProduct.specs[activeSpecIndex]?.title}
                    </div>
                    <div className="text-[11px] text-cyan-400 font-mono mb-1.5">
                      {activeProduct.specs[activeSpecIndex]?.subtitle}
                    </div>
                    <div className="text-[11px] text-neutral-400 leading-snug">
                      {activeProduct.specs[activeSpecIndex]?.desc}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Freelance Studio Quote & Timeline Box */}
            <div
              className="p-4 rounded-xl border mt-4"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.06) 0%, rgba(99, 102, 241, 0.08) 100%)',
                borderColor: 'rgba(56, 189, 248, 0.2)',
              }}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-400 font-mono">Freelance 3D CAD Fee:</span>
                <span className="text-cyan-300 font-mono font-bold">
                  {activeProduct.freelanceFee}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-neutral-400 font-mono">Turnaround:</span>
                <span className="text-white font-mono">
                  {activeProduct.turnaround}
                </span>
              </div>

              <a
                href="#contact"
                className="w-full py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-decoration-none"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: 'rgba(56, 189, 248, 0.18)',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  color: '#ffffff',
                }}
              >
                <span>Request Asset CAD Build</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
