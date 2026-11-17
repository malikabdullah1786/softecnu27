'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import assets from '../assets'
import Spacer from './Spacer'

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
    <>
      <Spacer />
      <footer className="bg-secondary mt-16 text-light" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <section className="max-w-7xl sm:px-6 lg:py-16 lg:px-8 px-4 py-12 mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div className="md:grid md:grid-cols-2 md:gap-8 md:col-span-2">
              <div className="xl:mt-0 mt-8">
                <div>
                  <img
                    src={assets.LogoMini}
                    alt="SOFTEC Logo"
                    width={140}
                    height={140}
                    title="SOFTEC Logo"
                    loading="lazy"
                    className="md:w-[130px] mx-auto md:m-0 w-[90px] object-contain mb-3 p-1"
                  />
                  <p className="md:text-3xl md:text-left text-2xl font-semibold text-center text-primary uppercase">
                    Contact US
                  </p>
                  <p className="md:text-left mt-2 text-lg text-center text-light">
                    In case of any query contact us at:{' '}
                    <a
                      href="mailto:info@softec.org.pk"
                      className="md:text-left mt-4 text-lg font-bold text-center text-primary hover:underline"
                    >
                      info@softec.org.pk
                    </a>
                  </p>
                  <p className="md:text-left mt-4 text-lg font-bold text-center text-tertiary">
                    852 B Faisal Town, Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:mt-0 flex flex-col justify-end mt-8">
              <h3 className="md:text-3xl md:text-left text-2xl font-semibold tracking-wider text-center text-primary uppercase">
                Be our Sponsor
              </h3>
              <p className="md:text-left mt-4 text-base text-center text-light/90">
                Interested in sponsoring SOFTEC? Email us at{' '}
                <span className="font-bold text-primary">{sponsorEmail}</span> or copy the
                address below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 h-14 bg-primary text-dark rounded-md py-2 px-4 flex items-center justify-center text-base font-bold hover:bg-tertiary hover:text-dark transition-all shadow-lg"
                >
                  {copied ? 'Email Copied ✓' : 'Copy Sponsor Email'}
                </button>
                <a
                  href={`mailto:${sponsorEmail}?subject=SOFTEC%20Sponsorship%20Enquiry`}
                  className="h-14 border-2 border-primary text-primary rounded-md py-2 px-5 flex items-center justify-center text-base font-bold hover:bg-primary hover:text-dark transition-all"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          <div className="md:mt-8 md:pt-8 md:flex md:items-center md:justify-between mt-8 border-t border-light/20">
            <p className="md:mt-0 md:order-1 mt-8 text-base text-center text-light/80">
              &copy; 2027 SOFTEC. All rights reserved.
            </p>
            <div className="md:order-2 md:mt-0 flex justify-center mt-6 space-x-6">
              <a
                href="https://www.facebook.com/SOFTEC.ORG"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 text-white"
              >
                <span className="sr-only">Facebook</span>
                <img src={assets.FacebookOutlined} alt="Facebook" width={20} height={20} />
              </a>
              <a
                href="https://www.instagram.com/softec_nu/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 text-white"
              >
                <span className="sr-only">Instagram</span>
                <img src={assets.Instagram} alt="Instagram" width={20} height={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/softecnu"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 text-white"
              >
                <span className="sr-only">LinkedIn</span>
                <img src={assets.LinkedIn} alt="LinkedIn" width={20} height={20} />
              </a>
              <a
                href="https://www.youtube.com/@softecnu"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 text-white"
              >
                <span className="sr-only">Youtube</span>
                <img src={assets.Youtube} alt="Youtube" width={20} height={20} />
              </a>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
