import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface KeyframePoint {
  p: number
  x: number
  y: number
  z: number
  rotX: number
  rotY: number
  rotZ: number
  scaleX: number
  scaleY: number
  scaleZ: number
  ringExpand: number
  ringTilt: number
  iridescence: number
}

// 7-Stage Architectural Choreography across the page sections
const SCROLL_KEYFRAMES: KeyframePoint[] = [
  // 0: Hero section (Top) — Elegant, compact, refined circular chrome vortex on right side
  {
    p: 0.0,
    x: 0.95,
    y: -0.12,
    z: 0.0,
    rotX: -2.7388,
    rotY: 0.1619,
    rotZ: -3.0257,
    scaleX: 1.08,
    scaleY: 1.08,
    scaleZ: 0.52,
    ringExpand: 1.0,
    ringTilt: 0.0,
    iridescence: 0.25,
  },
  // 1: Studio / About — Glides diagonally to left, tilts into 3D isometric perspective, morphs into aerodynamic oval
  {
    p: 0.18,
    x: -0.74,
    y: 0.10,
    z: 0.22,
    rotX: -2.35,
    rotY: -0.35,
    rotZ: -2.60,
    scaleX: 0.85,
    scaleY: 1.28,
    scaleZ: 0.65,
    ringExpand: 1.35,
    ringTilt: 0.70,
    iridescence: 0.45,
  },
  // 2: Services — Sweeps right, morphs into a wide sculpted architectural lens/disc, rings expand into scanner aperture
  {
    p: 0.36,
    x: 0.85,
    y: -0.05,
    z: 0.28,
    rotX: -2.95,
    rotY: 0.65,
    rotZ: -3.20,
    scaleX: 1.26,
    scaleY: 0.82,
    scaleZ: 0.85,
    ringExpand: 1.55,
    ringTilt: 1.15,
    iridescence: 0.75,
  },
  // 3: Case Studies / Work — Floats center-right, expands helical depth along Z axis with chromatic flares
  {
    p: 0.54,
    x: 0.52,
    y: 0.15,
    z: 0.42,
    rotX: -2.52,
    rotY: 0.22,
    rotZ: -2.85,
    scaleX: 0.96,
    scaleY: 0.96,
    scaleZ: 1.18,
    ringExpand: 1.18,
    ringTilt: 0.42,
    iridescence: 0.60,
  },
  // 4: Approach & Process — Transitions left, morphs into undulating living wave pulse
  {
    p: 0.72,
    x: -0.68,
    y: -0.08,
    z: 0.26,
    rotX: -2.25,
    rotY: -0.18,
    rotZ: -2.40,
    scaleX: 1.12,
    scaleY: 0.90,
    scaleZ: 0.78,
    ringExpand: 1.45,
    ringTilt: 0.88,
    iridescence: 0.65,
  },
  // 5: Stats & Reviews — Refined gentle background anchor with delicate jewel scale
  {
    p: 0.86,
    x: 0.05,
    y: 0.14,
    z: -0.22,
    rotX: -2.7388,
    rotY: 0.1619,
    rotZ: -3.0257,
    scaleX: 0.82,
    scaleY: 0.82,
    scaleZ: 0.48,
    ringExpand: 1.20,
    ringTilt: 0.25,
    iridescence: 0.35,
  },
  // 6: Footer CTA — Centered monumental crowning halo that blooms to frame the final call to action
  {
    p: 1.0,
    x: 0.0,
    y: -0.18,
    z: 0.52,
    rotX: -2.60,
    rotY: 0.10,
    rotZ: -2.95,
    scaleX: 1.22,
    scaleY: 1.22,
    scaleZ: 0.75,
    ringExpand: 1.88,
    ringTilt: 1.57,
    iridescence: 0.85,
  },
]

function getInterpolatedState(scrollProgress: number): KeyframePoint {
  const p = Math.max(0, Math.min(1, scrollProgress))
  let idx = 0
  for (let i = 0; i < SCROLL_KEYFRAMES.length - 1; i++) {
    if (p >= SCROLL_KEYFRAMES[i].p && p <= SCROLL_KEYFRAMES[i + 1].p) {
      idx = i
      break
    }
  }
  const k0 = SCROLL_KEYFRAMES[idx]
  const k1 = SCROLL_KEYFRAMES[idx + 1] || k0
  const range = k1.p - k0.p
  const localT = range > 0 ? (p - k0.p) / range : 0
  // Smooth cubic-step easing
  const t = localT * localT * (3 - 2 * localT)

  const lerp = (a: number, b: number) => a + (b - a) * t

  return {
    p,
    x: lerp(k0.x, k1.x),
    y: lerp(k0.y, k1.y),
    z: lerp(k0.z, k1.z),
    rotX: lerp(k0.rotX, k1.rotX),
    rotY: lerp(k0.rotY, k1.rotY),
    rotZ: lerp(k0.rotZ, k1.rotZ),
    scaleX: lerp(k0.scaleX, k1.scaleX),
    scaleY: lerp(k0.scaleY, k1.scaleY),
    scaleZ: lerp(k0.scaleZ, k1.scaleZ),
    ringExpand: lerp(k0.ringExpand, k1.ringExpand),
    ringTilt: lerp(k0.ringTilt, k1.ringTilt),
    iridescence: lerp(k0.iridescence, k1.iridescence),
  }
}

