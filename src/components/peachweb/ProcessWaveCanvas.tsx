import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

function WaveModel() {
  const { scene } = useGLTF('/peachweb/models/wavy-v8.glb')
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#141416'),
          metalness: 0.75,
          roughness: 0.35,
          clearcoat: 0.6,
          clearcoatRoughness: 0.2,
          transparent: true,
          opacity: 0.88,
        })
      }
    })
  }, [scene])

  useFrame((state, delta) => {
    if (!ref.current) return
    const safeDelta = Math.min(delta, 0.05)
    ref.current.rotation.z += safeDelta * 0.12
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
  })

  return (
    <group ref={ref} position={[-0.5, 0, 0]} scale={2.2} rotation={[0.4, 0.2, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function ProcessWaveCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={35} color="#e5f0f6" />
        <pointLight position={[-5, -3, -2]} intensity={25} color="#ffffff" />
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
          <WaveModel />
        </Float>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/peachweb/models/wavy-v8.glb')
