import React from 'react'
import { motion } from 'framer-motion'

type Props = { playing: boolean; onToggle: () => void }

export default function MusicButton({ playing, onToggle }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className="fixed bottom-6 right-6 z-20 rounded-full px-5 py-3.5 text-sm font-medium text-gray-800 bg-white/85 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl safe-bottom"
    >
      <span className={playing ? 'text-gradient-rose-gold' : ''}>
        {playing ? 'Музыка: Вкл' : 'Музыка: Выкл'}
      </span>
    </motion.button>
  )
}


