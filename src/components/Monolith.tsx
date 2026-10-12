import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Wireframe } from '@react-three/drei'
import * as THREE from 'three'

interface MonolithProps {
  mouse: React.MutableRefObject<[number, number]>
}

export default function Monolith({ mouse }: MonolithProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const wireRef = useRef<THREE.Mesh>(null!)

  // Distorted geometry for the monolith
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 8)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const noise = Math.sin(x * 2.5) * 0.08 + Math.cos(y * 3.1) * 0.06 + Math.sin(z * 2.2) * 0.07
      pos.setXYZ(i, x + noise * x, y + noise * y, z + noise * z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Slow auto rotation
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.15

    // Mouse parallax
    const [mx, my] = mouse.current
    groupRef.current.rotation.y += mx * 0.3
    groupRef.current.rotation.x += my * 0.2

    // Breathing scale
    const s = 1 + Math.sin(t * 0.5) * 0.02
    groupRef.current.scale.setScalar(s)

    // Subtle wireframe pulse
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.05
      wireRef.current.rotation.z = t * 0.04
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Inner glass mesh */}
        <mesh ref={meshRef} geometry={geometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.3}
            distortionScale={0.6}
            temporalDistortion={0.2}
            roughness={0.05}
            color="#1a2a3a"
            transmission={0.9}
            ior={1.5}
          />
        </mesh>

        {/* Outer wireframe shell */}
        <mesh ref={wireRef} geometry={geometry} scale={1.03}>
          <meshBasicMaterial
            color="#c8f0ff"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Bright edge wireframe */}
        <group scale={1.06}>
          <Wireframe
            geometry={geometry}
            stroke="#4a90b8"
            thickness={0.003}
            backfaceStroke="#1a3a5a"
            squeeze
            squeezeMin={0.2}
            squeezeMax={1.0}
          />
        </group>
      </group>
    </Float>
  )
}
