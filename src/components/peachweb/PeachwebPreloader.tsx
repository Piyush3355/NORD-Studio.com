import { useState, useEffect } from 'react'
import NordLogo from '../NordLogo'

export default function PeachwebPreloader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let animId: number
    const startTime = performance.now()
    const duration = 1300 // 1.3s silky smooth loading progression

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / duration)
      // Smooth cubic-out easing
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.min(100, Math.round(eased * 100))
      setProgress(current)

      if (t < 1) {
        animId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setFading(true)
          setTimeout(onLoaded, 500)
        }, 220)
      }
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [onLoaded])

  // Circumference for r=70: 2 * PI * 70 = ~439.82
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease',
        opacity: fading ? 0 : 1,
        visibility: fading ? 'hidden' : 'visible',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes smoothSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: 160,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Subtle glowing rotating orbital ring */}
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '1px dashed rgba(245, 158, 11, 0.3)',
            animation: 'smoothSpin 8s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient back-glow */}
        <div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            animation: 'subtlePulse 3s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <svg
          width="160"
          height="160"
          style={{
            transform: 'rotate(-90deg)',
            position: 'absolute',
            inset: 0,
            filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.25))',
          }}
        >
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#1c1c1e"
            strokeWidth="1.5"
          />
          {/* Progress Stroke */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>

        {/* Center Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
            userSelect: 'none',
          }}
        >
          <NordLogo size={32} variant="icon" />
        </div>

        {/* Percentage */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)',
            userSelect: 'none',
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}
