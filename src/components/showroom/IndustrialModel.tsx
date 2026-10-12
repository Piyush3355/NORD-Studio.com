import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MaterialConfig } from './materials'

interface IndustrialModelProps {
  materialConfig: MaterialConfig
}

export default function IndustrialModel({ materialConfig }: IndustrialModelProps) {
  const rotorRef = useRef<THREE.Group>(null)
  const isGlass = materialConfig.id === 'glass'

  useFrame((_, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.z += delta * 2.5
    }
  })

  // Stage 1 fan blades: 16 radial aerodynamic blades
  const stage1BladeAngles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => (i * Math.PI * 2) / 16)
  }, [])

  // Stage 2 compressor blades: 24 blades
  const stage2BladeAngles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24)
  }, [])

  // Bolt holes on outer mounting flange
  const boltAngles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12)
  }, [])

  return (
    <group position={[0, 0, 0]} rotation={[0.2, -0.4, 0]}>
      {/* ================= ROTATING TURBINE CORE ================= */}
      <group ref={rotorRef}>
        {/* Aerodynamic Center Nose Cone Spinner */}
        <mesh position={[0, 0, 0.72]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.32, 0.65, 32]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* Nose Cone Spiral Aero Tip */}
        <mesh position={[0, 0, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.08, 0.18, 16]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Central Rotor Hub Shaft */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 1.3, 32]} />
          <meshStandardMaterial color="#27272a" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Stage 1 Rotor Fan Disc */}
        <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.52, 0.12, 32]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* Stage 1: 16 Aerodynamic Fan Blades */}
        {stage1BladeAngles.map((angle, idx) => {
          const bladeLength = 0.65
          const dist = 0.52 + bladeLength / 2
          return (
            <mesh
              key={`s1-${idx}`}
              position={[Math.cos(angle) * dist, Math.sin(angle) * dist, 0.35]}
              rotation={[0, 0, angle + 0.35]}
              castShadow
            >
              <boxGeometry args={[0.1, bladeLength, 0.02]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={0.92}
                roughness={0.15}
              />
            </mesh>
          )
        })}

        {/* Stage 2 Rotor Disc */}
        <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.1, 32]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.88} roughness={0.25} />
        </mesh>

        {/* Stage 2: 24 High-Pressure Blades */}
        {stage2BladeAngles.map((angle, idx) => {
          const bladeLength = 0.45
          const dist = 0.48 + bladeLength / 2
          return (
            <mesh
              key={`s2-${idx}`}
              position={[Math.cos(angle) * dist, Math.sin(angle) * dist, -0.1]}
              rotation={[0, 0, angle - 0.45]}
              castShadow
            >
              <boxGeometry args={[0.065, bladeLength, 0.015]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={0.95}
                roughness={0.18}
              />
            </mesh>
          )
        })}
      </group>

      {/* ================= STATIC STATOR HOUSING & CASING ================= */}
      {/* Outer Cutaway Stator Shroud Nacelle (Semi-Cylindrical to show internals) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.28, 1.25, 1.55, 48, 1, true, 0, Math.PI * 1.55]} />
        {isGlass ? (
          <meshPhysicalMaterial
            color={materialConfig.color}
            roughness={materialConfig.roughness}
            transmission={materialConfig.transmission}
            thickness={materialConfig.thickness}
            ior={materialConfig.ior}
            transparent
            opacity={materialConfig.opacity}
            side={THREE.DoubleSide}
            clearcoat={1}
          />
        ) : (
          <meshStandardMaterial
            color={materialConfig.color}
            roughness={materialConfig.roughness}
            metalness={materialConfig.metalness}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* Heavy-Duty Machined Mounting Flange Ring */}
      <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.42, 1.42, 0.12, 48, 1, true, 0, Math.PI * 1.55]} />
        <meshStandardMaterial
          color={materialConfig.accentColor}
          metalness={materialConfig.accentMetalness}
          roughness={materialConfig.accentRoughness}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flange Bolt Details */}
      {boltAngles.map((angle, i) => {
        if (angle > Math.PI * 1.55) return null
        const r = 1.35
        return (
          <mesh
            key={`bolt-${i}`}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0.65]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.14, 12]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.3} />
          </mesh>
        )
      })}

      {/* Exterior Fluid Cooling Manifold Conduits */}
      <group position={[0, 0, 0]}>
        <mesh position={[-0.95, -0.92, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[-0.95, -0.92, 0.72]}>
          <torusGeometry args={[0.08, 0.035, 12, 16, Math.PI / 2]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Precision Datum Ring Accent */}
      <mesh position={[0, 0, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.26, 0.02, 16, 48, Math.PI * 1.55]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  )
}
