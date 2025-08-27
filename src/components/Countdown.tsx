import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = { target: string }

function pad(n: number) { return String(n).padStart(2, '0') }

export default function Countdown({ target }: Props) {
  const targetDate = new Date(target).getTime()
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, targetDate - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return (
    <div className="mt-5 grid grid-cols-4 gap-2 md:gap-3">
      <TimeBox label="Дни" value={pad(days)} />
      <TimeBox label="Часы" value={pad(hours)} />
      <TimeBox label="Мин" value={pad(minutes)} />
      <TimeBox label="Сек" value={pad(seconds)} />
    </div>
  )
}

function TimeBox({ label, value }: { label: string, value: string }) {
  const digits = value.split('')
  return (
    <div className="glass rounded-xl py-3 md:py-4 text-center border border-white/30">
      <div className="flex items-center justify-center gap-1">
        {digits.map((d, i) => (
          <Digit key={label + i} value={d} />
        ))}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-wide text-gold-700/70 mt-1">{label}</div>
    </div>
  )
}

function Digit({ value }: { value: string }) {
  return (
    <div className="relative w-6 md:w-7 h-7 md:h-9 overflow-hidden rounded-md bg-white/60 border border-white/40 shadow-inner-glass">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center text-base md:text-xl font-semibold text-gradient-rose-gold"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


