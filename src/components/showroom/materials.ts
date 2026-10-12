import * as THREE from 'three'

export type MaterialPresetId = 'walnut' | 'matte-black' | 'brushed-chrome' | 'glass'

export interface MaterialConfig {
  id: MaterialPresetId
  name: string
  swatch: string
  roughness: number
  metalness: number
  color: string
  clearcoat?: number
  clearcoatRoughness?: number
  transmission?: number
  ior?: number
  thickness?: number
  transparent?: boolean
  opacity?: number
  accentColor: string
  accentMetalness: number
  accentRoughness: number
}

export const MATERIAL_PRESETS: Record<MaterialPresetId, MaterialConfig> = {
  walnut: {
    id: 'walnut',
    name: 'Walnut',
    swatch: 'linear-gradient(135deg, #452a19 0%, #29170c 100%)',
    color: '#3d2415',
    roughness: 0.38,
    metalness: 0.05,
    clearcoat: 0.25,
    clearcoatRoughness: 0.2,
    accentColor: '#c5a059', // Brushed Brass / Gold hardware
    accentMetalness: 0.85,
    accentRoughness: 0.25,
  },
  'matte-black': {
    id: 'matte-black',
    name: 'Matte Black',
    swatch: 'linear-gradient(135deg, #2a2a2e 0%, #111113 100%)',
    color: '#131316',
    roughness: 0.75,
    metalness: 0.2,
    clearcoat: 0.08,
    accentColor: '#2b2c30', // Stealth gunmetal
    accentMetalness: 0.9,
    accentRoughness: 0.35,
  },
  'brushed-chrome': {
    id: 'brushed-chrome',
    name: 'Brushed Chrome',
    swatch: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
    color: '#e2e8f0',
    roughness: 0.18,
    metalness: 0.95,
    clearcoat: 0.45,
    clearcoatRoughness: 0.1,
    accentColor: '#ffffff', // High-polish mirror steel
    accentMetalness: 0.98,
    accentRoughness: 0.08,
  },
  glass: {
    id: 'glass',
    name: 'Glass',
    swatch: 'linear-gradient(135deg, rgba(200,240,255,0.8) 0%, rgba(56,189,248,0.4) 100%)',
    color: '#c8f0ff',
    roughness: 0.06,
    metalness: 0.05,
    transmission: 0.92,
    ior: 1.52,
    thickness: 1.4,
    transparent: true,
    opacity: 0.88,
    clearcoat: 1.0,
    accentColor: '#00f5ff', // Glowing cyber cyan core
    accentMetalness: 0.8,
    accentRoughness: 0.2,
  },
}

export function createThreeMaterial(config: MaterialConfig): THREE.Material {
  if (config.id === 'glass') {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(config.color),
      roughness: config.roughness,
      metalness: config.metalness,
      transmission: config.transmission,
      ior: config.ior,
      thickness: config.thickness,
      transparent: true,
      opacity: config.opacity,
      clearcoat: config.clearcoat,
    })
  }

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.color),
    roughness: config.roughness,
    metalness: config.metalness,
  })
}
