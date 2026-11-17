'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

const pageVariants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
}

const sizeMap = {
  3: 'max-w-3xl',
  4: 'max-w-4xl',
  5: 'max-w-5xl',
  6: 'max-w-6xl',
  7: 'max-w-7xl',
  8: 'max-w-[100rem]',
  '8xl': 'max-w-[100rem]',
}

export default function PageWrapper({ children, title, size = 4 }) {
  useEffect(() => {
    document.title = title !== 'Home' ? `${title} - SOFTEC'27` : "SOFTEC'27"
  }, [title])

  useEffect(() => {
    const cls = title.includes('Home') ? 'home' : 'page'
    document.body.classList.add(cls)
    return () => {
      document.body.classList.remove(cls)
    }
  }, [title])

  const maxW = sizeMap[size] || 'max-w-4xl'

  return (
    <>
      <Navbar />
      <div
        className={`${
          title.includes('Home') ? '' : 'mt-[110px]'
        } flex min-h-full items-center justify-center`}
      >
        <div id="page" className={`w-full ${maxW}`}>
          <motion.article
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {children}
          </motion.article>
        </div>
      </div>
    </>
  )
}
