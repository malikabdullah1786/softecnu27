'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import assets from '../assets'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const sponsorEmail = 'marketing@softec.org.pk'

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(sponsorEmail)
    setCopied(true)
    toast.success('Sponsor email copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <footer className="w-full border-t border-outline-subtle/30 bg-dark text-light">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-outline-subtle/30">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={assets.LogoMini}
                alt="SOFTEC Logo"
                className="w-11 h-11 object-contain"
              />
              <span className="text-2xl font-black text-light">
                SOFTEC<span className="text-primary">&apos;27</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-primary text-dark text-[10px] font-black uppercase">
                30th Edition
              </span>
            </div>
            <p className="text-sm text-on-surface-muted max-w-md">
              Pakistan&apos;s pioneering international collegiate technology festival, hosted
              annually by FAST NUCES Lahore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-on-surface-muted">
            <a
              className="flex items-center gap-2 hover:text-primary transition-colors"
              href="mailto:info@softec.org.pk"
            >
              <span className="material-symbols-outlined text-base text-primary">mail</span>
              <span>info@softec.org.pk</span>
            </a>
            <span className="text-outline-subtle hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-primary">location_on</span>
              <span>852 B Faisal Town, Lahore</span>
            </div>
            <span className="text-outline-subtle hidden sm:inline">•</span>
            <span className="text-tertiary font-semibold">FAST NUCES Lahore</span>
          </div>
        </div>

        {/* Sponsorship Spotlight Card */}
        <div className="rounded-2xl bg-surface-card p-6 sm:p-8 border border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[11px] text-primary uppercase font-bold tracking-widest block mb-1">
              Corporate Relations
            </span>
            <h4 className="text-xl font-bold text-light">
              Partner with South Asia&apos;s Premier Tech Talent
            </h4>
            <p className="text-sm text-on-surface-muted mt-1">
              Reach our sponsorship desk directly at{' '}
              <span className="text-primary font-semibold">{sponsorEmail}</span>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-high text-light text-xs font-bold border border-outline-subtle hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base text-primary">
                content_copy
              </span>
              <span>{copied ? 'Copied ✓' : sponsorEmail}</span>
            </button>
            <a
              href={`mailto:${sponsorEmail}?subject=SOFTEC%202027%20Sponsorship%20Enquiry`}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-dark text-xs font-extrabold hover:shadow-glow transition-all"
            >
              <span className="material-symbols-outlined text-base">send</span>
              <span>Become Our Sponsor</span>
            </a>
          </div>
        </div>

        {/* Navigation Links + Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wider text-on-surface-muted">
            <Link href="/competitions" className="hover:text-primary transition-colors">
              Competitions
            </Link>
            <Link href="/exhibitions" className="hover:text-primary transition-colors">
              Exhibitions
            </Link>
            <Link href="/hall-of-honor" className="hover:text-primary transition-colors">
              Hall of Honor
            </Link>
            <Link href="/team" className="hover:text-primary transition-colors">
              Our Team
            </Link>
            <Link href="/sponsors" className="hover:text-primary transition-colors">
              Sponsors
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/SOFTEC.ORG"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-high border border-outline-subtle/40 flex items-center justify-center hover:border-primary transition-colors"
            >
              <img src={assets.FacebookOutlined} alt="Facebook" width={18} height={18} />
            </a>
            <a
              href="https://www.instagram.com/softec_nu/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-high border border-outline-subtle/40 flex items-center justify-center hover:border-primary transition-colors"
            >
              <img src={assets.Instagram} alt="Instagram" width={18} height={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/softecnu"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-high border border-outline-subtle/40 flex items-center justify-center hover:border-primary transition-colors"
            >
              <img src={assets.LinkedIn} alt="LinkedIn" width={18} height={18} />
            </a>
            <a
              href="https://www.youtube.com/@softecnu"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-surface-high border border-outline-subtle/40 flex items-center justify-center hover:border-primary transition-colors"
            >
              <img src={assets.Youtube} alt="YouTube" width={18} height={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-outline-subtle/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-muted">
          <span>© 2027 SOFTEC FAST NUCES Lahore. All rights reserved. Legacy Meets Tomorrow.</span>
          <span className="text-[11px] text-primary font-mono font-bold tracking-wider">
            SOFTEC&apos;27 • 30TH EDITION
          </span>
        </div>
      </div>
    </footer>
  )
}