// ── Floating Stardust Constellation Particles ──
function StardustParticles({ count = 64 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const amber = new THREE.Color('#f59e0b')
    const white = new THREE.Color('#dbeafe')

    for (let i = 0; i < count; i++) {
      // Deterministic golden spiral pseudo-random distribution
      const seed1 = ((i * 127.1 + 311.7) % 1)
      const seed2 = ((i * 269.5 + 183.3) % 1)
      const seed3 = ((i * 419.2 + 371.9) % 1)

      const theta = seed1 * Math.PI * 2
      const phi = Math.acos(seed2 * 2 - 1)
      const r = 1.35 + seed3 * 0.95

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = (i % 3 === 0) ? amber : white
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const safeDelta = Math.min(delta, 0.05)
    pointsRef.current.rotation.y += safeDelta * 0.08
    pointsRef.current.rotation.z += safeDelta * 0.035
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function TwisterModel({ scrollProgress }: { scrollProgress?: number }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  const groupRef = useRef<THREE.Group>(null)
  const rotatRef = useRef<THREE.Object3D | null>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null)

  const scrollRef = useRef(0)
  const prevScrollRef = useRef(0)
  const scrollVelocityRef = useRef(0)

  const { scene } = useGLTF('/peachweb/models/twister-v4.glb')

  // Passive high-performance scroll listener (avoids React re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) {
        scrollRef.current = window.scrollY / total
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Base scale ratio [0.914, 0.914, 0.401] scaled to refined compact size
  const baseScaleX = 1.65
  const baseScaleY = 1.65
  const baseScaleZ = 0.75

  // Locate the internal organic twisting pivot node 'ROTAT'
  useEffect(() => {
    let targetNode: THREE.Object3D | null = scene.getObjectByName('ROTAT') || null
    if (!targetNode) {
      scene.traverse((child) => {
        if (child.name.toUpperCase().includes('ROTAT') || child.name.includes('Empty')) {
          targetNode = child
        }
      })
    }
    rotatRef.current = targetNode
  }, [scene])

  // Apply obsidian liquid chrome material with physical clearcoat, iridescence, and reflections
  useEffect(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0a0a0d'),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      reflectivity: 0.98,
      iridescence: 0.25,
      iridescenceIOR: 1.3,
      envMapIntensity: 1.1,
    })
    materialRef.current = mat

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = false
        mesh.receiveShadow = true
        mesh.material = mat
      }
    })
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const safeDelta = Math.min(delta, 0.05)

    // Current scroll position from passive ref or prop
    const activeScroll = typeof scrollProgress === 'number' && scrollProgress > 0
      ? scrollProgress
      : scrollRef.current

    // Calculate scroll momentum velocity
    const scrollDelta = Math.abs(activeScroll - prevScrollRef.current)
    prevScrollRef.current = activeScroll
    scrollVelocityRef.current = THREE.MathUtils.lerp(
      scrollVelocityRef.current,
      scrollDelta / Math.max(0.001, safeDelta),
      0.15
    )
    const scrollBoost = Math.min(0.9, scrollVelocityRef.current * 0.25)

    // Get interpolated choreography state based on scroll
    const target = getInterpolatedState(activeScroll)

    // ── Continuous Butter-Smooth Spin with Tactical Scroll Momentum ──
    if (rotatRef.current) {
      rotatRef.current.rotation.y -= safeDelta * (0.42 + scrollBoost)
    }

    // Subtle living wave breathing pulse
    const wavePulse = Math.sin(state.clock.elapsedTime * 2.2) * 0.02

    // Interactive mouse pointer parallax tilt (disabled on touch mobile to prevent touch freeze)
    const pointerTiltX = isMobile ? 0 : (state.pointer.y || 0) * 0.04
    const pointerTiltY = isMobile ? 0 : (state.pointer.x || 0) * 0.05

    // Frame-rate independent liquid smoothing filter
    const smoothFactor = 1.0 - Math.exp(-5.5 * safeDelta)

    // Mobile-responsive coordinate adaptors
    const mobileXFactor = isMobile ? 0.22 : 1.0
    const mobileScaleFactor = isMobile ? 0.65 : 1.0

    // On mobile portrait, center in hero and place lower; otherwise gently scale X
    const targetX = isMobile && target.p < 0.14 ? 0.0 : target.x * mobileXFactor
    const targetY = isMobile && target.p < 0.14 ? -0.34 : target.y

    // Position interpolation (glides across sections)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, smoothFactor)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + wavePulse * 0.4, smoothFactor)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, target.z, smoothFactor)

    // Orientation interpolation (multi-axis cinematic rotations)
    const targetRotX = target.rotX + pointerTiltX
    const targetRotY = target.rotY + pointerTiltY
    const targetRotZ = target.rotZ

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, smoothFactor)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, smoothFactor)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, smoothFactor)

    // Shape Morphing (Non-uniform aspect scale morphing + organic breathing + mobile scale adapt)
    const finalScaleX = baseScaleX * target.scaleX * mobileScaleFactor * (1 + wavePulse)
    const finalScaleY = baseScaleY * target.scaleY * mobileScaleFactor * (1 - wavePulse * 0.5)
    const finalScaleZ = baseScaleZ * target.scaleZ * mobileScaleFactor * (1 + wavePulse * 0.8)

    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, finalScaleX, smoothFactor)
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, finalScaleY, smoothFactor)
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, finalScaleZ, smoothFactor)

    // Kinetic Outer Halo Ring (Tilts and expands according to section)
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += safeDelta * 0.22
      outerRingRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRingRef.current.rotation.x,
        target.ringTilt * 0.45,
        smoothFactor
      )
      const ringScale = target.ringExpand * mobileScaleFactor
      outerRingRef.current.scale.set(ringScale, ringScale, ringScale)
    }

    // Kinetic Inner Gimbal Ring (Counter-rotates into 3D gyroscope)
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= safeDelta * 0.32
      innerRingRef.current.rotation.y = THREE.MathUtils.lerp(
        innerRingRef.current.rotation.y,
        target.ringTilt,
        smoothFactor
      )
      const innerScale = target.ringExpand * 0.90 * mobileScaleFactor
      innerRingRef.current.scale.set(innerScale, innerScale, innerScale)
    }

    // Dynamic Material Iridescence Shift
    if (materialRef.current) {
      materialRef.current.iridescence = THREE.MathUtils.lerp(
        materialRef.current.iridescence,
        target.iridescence,
        smoothFactor
      )
    }
  })

  return (
    <group ref={groupRef} position={[0.95, -0.12, 0]}>
      {/* Central Liquid Chrome Twister Vortex */}
      <primitive object={scene} />

      {/* Kinetic Outer Gyroscopic Halo Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.56, 0.015, 20, 100]} />
        <meshPhysicalMaterial
          color="#d1d5db"
          metalness={0.92}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.98}
          emissive="#f59e0b"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Kinetic Inner Gimbal Ring with Gold/Titanium Accent */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.34, 0.012, 20, 100]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          metalness={0.88}
          roughness={0.22}
          clearcoat={1.0}
          clearcoatRoughness={0.15}
          reflectivity={0.95}
          emissive="#d97706"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Micro Orbital Beacons on Perimeter */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 1.56, Math.sin(angle) * 1.56, 0]}>
          <sphereGeometry args={[0.036, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#ffffff' : '#f59e0b'}
            emissive={i % 2 === 0 ? '#38bdf8' : '#f59e0b'}
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}

      {/* Luminous Stardust Constellation Particles */}
      <StardustParticles count={isMobile ? 24 : 64} />
    </group>
  )
}

