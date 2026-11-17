'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { title: 'Home', url: '/' },
  { title: 'Competitions', url: '/competitions' },
  { title: 'Exhibitions', url: '/exhibitions' },
  { title: 'Hall of Honor', url: '/hall-of-honor' },
  { title: 'Our Team', url: '/team' },
  { title: 'Ambassadors', url: '/ambassadors' },
  {
    title: 'Registration',
    subMenu: [
      { title: 'Officer', url: '/registration/officer' },
      { title: 'Ambassador', url: '/registration/ambassador' },
      { title: 'Competition', url: '/registration/competition' },
      { title: 'Verification', url: '/registration/verify' },
    ],
  },
  { title: 'Sponsors', url: '/sponsors' },
  { title: 'Contact', url: '/contact' },
  { title: 'About Us', url: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [regOpen, setRegOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setRegOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl rounded-2xl z-[1000] border border-primary/20 shadow-glow bg-surface-card/85 backdrop-blur-md">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3 w-full">
        {/* Brand Lockup */}
        <Link
          href="/"
          className="flex items-center gap-3 group active:scale-[0.98] transition-transform duration-150 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-surface-highest flex items-center justify-center border border-primary/30 p-1.5 group-hover:border-primary transition-colors">
            <img
              src="/media/softec-mini.png"
              alt="SOFTEC Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg sm:text-xl font-extrabold text-light tracking-tight">
              SOFTEC<span className="text-primary">&apos;27</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-tertiary tracking-widest uppercase mt-0.5">
              Legacy Meets Tomorrow
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            if (item.subMenu) {
              const isRegActive = pathname?.startsWith('/registration')
              return (
                <div key={item.title} className="relative group">
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-colors ${
                      isRegActive
                        ? 'text-primary bg-surface-highest'
                        : 'text-on-surface-muted hover:text-primary hover:bg-surface-high'
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="material-symbols-outlined text-base">expand_more</span>
                  </button>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <ul className="w-44 rounded-xl bg-surface-card border border-primary/20 shadow-2xl p-1.5">
                      {item.subMenu.map((sub) => (
                        <li key={sub.url}>
                          <Link
                            href={sub.url}
                            className={`block px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                              pathname === sub.url
                                ? 'bg-primary text-dark'
                                : 'text-light hover:bg-surface-highest hover:text-primary'
                            }`}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }

            const active = pathname === item.url
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-colors ${
                  active
                    ? 'text-primary bg-surface-highest'
                    : 'text-on-surface-muted hover:text-primary hover:bg-surface-high'
                }`}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="http://lhr.nu.edu.pk/"
            target="_blank"
            rel="noreferrer"
            title="FAST NUCES Lahore"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl bg-surface-high border border-outline-subtle/50 p-1 hover:border-primary/50 transition-colors"
          >
            <img
              src="/assets/fastnu.webp"
              alt="FAST NU Logo"
              className="w-full h-full object-contain"
            />
          </a>

          <Link
            href="/registration/competition"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-dark text-xs font-extrabold hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Register</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>

          {/* Mobile / Tablet Drawer Toggle */}
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface-high border border-primary/25 text-primary hover:bg-primary hover:text-dark transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Scrollable Mobile / Tablet Drawer */}
      {menuOpen && (
        <div
          data-lenis-prevent="true"
          className="xl:hidden border-t border-primary/15 bg-surface-card/95 backdrop-blur-xl rounded-b-2xl max-h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain px-4 py-4 space-y-1.5"
        >
          {navLinks.map((item) => {
            if (item.subMenu) {
              return (
                <div key={item.title} className="rounded-xl bg-surface-high/60 border border-outline-subtle/30">
                  <button
                    type="button"
                    onClick={() => setRegOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-light"
                  >
                    <span>{item.title}</span>
                    <span className="material-symbols-outlined text-lg text-primary">
                      {regOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {regOpen && (
                    <div className="px-3 pb-3 space-y-1">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.url}
                          href={sub.url}
                          className={`block px-3 py-2 rounded-lg text-xs font-bold ${
                            pathname === sub.url
                              ? 'bg-primary text-dark'
                              : 'text-on-surface-muted hover:bg-surface-highest hover:text-primary'
                          }`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            const active = pathname === item.url
            return (
              <Link
                key={item.url}
                href={item.url}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  active
                    ? 'bg-primary text-dark'
                    : 'text-light bg-surface-high/40 hover:bg-surface-highest hover:text-primary'
                }`}
              >
                {item.title}
              </Link>
            )
          })}

          <div className="pt-2">
            <Link
              href="/registration/competition"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-dark text-sm font-extrabold"
            >
              <span>Register Now</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
