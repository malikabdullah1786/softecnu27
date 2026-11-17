'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
}

const sizeMap = {
  3: 'max-w-3xl',
  4: 'max-w-4xl',
  5: 'max-w-5xl',
  6: 'max-w-6xl',
  7: 'max-w-7xl',
  8: 'max-w-full',
  '8xl': 'max-w-full',
}

export default function PageWrapper({ children, title, size = 7 }) {
  const isHome = title.includes('Home')

  useEffect(() => {
    document.title = !isHome ? `${title} - SOFTEC'27` : "SOFTEC'27 | Legacy Meets Tomorrow"
  }, [title, isHome])

  const maxW = sizeMap[size] || 'max-w-7xl'

  return (
    <>
      <Navbar />
      <div className={`${isHome ? '' : 'pt-28 pb-16 px-4 sm:px-6'} flex min-h-screen justify-center`}>
        <div id="page" className={`w-full ${maxW}`}>
          <motion.article
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {children}
          </motion.article>
        </div>
      </div>
    </>
  )
}