export default function TwisterHeroCanvas({ scrollProgress }: { scrollProgress?: number }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: isMobile
          ? 'radial-gradient(circle at 50% 45%, #2a2b30 0%, #15161a 45%, #08080a 75%, #050505 100%)'
          : 'radial-gradient(circle at 62% 48%, #36373d 0%, #1c1d22 35%, #0e0f13 65%, #050505 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8.4], fov: isMobile ? 36 : 30 }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          precision: isMobile ? 'mediump' : 'highp',
        }}
      >
        <ambientLight intensity={isMobile ? 0.8 : 0.7} />

        {isMobile ? (
          // Lightweight high-performance lighting for mobile GPUs
          <>
            <directionalLight position={[0, 8, 6]} intensity={1.4} color="#ffffff" />
            <pointLight position={[3, 4, 4]} intensity={24} color="#e5f0f6" />
          </>
        ) : (
          // Full studio 3-point illumination for desktop
          <>
            <pointLight position={[6, 5, 5]} intensity={38} color="#ffffff" />
            <pointLight position={[-5, -4, -2]} intensity={28} color="#e5f0f6" />
            <pointLight position={[0, -5, 4]} intensity={22} color="#f59e0b" />
            <directionalLight position={[0, 8, 6]} intensity={1.3} color="#ffffff" />
          </>
        )}

        <Environment files="/peachweb/models/studio.hdr" />

        <TwisterModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/peachweb/models/twister-v4.glb')
