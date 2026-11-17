'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Lenis from 'lenis'
import Footer from './Footer'

export default function ClientShell({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    const lenis = new Lenis()
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {children}
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  )
}
