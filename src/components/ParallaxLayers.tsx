import React, { useEffect, useRef } from 'react'

export default function ParallaxLayers() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const isSmall = () => window.matchMedia('(max-width: 640px)').matches
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5)
      const y = (e.clientY / h - 0.5)
      const damp = isSmall() ? 0.4 : 1
      root.style.setProperty('--pX', `${x * damp}`)
      root.style.setProperty('--pY', `${y * damp}`)
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const { innerWidth: w, innerHeight: h } = window
      const x = (t.clientX / w - 0.5)
      const y = (t.clientY / h - 0.5)
      const damp = isSmall() ? 0.35 : 0.8
      root.style.setProperty('--pX', `${x * damp}`)
      root.style.setProperty('--pY', `${y * damp}`)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 -z-5" style={{
      transform: 'translateZ(0)'
    }}>
      <div className="absolute -top-56 -left-40 w-[60rem] h-[60rem] rounded-full blur-3xl"
           style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,215,170,0.6), transparent 60%)', transform: 'translate(calc(var(--pX,0) * -14px), calc(var(--pY,0) * -14px))' }} />
      <div className="absolute -bottom-56 -right-40 w-[60rem] h-[60rem] rounded-full blur-3xl"
           style={{ background: 'radial-gradient(circle at 70% 70%, rgba(255,170,200,0.55), transparent 60%)', transform: 'translate(calc(var(--pX,0) * 16px), calc(var(--pY,0) * 16px))' }} />
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(135deg, rgba(255,230,241,0.45), rgba(255,231,186,0.35))', transform: 'translate(calc(var(--pX,0) * 6px), calc(var(--pY,0) * 6px))' }} />
    </div>
  )
}


