'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import assets from '../assets'

const navRoutes = [
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

function NavLinkItem({ route, children, onNavigate }) {
  if (route.url) {
    return (
      <Link
        href={route.url}
        onClick={onNavigate}
        className="text-light hover:bg-primary hover:text-dark flex flex-row items-center justify-center cursor-pointer text-[18px] font-bold py-0 px-[17px] rounded-[5px] transition-all duration-300 ease-in-out"
      >
        {route.title} {children}
      </Link>
    )
  }
  return (
    <span className="text-light hover:bg-primary hover:text-dark flex flex-row items-center justify-center cursor-pointer text-[18px] font-bold py-0 px-[17px] rounded-[5px] transition-all duration-300 ease-in-out">
      {route.title} {children}
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSubMenuToggle(e) {
    e.currentTarget.classList.toggle('active')
  }

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.navWrapper')
      if (!el) return
      if (window.scrollY >= 80) el.classList.add('scrolled')
      else el.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll, { passive: true })
  }, [])

  return (
    <div className="fixed py-2 navWrapper md:py-5 top-0 w-full z-[1000]">
      <nav className="relative flex flex-row max-w-[calc(100%-50px)] mx-auto my-0 h-[70px] items-center justify-center">
        <div
          className={`cursor-pointer menuIcon hidden ${menuOpen ? 'opened' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="#F9F9F9"
              className="scale-90 w-[30px] md:w-[40px]"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="#F9F9F9"
              className="w-[30px] md:w-[40px]"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          )}
        </div>

        <div className="content justify-evenly flex items-center w-full">
          <div className="logo -ml-[12px]">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center text-white text-[30px] font-semibold"
            >
              <img src={assets.Logo} alt="logo" className="w-[150px] md:w-[225px]" />
            </Link>
          </div>

          <ul className="links flex items-center w-auto" data-lenis-prevent="true">
            {navRoutes.map((route, idx) => (
              <li
                key={idx}
                id={route.url}
                onClick={route.subMenu ? handleSubMenuToggle : undefined}
                className={`list-none relative leading-[50px] group ${
                  route.subMenu ? 'has-submenu' : ''
                }`}
              >
                <NavLinkItem route={route} onNavigate={() => setMenuOpen(false)}>
                  {route.subMenu && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#F9F9F9"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15.375L6 9.375L7.075 8.3L12 13.25L16.925 8.325L18 9.4L12 15.375Z"
                        fill="#F9F9F9"
                      />
                    </svg>
                  )}
                </NavLinkItem>
                {route.subMenu && (
                  <ul className="px-4 group-hover:top-[50px] left-0 group-hover:opacity-100 group-hover:visible group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out sub-menu absolute bg-secondary border border-primary/20 rounded-xl py-[8px] top-[70px] z-[-1] opacity-0 invisible transition-all duration-300 ease-in-out shadow-xl">
                    {route.subMenu.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <Link
                          href={sub.url}
                          onClick={() => setMenuOpen(false)}
                          className="text-light w-full leading-[30px] hover:bg-primary hover:text-dark text-[18px] flex flex-row items-center justify-start cursor-pointer font-bold py-[9px] transition-all duration-300 ease-in-out px-[17px] rounded-lg"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="w-[50px] h-[50px] md:h-[75px] md:w-[75px] fastlogo">
            <a href="http://lhr.nu.edu.pk/" target="_blank" rel="noreferrer">
              <img
                src="/assets/fastnu.webp"
                alt="FAST NU logo"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
