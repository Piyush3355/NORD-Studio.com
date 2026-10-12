import React from 'react'
import ReactDOM from 'react-dom/client'
import * as THREE from 'three'
import App from './App.tsx'
import './index.css'

// Expose THREE with compatibility polyfill for Vanta effects
if (typeof window !== 'undefined') {
  const OrigDataTexture = THREE.DataTexture
  class PatchedDataTexture extends OrigDataTexture {
    constructor(...args: ConstructorParameters<typeof OrigDataTexture>) {
      super(...args)
      this.needsUpdate = true
    }
  }

  // Polyfill Number.prototype.clamp for Vanta color math
  // @ts-expect-error - augmentation for vanta internal clamp call
  if (typeof Number.prototype.clamp !== 'function') {
    // @ts-expect-error - augmentation
    Number.prototype.clamp = function (min: number, max: number) {
      return Math.min(Math.max(Number(this), min), max)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).THREE = Object.assign({}, THREE, {
    PlaneBufferGeometry: THREE.PlaneGeometry,
    DataTexture: PatchedDataTexture,
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
