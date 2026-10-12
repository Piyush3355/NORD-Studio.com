import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MaterialConfig } from './materials'

interface RoboticsModelProps {
  materialConfig: MaterialConfig
}

export default function RoboticsModel({ materialConfig }: RoboticsModelProps) {
  const rotorsRef = useRef<THREE.Group[]>([])
  const gimbalRef = useRef<THREE.Group>(null)
  const isGlass = materialConfig.id === 'glass'

  useFrame((state, delta) => {
    // Spin rotor propellers continuously
    rotorsRef.current.forEach((rotor, idx) => {
      if (rotor) {
        // Alternate clockwise / counter-clockwise
        const dir = idx % 2 === 0 ? 1 : -1
        rotor.rotation.y += delta * 18 * dir
      }
    })

    // Subtle sensor turret scan
    if (gimbalRef.current) {
      gimbalRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.35
      gimbalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  // Arm positions and angles: 45, 135, 225, 315 deg
  const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]

  return (
    <group position={[0, -0.15, 0]} rotation={[0.22, 0.4, 0]}>
      {/* ================= CENTRAL FUSELAGE / CHASSIS ================= */}
      {/* Main Upper Aero Pod */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.65, 0.28, 6]} />
        {isGlass ? (
          <meshPhysicalMaterial
            color={materialConfig.color}
            roughness={materialConfig.roughness}
            transmission={materialConfig.transmission}
            thickness={materialConfig.thickness}
            ior={materialConfig.ior}
            transparent
            opacity={materialConfig.opacity}
            clearcoat={1}
          />
        ) : (
          <meshStandardMaterial
            color={materialConfig.color}
            roughness={materialConfig.roughness}
            metalness={materialConfig.metalness}
          />
        )}
      </mesh>

      {/* Top Tech Canopy Dome */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.34, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={materialConfig.accentColor}
          metalness={materialConfig.accentMetalness}
          roughness={materialConfig.accentRoughness}
        />
      </mesh>

      {/* Center Status Glow Ring */}
      <mesh position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Lower Avionics Bay Tray */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.45, 0.18, 6]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* ================= GIMBAL CAMERA TURRET ================= */}
      <group ref={gimbalRef} position={[0, -0.15, 0.12]}>
        {/* Gimbal Mount Sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>
        {/* Main Lens Barrel */}
        <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.14, 24]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Optical Sensor Aperture Element */}
        <mesh position={[0, 0, 0.19]}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* ================= 4 CANTILEVERED ARMS & MOTORS ================= */}
      {armAngles.map((angle, i) => {
        const radius = 1.35
        const armLength = 1.15
        const x = Math.cos(angle) * (armLength / 2 + 0.25)
        const z = Math.sin(angle) * (armLength / 2 + 0.25)
        const motorX = Math.cos(angle) * radius
        const motorZ = Math.sin(angle) * radius

        return (
          <group key={i}>
            {/* Primary Arm Boom */}
            <mesh
              position={[x, 0.18, z]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              castShadow
            >
              <boxGeometry args={[0.09, 0.08, armLength]} />
              <meshStandardMaterial
                color="#27272a"
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>

            {/* Truss Reinforcement Ribs */}
            <mesh
              position={[x * 0.9, 0.11, z * 0.9]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.02, 0.02, armLength * 0.8, 8]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={materialConfig.accentMetalness}
                roughness={materialConfig.accentRoughness}
              />
            </mesh>

            {/* Brushless Motor Nacelle Pod */}
            <mesh position={[motorX, 0.22, motorZ]} castShadow>
              <cylinderGeometry args={[0.18, 0.16, 0.25, 24]} />
              {isGlass ? (
                <meshPhysicalMaterial
                  color={materialConfig.color}
                  roughness={materialConfig.roughness}
                  transmission={materialConfig.transmission}
                  thickness={materialConfig.thickness}
                  ior={materialConfig.ior}
                  transparent
                  opacity={materialConfig.opacity}
                  clearcoat={1}
                />
              ) : (
                <meshStandardMaterial
                  color={materialConfig.color}
                  roughness={materialConfig.roughness}
                  metalness={materialConfig.metalness}
                />
              )}
            </mesh>

            {/* Motor Heat Sink Rings */}
            <mesh position={[motorX, 0.2, motorZ]}>
              <torusGeometry args={[0.175, 0.015, 8, 24]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>

            {/* Motor Shaft Spinner */}
            <mesh position={[motorX, 0.38, motorZ]} castShadow>
              <coneGeometry args={[0.08, 0.14, 16]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={materialConfig.accentMetalness}
                roughness={materialConfig.accentRoughness}
              />
            </mesh>

            {/* LED Status Indicator on Motor */}
            <mesh position={[motorX, 0.14, motorZ]}>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshStandardMaterial
                color={i < 2 ? '#38bdf8' : '#f43f5e'}
                emissive={i < 2 ? '#38bdf8' : '#f43f5e'}
                emissiveIntensity={2.0}
              />
            </mesh>

            {/* Counter-Rotating Carbon Propeller Blade Assembly */}
            <group
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={(el) => (rotorsRef.current[i] = el as any)}
              position={[motorX, 0.34, motorZ]}
            >
              {/* Blade 1 */}
              <mesh position={[0.42, 0, 0]} rotation={[0.08, 0, 0]} castShadow>
                <boxGeometry args={[0.82, 0.012, 0.11]} />
                <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Blade 2 */}
              <mesh position={[-0.42, 0, 0]} rotation={[-0.08, 0, 0]} castShadow>
                <boxGeometry args={[0.82, 0.012, 0.11]} />
                <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Propeller Blade Tip Markers */}
              <mesh position={[0.78, 0, 0]}>
                <boxGeometry args={[0.08, 0.014, 0.112]} />
                <meshStandardMaterial color="#c8f0ff" emissive="#c8f0ff" emissiveIntensity={0.6} />
              </mesh>
              <mesh position={[-0.78, 0, 0]}>
                <boxGeometry args={[0.08, 0.014, 0.112]} />
                <meshStandardMaterial color="#c8f0ff" emissive="#c8f0ff" emissiveIntensity={0.6} />
              </mesh>
            </group>

            {/* Landing Skid Struts */}
            <group position={[motorX * 0.55, -0.22, motorZ * 0.55]}>
              <mesh rotation={[0, -angle + Math.PI / 2, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
                <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.2} />
              </mesh>
              <mesh position={[0, -0.26, 0]} rotation={[Math.PI / 2, 0, -angle + Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
                <meshStandardMaterial color="#18181b" roughness={0.8} />
              </mesh>
            </group>
          </group>
        )
      })}
    </group>
  )
}
