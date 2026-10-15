import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

function FooterTwisterModel() {
  const { scene } = useGLTF('/peachweb/models/twister-v5.glb')
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#0c0c0e'),
          metalness: 0.9,
          roughness: 0.18,
          clearcoat: 0.95,
          clearcoatRoughness: 0.1,
          reflectivity: 0.95,
        })
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!ref.current) return
    const safeDelta = Math.min(delta, 0.05)
    ref.current.rotation.z += safeDelta * 0.18
  })

  return (
    <group ref={ref} position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  )
}

export default function FooterTwisterCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 4, 3]} intensity={50} color="#e5f0f6" />
        <pointLight position={[-5, -4, -3]} intensity={40} color="#ffffff" />
        <pointLight position={[0, -5, 2]} intensity={25} color="#c8dbee" />
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
          <FooterTwisterModel />
        </Float>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/peachweb/models/twister-v5.glb')
