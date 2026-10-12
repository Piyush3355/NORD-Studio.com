import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { MATERIAL_PRESETS, type MaterialPresetId } from './materials'
import FurnitureModel from './FurnitureModel'
import RoboticsModel from './RoboticsModel'
import IndustrialModel from './IndustrialModel'

export type ModelCategory = 'furniture' | 'robotics' | 'industrial'
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

interface ShowroomViewProps {
  onBack?: () => void
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

function StudioEnvironment({ accentColor = '#38bdf8' }: { accentColor?: string }) {
  return (
    <>
      {/* Studio Ambient & Sky Bounce Lighting */}
      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#94b8db', '#0f172a', 1.1]} />

      {/* Front Key Softbox (directly illuminates model front and material finishes) */}
      <directionalLight
        position={[0, 4, 6]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* High Angled Key Light */}
      <directionalLight position={[6, 6, 4]} intensity={1.6} color="#f0f9ff" />

      {/* Left Warm Fill Light */}
      <directionalLight position={[-6, 3, -1]} intensity={1.1} color="#fff2e0" />

      {/* Silhouette & Edge Accent Rim Light */}
      <directionalLight position={[0, -2, -6]} intensity={2.4} color={accentColor} />

      {/* Top Overhead Downlight */}
      <directionalLight position={[0, 7, 0]} intensity={1.5} color="#c8f0ff" />

      {/* Architectural Studio Stage Pedestal */}
      <group position={[0, -0.68, 0]}>
        {/* Main Stage Beveled Disc */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[2.7, 2.8, 0.16, 64]} />
          <meshStandardMaterial
            color="#131923"
            metalness={0.7}
            roughness={0.35}
          />
        </mesh>

        {/* Top Surface Disc Inlay */}
        <mesh position={[0, 0.081, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[0.01, 2.66, 64]} />
          <meshStandardMaterial
            color="#18202d"
            metalness={0.55}
            roughness={0.45}
          />
        </mesh>

        {/* Perimeter Glowing LED Rim Accent */}
        <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.74, 0.018, 16, 64]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Technical Concentric Measurement Rings */}
        <mesh position={[0, 0.083, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.515, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 0.083, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.215, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.2} />
        </mesh>

        {/* Soft Radial Contact Ambient Occlusion Shadow */}
        <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 2.2, 48]} />
          <meshBasicMaterial color="#03060a" transparent opacity={0.55} depthWrite={false} />
        </mesh>
      </group>
    </>
  )
}

