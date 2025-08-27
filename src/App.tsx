import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticlesScene from './components/ParticlesScene'
import InviteCard from './components/InviteCard'
import MusicButton from './components/MusicButton'
import RsvpModal from './components/RsvpModal'
import ParallaxLayers from './components/ParallaxLayers'

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [started, setStarted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [guestName, setGuestName] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    const name = url.searchParams.get('name') || url.searchParams.get('guest') || url.searchParams.get('g')
    if (name) setGuestName(decodeURIComponent(name))
  }, [])

  // Try autoplay on mount (may be blocked by browser policies)
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    a.autoplay = true
    a.play().then(() => setStarted(true)).catch(() => {
      // Will fallback to click-based start
    })
    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  const startMusic = () => {
    if (started) return
    setStarted(true)
    audioRef.current?.play().catch(() => {})
  }

  const onConfirm = () => { audioRef.current?.play().catch(() => {}); setModalOpen(true) }

  return (
    <div className="relative min-h-screen overflow-hidden no-scrollbar" onClick={startMusic}>
      <ParticlesScene />
      <ParallaxLayers />

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] bg-rose-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] bg-amber-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
          <InviteCard onConfirm={onConfirm} guestName={guestName ?? undefined} />
        </motion.div>
      </div>

      <audio ref={audioRef} loop src="/music.mp3" playsInline autoPlay />
      <MusicButton playing={isPlaying} onToggle={() => {
        if (!started) setStarted(true)
        const a = audioRef.current
        if (!a) return
        if (a.paused) { a.play(); } else { a.pause(); }
      }} />
      <RsvpModal open={modalOpen} onClose={() => setModalOpen(false)} guestName={guestName ?? undefined} />
    </div>
  )
}


