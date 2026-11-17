'use client'

import { motion } from 'framer-motion'

export default function MotionReveal({ children, fullHeight }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={fullHeight ? 'h-full' : ''}
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
      }}
    >
      {children}
    </motion.div>
  )
}
