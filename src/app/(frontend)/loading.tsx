'use client'

import { motion } from 'motion/react'

export default function Loading() {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="loading-text"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Loading...
      </motion.div>
    </div>
  )
}
