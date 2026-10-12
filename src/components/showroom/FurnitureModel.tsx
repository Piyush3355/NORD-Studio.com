import { useRef } from 'react'
import * as THREE from 'three'
import type { MaterialConfig } from './materials'

interface FurnitureModelProps {
  materialConfig: MaterialConfig
}

export default function FurnitureModel({ materialConfig }: FurnitureModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  const isGlass = materialConfig.id === 'glass'

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ================= CHAIR ================= */}
      <group position={[-0.45, 0, 0]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.65, 0.16, 32]} />
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

        {/* Backrest Cushion */}
        <mesh position={[0, 1.25, -0.42]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.95, 0.14]} />
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

        {/* Left Armrest */}
        <mesh position={[-0.56, 0.95, -0.05]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.12, 0.28, 0.8]} />
          {isGlass ? (
            <meshPhysicalMaterial
              color={materialConfig.color}
              roughness={materialConfig.roughness}
              transmission={materialConfig.transmission}
              thickness={materialConfig.thickness}
              ior={materialConfig.ior}
              transparent
              opacity={materialConfig.opacity}
            />
          ) : (
            <meshStandardMaterial
              color={materialConfig.color}
              roughness={materialConfig.roughness}
              metalness={materialConfig.metalness}
            />
          )}
        </mesh>

        {/* Right Armrest */}
        <mesh position={[0.56, 0.95, -0.05]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.12, 0.28, 0.8]} />
          {isGlass ? (
            <meshPhysicalMaterial
              color={materialConfig.color}
              roughness={materialConfig.roughness}
              transmission={materialConfig.transmission}
              thickness={materialConfig.thickness}
              ior={materialConfig.ior}
              transparent
              opacity={materialConfig.opacity}
            />
          ) : (
            <meshStandardMaterial
              color={materialConfig.color}
              roughness={materialConfig.roughness}
              metalness={materialConfig.metalness}
            />
          )}
        </mesh>

        {/* Metal Swivel Stem */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.52, 24]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* Swivel Hub Center Collar */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.1, 24]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* 4 Spider Base Legs */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <group key={i} rotation={[0, angle + Math.PI / 4, 0]}>
            <mesh position={[0.34, 0.06, 0]} rotation={[0, 0, -0.1]} castShadow>
              <boxGeometry args={[0.68, 0.04, 0.05]} />
              <meshStandardMaterial
                color={materialConfig.accentColor}
                metalness={materialConfig.accentMetalness}
                roughness={materialConfig.accentRoughness}
              />
            </mesh>
            {/* Foot Glide */}
            <mesh position={[0.67, 0.02, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= COMPANION ARCHITECTURAL SIDE TABLE ================= */}
      <group position={[1.15, 0, 0.15]}>
        {/* Table Top */}
        <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.045, 36]} />
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

        {/* Pedestal Fluted Stem */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.16, 0.82, 32]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* Weighted Beveled Base Ring */}
        <mesh position={[0, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.36, 0.4, 0.06, 36]} />
          <meshStandardMaterial
            color={materialConfig.accentColor}
            metalness={materialConfig.accentMetalness}
            roughness={materialConfig.accentRoughness}
          />
        </mesh>

        {/* Minimalist Ceramic Vessel on table */}
        <mesh position={[0.08, 0.98, -0.05]} castShadow>
          <cylinderGeometry args={[0.06, 0.04, 0.15, 24]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.15} metalness={0.1} />
        </mesh>
      </group>
    </group>
  )
}
