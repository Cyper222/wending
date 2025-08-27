import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion'
import Lottie from 'lottie-react'
import heartsAnim from '../lottie/hearts.json'
import sparksAnim from '../lottie/sparks.json'
import OrnateSeparator from './OrnateSeparator'
import Countdown from './Countdown'

type Props = {
  onConfirm: () => void
  guestName?: string
}

export default function InviteCard({ onConfirm, guestName }: Props) {
  const controls = useAnimation()
  const [hovered, setHovered] = useState(false)
  const [playBurst, setPlayBurst] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rx = useSpring(0, { stiffness: 200, damping: 20 })
  const ry = useSpring(0, { stiffness: 200, damping: 20 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  useEffect(() => {
    controls.start({ rotateY: [15, 0], opacity: [0, 1], scale: [0.9, 1], transition: { duration: 1.1, ease: [0.22,1,0.36,1] } })
  }, [controls])

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const nx = x / rect.width - 0.5
    const ny = y / rect.height - 0.5
    const max = 10
    rx.set(-ny * max)
    ry.set(nx * max)
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }
  const resetTilt = () => {
    const el = cardRef.current
    if (!el) return
    rx.set(0)
    ry.set(0)
  }

  const confirm = () => {
    setPlayBurst(true)
    setTimeout(() => setPlayBurst(false), 1600)
    onConfirm()
  }

  return (
    <motion.div initial={{ rotateY: 15, opacity: 0, scale: 0.9 }} animate={controls} className="relative" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        className="glass shine gold-border rounded-3xl px-6 py-8 md:px-12 md:py-14 max-w-xl w-[94vw] md:w-[720px] text-center border-white/30 shadow-2xl will-change-transform"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); resetTilt() }}
        onMouseMove={handleMouseMove}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient( circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.35), transparent 45%)`,
            transform: 'translateZ(1px)'
          }}
        />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-56 opacity-60">
          <Lottie animationData={heartsAnim} loop autoplay />
        </div>

        <div className="space-y-3">
          <p className="tracking-[0.35em] text-xs md:text-sm uppercase text-gold-700/70 -mt-1">Вы приглашены на свадьбу</p>
          <h1 className="font-script text-5xl md:text-7xl text-gradient-rose-gold drop-shadow-sm pt-1 md:pt-2 leading-[1.05] overflow-visible">Валерия & Андрей</h1>
          <OrnateSeparator />
          <p className="text-gray-700 font-display text-lg">· 24 октября 2025 ·</p>
          <div className="text-gray-700 text-sm md:text-base space-y-1">
            <p><span className="font-medium text-gradient-rose-gold">11:00</span> — Регистрация брака</p>
            <p>ЗАГС, просп. Дзержинского, 197</p>
            <p className="pt-2"><span className="font-medium text-gradient-rose-gold">17:00</span> — Праздничный банкет</p>
            <p>Ресторан «Белладжио Мерси», с. Кирилловка, Красная ул., 42А</p>
          </div>
          {guestName && (
            <div className="pt-2">
              <p className="text-xs tracking-wider uppercase text-gold-700/70">Персонально для</p>
              <p className="font-display text-2xl md:text-3xl text-gradient-rose-gold">{guestName}</p>
            </div>
          )}
          <Countdown target="2025-10-24T11:00:00+03:00" />
        </div>

        <div className="mt-8" style={{ transform: 'translateZ(20px)' }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(245,200,106,0.55)' }}
            whileTap={{ scale: 0.98 }}
            onClick={confirm}
            className="relative overflow-hidden rounded-full px-8 py-3 font-medium text-white"
            style={{ background: 'linear-gradient(90deg, #fb7185, #f472b6 35%, #fbbf24 85%)' }}
          >
            <span className="relative z-10">Подтвердить участие</span>
            <span className="absolute inset-0 bg-white/25 mix-blend-overlay" />
          </motion.button>
        </div>

        {hovered && (
          <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 opacity-60">
            <Lottie animationData={sparksAnim} loop autoplay />
          </div>
        )}

        {playBurst && (
          <div className="pointer-events-none absolute inset-0">
            <Lottie animationData={sparksAnim} loop={false} autoplay />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}


