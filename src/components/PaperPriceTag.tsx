import { Html } from '@react-three/drei'

interface PaperPriceTagProps {
  price: string
  position?: [number, number, number]
  rotation?: number
  scale?: number
  tagLabel?: string
}

export default function PaperPriceTag({
  price,
  position = [0.8, 0.6, 0.2],
  rotation = -18,
  scale = 1,
  tagLabel = 'NORD 3D',
}: PaperPriceTagProps) {
  return (
    <group position={position}>
      <Html center distanceFactor={7.5} zIndexRange={[100, 0]}>
        <div
          className="relative select-none pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-110"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transformOrigin: 'top center',
            filter: 'drop-shadow(0 14px 22px rgba(0, 0, 0, 0.45)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
          }}
        >
          {/* Elastic Loop String connecting to product */}
          <div
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-0.5 h-7 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #262626 0%, #737373 60%, transparent 100%)',
              boxShadow: '0 0 2px rgba(0,0,0,0.4)',
            }}
          />

          {/* Chamfered Paper Luggage Tag Body */}
          <div
            className="relative bg-[#ffffff] text-[#111111] px-3.5 py-2.5 flex flex-col items-center justify-between"
            style={{
              width: '94px',
              minHeight: '62px',
              clipPath: 'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% 100%, 0% 100%, 0% 18px)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.06)',
              borderRadius: '2px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Reinforced Eyelet Hole */}
            <div className="w-2.5 h-2.5 rounded-full border-2 border-[#d4d4d8] bg-[#e4e4e7] mb-1.5 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
            </div>

            {/* Price Text */}
            <div
              className="text-[1.25rem] font-bold tracking-tight text-[#0a0a0a] leading-none mb-1"
              style={{ fontFamily: "'Space Grotesk', -apple-system, sans-serif" }}
            >
              {price}
            </div>

            {/* Sub-label & Barcode Graphic */}
            <div className="w-full flex items-center justify-between border-t border-neutral-200/80 pt-1 mt-0.5">
              <span className="text-[6.5px] font-mono font-semibold tracking-widest text-neutral-400 uppercase">
                {tagLabel}
              </span>
              <div className="flex gap-[1.5px] h-2 items-center opacity-40">
                <span className="w-[1px] h-2 bg-black" />
                <span className="w-[2px] h-2 bg-black" />
                <span className="w-[1px] h-2 bg-black" />
                <span className="w-[1.5px] h-2 bg-black" />
                <span className="w-[2.5px] h-2 bg-black" />
                <span className="w-[1px] h-2 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