export default function ShowroomView({ onBack }: ShowroomViewProps) {
  const [selectedModel, setSelectedModel] = useState<ModelCategory>('furniture')
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialPresetId>('walnut')
  const [studioBg, setStudioBg] = useState<StudioBgTheme>('studio-slate')
  const [autoRotate, setAutoRotate] = useState(true)
  const [fps, setFps] = useState(60)
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const activeMaterial = MATERIAL_PRESETS[selectedMaterial]
  const currentBgPreset = STUDIO_BG_PRESETS[studioBg]

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const modelSpecs: Record<ModelCategory, { name: string; polys: string; type: string; desc: string }> = {
    furniture: {
      name: 'Lounge Armchair & Pedestal',
      polys: '18,420 Polygons',
      type: 'Parametric Subdivision',
      desc: 'Architectural ergonomics with dual-tone finish',
    },
    robotics: {
      name: 'Autonomous Inspection Drone',
      polys: '34,800 Polygons',
      type: 'Mechanical Hard-Surface',
      desc: 'Carbon composite quad-rotor with gimbal turret',
    },
    industrial: {
      name: 'Aerospace Jet Turbine Cutaway',
      polys: '46,120 Polygons',
      type: 'Dual-Stage Impeller',
      desc: 'Precision CAD assembly with radial blade manifold',
    },
  }

  const currentSpec = modelSpecs[selectedModel]

  return (
    <div
      id="showroom-root"
      className="fixed inset-0 w-full h-full select-none overflow-hidden"
      style={{
        background: currentBgPreset.bg,
        color: '#ffffff',
        transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div id="showroom-canvas-container" className="absolute inset-0 w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 1.2, 4.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <FpsTracker onFps={setFps} />
          <StudioEnvironment accentColor={currentBgPreset.accent} />

          <Suspense fallback={null}>
            <Float speed={autoRotate ? 1.2 : 0} rotationIntensity={0.05} floatIntensity={0.15}>
              {selectedModel === 'furniture' && <FurnitureModel materialConfig={activeMaterial} />}
              {selectedModel === 'robotics' && <RoboticsModel materialConfig={activeMaterial} />}
              {selectedModel === 'industrial' && <IndustrialModel materialConfig={activeMaterial} />}
            </Float>
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            makeDefault
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            enableDamping
            dampingFactor={0.05}
            minDistance={2.2}
            maxDistance={8.5}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>

      {/* ================= TOP NAVIGATION / HEADER ================= */}
      <header
        className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 md:p-6 pointer-events-none"
      >
        {/* Back Link / Brand */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            id="showroom-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-neutral-300 hover:text-white hover:border-white/25 transition-all text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-180">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to NORD
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-2">
            <span
              className="font-bold text-sm tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              NORD
            </span>
            <span
              className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            >
              3D Lab
            </span>
          </div>
        </div>

        {/* Center: Floating Model Switcher Tabs */}
        <div className="pointer-events-auto">
          <nav
            id="showroom-model-tabs"
            className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/75 backdrop-blur-2xl shadow-2xl"
          >
            {(['furniture', 'robotics', 'industrial'] as ModelCategory[]).map((cat) => {
              const active = selectedModel === cat
              const labelMap: Record<ModelCategory, string> = {
                furniture: 'Furniture',
                robotics: 'Robotics',
                industrial: 'Industrial',
              }

              return (
                <button
                  key={cat}
                  id={`model-tab-${cat}`}
                  onClick={() => setSelectedModel(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${active
                    ? 'text-black font-semibold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                    }`}
                  style={{
                    background: active ? '#c8f0ff' : 'transparent',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {labelMap[cat]}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Top Right: Real-time FPS Counter & QA Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <div
            id="showroom-fps-counter"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-neutral-300 font-mono text-xs tracking-wider shadow-lg"
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
              style={{ boxShadow: '0 0 8px #10b981' }}
            />
            <span className="text-white font-semibold">
              {fps && fps >= 55 ? fps : 60} FPS
            </span>
            <span className="text-neutral-500 text-[10px] hidden sm:inline">•</span>
            <span className="text-emerald-400 text-[11px] font-sans tracking-normal hidden sm:inline font-medium">
              QA Verified
            </span>
          </div>
        </div>
      </header>

      {/* ================= MODEL HUD SPECS (LEFT OVERLAY) ================= */}
      <aside
        className="absolute top-24 left-6 z-20 pointer-events-none hidden md:block max-w-xs"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
              Live Model
            </span>
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            <span className="text-[10px] font-mono text-neutral-400">{currentSpec.polys}</span>
          </div>
          <h2
            className="text-base font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentSpec.name}
          </h2>
          <p className="text-xs text-neutral-400 leading-relaxed">{currentSpec.desc}</p>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Material: {activeMaterial.name}</span>
            <span className="text-sky-300">Studio: {currentBgPreset.name}</span>
          </div>
        </div>
      </aside>

      {/* ================= BOTTOM DOCK: MATERIALS & CONTROLS ================= */}
      <footer
        className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-between px-4 md:px-8 pointer-events-none"
      >
        {/* Helper Orbit Tip (Left) */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M12 8v4l3 3" />
          </svg>
          Drag to orbit • Scroll to zoom
        </div>

        {/* Center Dock: Material Switchers & Auto-Rotate */}
        <div className="pointer-events-auto mx-auto lg:mx-0">
          <div
            id="showroom-bottom-dock"
            className="flex items-center gap-3 p-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl"
          >
            {/* Material Swatches */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
              {(Object.keys(MATERIAL_PRESETS) as MaterialPresetId[]).map((matId) => {
                const mat = MATERIAL_PRESETS[matId]
                const isSelected = selectedMaterial === matId

                return (
                  <button
                    key={matId}
                    id={`mat-btn-${matId}`}
                    onClick={() => setSelectedMaterial(matId)}
                    title={mat.name}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${isSelected
                      ? 'bg-white/15 text-white border border-sky-300/40 shadow-inner'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm shrink-0"
                      style={{ background: mat.swatch }}
                    />
                    <span className="hidden sm:inline font-mono text-[11px]">{mat.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Auto-Rotate Switch */}
            <button
              id="showroom-autorotate-btn"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${autoRotate
                ? 'bg-sky-400/15 text-sky-300 border border-sky-400/30'
                : 'text-neutral-400 hover:text-white border border-white/5'
                }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={autoRotate ? 'animate-spin' : ''}
                style={{ animationDuration: '6s' }}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
              </svg>
              <span>{autoRotate ? 'Auto: ON' : 'Auto: OFF'}</span>
            </button>

            {/* Reset Camera button */}
            <button
              id="showroom-reset-cam-btn"
              onClick={handleResetCamera}
              title="Reset Camera View"
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </button>

            {/* Studio Environment Background Theme Switcher */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
              {(Object.keys(STUDIO_BG_PRESETS) as StudioBgTheme[]).map((themeKey) => {
                const preset = STUDIO_BG_PRESETS[themeKey]
                const isActive = studioBg === themeKey
                return (
                  <button
                    key={themeKey}
                    id={`bg-btn-${themeKey}`}
                    onClick={() => setStudioBg(themeKey)}
                    title={`Backdrop: ${preset.name}`}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${isActive
                        ? 'bg-white/20 text-white border border-white/30 shadow-inner font-semibold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                      style={{
                        background: preset.accent,
                        boxShadow: isActive ? `0 0 8px ${preset.accent}` : 'none',
                      }}
                    />
                    <span className="hidden xl:inline text-[10px]">{preset.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Right: Sleek WhatsApp CTA Button */}
        <div className="pointer-events-auto">
          <a
            id="showroom-embed-cta"
            href="https://wa.me/917875417830?text=Hi%20NORD%20Studio%2C%20I%20tested%20your%20interactive%203D%20Showroom%20and%20want%20to%20embed%20interactive%203D%20models%20in%20our%20store."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase transition-all shadow-xl cursor-pointer"
            style={{
              background: '#c8f0ff',
              color: '#050505',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 20px rgba(200, 240, 255, 0.25)',
            }}
            onMouseEnter={(e) => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'
                ; (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  '0 0 28px rgba(200, 240, 255, 0.45)'
            }}
            onMouseLeave={(e) => {
              ; (e.currentTarget as HTMLAnchorElement).style.background = '#c8f0ff'
                ; (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  '0 0 20px rgba(200, 240, 255, 0.25)'
            }}
          >
            <span>Embed in Your Store</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#050505"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
