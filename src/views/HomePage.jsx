'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LiteYouTubeEmbedPkg from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import FsLightboxPkg from 'fslightbox-react'
import MarqueePkg from 'react-fast-marquee'
import CountUpPkg from 'react-countup'

const LiteYouTubeEmbed = LiteYouTubeEmbedPkg?.default ?? LiteYouTubeEmbedPkg
const FsLightbox = FsLightboxPkg?.default ?? FsLightboxPkg
const Marquee = MarqueePkg?.default ?? MarqueePkg
const CountUp = CountUpPkg?.default ?? CountUpPkg

import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import MotionReveal from '../components/MotionReveal'
import SponsorsGrid from '../components/SponsorsGrid'
import assets from '../assets'
import { useApiQuery, useRegistrationConfig } from '../services/api'

const activityImages = Array.from({ length: 19 }, (_, idx) => idx + 1)
  .filter((id) => id !== 18)
  .map((id) => ({
    id,
    image: `/assets/activities/2026/small/${id}.jpg`,
  }))

function Countdown() {
  const targetDate = 'April 16, 2027'
  const targetMs = useMemo(() => Date.parse(targetDate), [targetDate])
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const update = () => {
      const diff = targetMs - Date.now()
      setRemaining(diff > 0 ? diff : 0)
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [targetMs])

  const units = {
    Days: Math.floor(remaining / 86400000),
    Hours: Math.floor((remaining / 3600000) % 24),
    Minutes: Math.floor((remaining / 60000) % 60),
    Seconds: Math.floor((remaining / 1000) % 60),
  }

  return (
    <div className="md:mt-12 rounded-xl mt-2 w-full max-w-3xl">
      <div className="sm:px-8 gap-y-4 gap-x-2 md:gap-4 md:flex md:items-center md:justify-center md:mt-2 rounded-xl md:px-6 md:py-6 grid grid-cols-2 py-4">
        {Object.entries(units).map(([label, value]) => (
          <Fragment key={label}>
            <div className="md:px-4 flex flex-col items-center px-3 sm:px-6 mt-2">
              <div className="md:w-28 md:h-28 lg:w-36 lg:h-32 md:text-4xl relative w-16 h-16 mt-2 text-2xl bg-dark/50 border border-primary/30 rounded-xl backdrop-blur-sm">
                <div className="lg:text-6xl md:text-5xl z-3 absolute flex flex-col items-center justify-center w-full h-full font-mono text-2xl font-bold rounded-xl">
                  <p className="tabular-nums text-center text-primary">{value}</p>
                </div>
              </div>
              <p className="sm:text-lg md:text-xl mt-3 text-base font-semibold text-light">
                {label}
              </p>
            </div>
            {label !== 'Seconds' && (
              <span className="md:inline-block md:text-6xl text-tertiary hidden -mt-8 text-5xl font-normal">
                :
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function HeroSection({ showTimeline = false }) {
  const { isOpen } = useRegistrationConfig('team')

  return (
    <section id="introduction">
      <div className="relative flex flex-col items-center justify-center w-full min-h-screen py-28 px-5 bg-dark sm:px-20 md:px-0 hero-section bg-hero">
        <MotionReveal>
          <img
            className="select-none md:px-0 px-10 w-[30ch] sm:w-[50ch] md:w-[75ch] lg:w-[95ch]"
            src={assets.Welcome}
            width="25ch"
            height={110}
            alt="Welcome to SOFTEC 2027"
          />
        </MotionReveal>
        <p className="md:text-xl lg:text-2xl mt-3 text-sm font-bold text-center text-light">
          16th - 18th April 2027 at FAST NUCES, Lahore
        </p>

        <div className="mt-4 px-4 py-1.5 rounded-full border border-primary/50 bg-dark/70 text-xs md:text-sm font-semibold text-primary">
          {isOpen
            ? 'Registrations are Open for SOFTEC’27'
            : 'SOFTEC’27 • Registrations Opening Soon'}
        </div>

        <Countdown />

        <div className="mt-8 flex flex-wrap justify-center gap-4 px-4">
          {isOpen ? (
            <Link
              href="/registration/competition"
              className="text-dark rounded-md hover:text-primary hover:bg-dark border-primary border-[2px] px-10 py-4 font-bold uppercase bg-primary focus:outline-none text-xl md:text-2xl text-center transition-all shadow-lg"
            >
              Register Now
            </Link>
          ) : (
            <Link
              href="/competitions"
              className="text-dark rounded-md hover:text-primary hover:bg-dark border-primary border-[2px] px-8 py-4 font-bold uppercase bg-primary focus:outline-none text-xl md:text-2xl text-center transition-all shadow-lg"
            >
              Explore Competitions
            </Link>
          )}
          <Link
            href="/registration/competition"
            className="text-light rounded-md hover:bg-tertiary hover:text-dark border-tertiary border-[2px] px-8 py-4 font-bold uppercase bg-secondary/80 focus:outline-none text-xl md:text-2xl text-center transition-all"
          >
            {isOpen ? 'Check Status' : 'Notify Me'}
          </Link>
          {showTimeline && (
            <span
              onClick={() =>
                document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-dark cursor-pointer rounded-md hover:text-light hover:bg-secondary border-primary border-[2px] px-10 py-4 font-bold uppercase bg-primary focus:outline-none text-2xl text-center transition-all"
            >
              Event Timeline
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

function VideoHighlights() {
  return (
    <section className="highlights px-4">
      <div className="flex flex-col items-center max-w-5xl mx-auto">
        <Heading text="SOFTEC Highlights" />
        <div className="w-full rounded-2xl overflow-hidden border-2 border-secondary/20 shadow-xl">
          <LiteYouTubeEmbed
            id="wzCHr34CDiQ"
            title="SOFTEC 2025 Highlights"
            poster="maxresdefault"
            webp
            aspectHeight={7}
            params="rel=0"
          />
        </div>
      </div>
    </section>
  )
}

function ConferencesSection() {
  return (
    <section className="w-full mb-10">
      <Heading text="Our Conferences" />
      <img
        src="/assets/conference.png"
        className="w-full"
        alt="What AI is replacing and How you can win?"
        loading="lazy"
      />
    </section>
  )
}

function GalleryHighlights() {
  const [toggler, setToggler] = useState(false)
  const [activeImage, setActiveImage] = useState('')

  return (
    <section>
      <Heading text="Our Highlights" />
      <div className="flex flex-wrap w-full">
        {activityImages.map((item) => (
          <div
            key={item.id}
            className="w-[calc(100%/2)] md:w-[calc(100%/6)] relative aspect-[3/2] cursor-pointer group"
            onClick={() => {
              setToggler(!toggler)
              setActiveImage(`/assets/activities/2026/${item.id}.jpg`)
            }}
          >
            <img
              src={item.image}
              alt={`SOFTEC Highlight ${item.id}`}
              className="w-full h-full border border-light/40 object-cover"
              width={318}
              height={212}
              loading="lazy"
            />
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-100 opacity-0 transition-opacity group-hover:bg-hover group-hover:!opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
              >
                <path
                  d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zM10 10V7h2v3h3v2h-3v3h-2v-3H7v-2h3z"
                  fill="#CEEF55"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <FsLightbox toggler={toggler} type="image" sources={[activeImage]} />
    </section>
  )
}

function MediaPartnersSection() {
  const { data, error, isLoading } = useApiQuery('/media-partners/')
  if (error) return <ErrorMessage />
  if (!data) return null

  return (
    <section className="md:mt-20 mediaPartners w-full mt-10">
      <Heading text="Media Partners" />
      <Loader isLoading={isLoading}>
        <div className="flex flex-wrap justify-center gap-4 px-4 mx-auto max-w-6xl">
          {data.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-secondary/10 w-52 h-32 hover:shadow-md transition-all"
            >
              <img
                src={partner.logo}
                alt={partner.title}
                title={partner.title}
                className="max-h-20 max-w-[160px] object-contain"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </Loader>
    </section>
  )
}

function CommunityPartnersSection() {
  const { data, error, isLoading } = useApiQuery('/community-partners/')
  if (error) return <ErrorMessage />
  if (!data) return null

  return (
    <section className="md:mt-20 md:w-full w-10/12 mx-auto mt-10">
      <Heading text="Community Partners" />
      <Loader isLoading={isLoading}>
        <Marquee
          className="communityMarquee"
          gradient
          gradientColor="#F2F3EB"
          speed={120}
          pauseOnClick
          pauseOnHover
        >
          {data.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              className="p-4 mx-4 cursor-pointer bg-white rounded-xl border border-secondary/10 flex items-center justify-center w-48 h-28"
            >
              <img
                src={partner.logo}
                alt={partner.title}
                title={partner.title}
                loading="lazy"
                className="max-h-20 max-w-[160px] object-contain"
              />
            </a>
          ))}
        </Marquee>
      </Loader>
    </section>
  )
}

function TechCollaboratorsSection() {
  const { data, error, isLoading } = useApiQuery('/tech-collaborators/')
  if (error) return <ErrorMessage />
  if (!data) return null

  return (
    <section className="md:mt-20 md:w-full w-10/12 mx-auto mt-10">
      <Heading text="Technical Collaborators" />
      <Loader isLoading={isLoading}>
        <Marquee
          className="technicalMarquee"
          gradient
          gradientColor="#F2F3EB"
          speed={80}
          pauseOnClick
          pauseOnHover
          direction="right"
        >
          {data.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              className="mx-4 p-4 cursor-pointer bg-white rounded-xl border border-secondary/10 flex items-center justify-center w-48 h-28"
            >
              <img
                src={partner.logo}
                alt={partner.title}
                title={partner.title}
                loading="lazy"
                className="max-h-20 max-w-[160px] object-contain"
              />
            </a>
          ))}
        </Marquee>
      </Loader>
    </section>
  )
}

function StatsSection() {
  const { data: competitions } = useApiQuery('/competitions_listable/')
  const competitionCount = competitions?.length || 19

  const stats = [
    { title: 'Edition of SOFTEC', count: 30, suffix: 'th' },
    { title: 'Participants', count: 2500, suffix: '+' },
    { title: 'Sponsors', count: 22, suffix: '+' },
    { title: 'Footfall', count: 17000, suffix: '+' },
    { title: 'Competitions', count: competitionCount },
    { title: 'Prize Money', count: 2, suffix: 'M' },
    { title: 'Community partners', count: 29, suffix: '+' },
    { title: 'Ambassadors', count: 300, suffix: '+' },
    { title: 'Collaborators', count: 7 },
    { title: 'Media Partners', count: 15 },
    { title: 'Cities', count: 9, suffix: '+' },
    { title: 'Universities', count: 30, suffix: '+' },
  ]

  return (
    <section className="bg-secondary w-full py-16 md:py-24 my-16 md:my-20 px-4">
      <div className="max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-8 gap-y-8 grid mx-auto text-light">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex border-b-2 border-primary/40 flex-col w-full max-w-[320px] h-[160px] md:h-[180px] justify-center items-center text-center gap-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              <CountUp
                enableScrollSpy
                scrollSpyOnce
                decimals={stat.count === Math.floor(stat.count) ? 0 : 1}
                delay={1}
                end={stat.count}
                suffix={stat.suffix || ''}
                duration={1.5}
              />
            </h2>
            <h3 className="text-xl md:text-2xl font-bold uppercase text-light">{stat.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

function CampusSection() {
  return (
    <section className="flex flex-col items-center w-full my-20">
      <div className="flex justify-center w-full py-12 md:py-24 bg-fast">
        <div className="flex flex-col w-full md:flex-row max-w-7xl mx-auto">
          <div className="flex flex-col w-full px-5 md:px-12 md:w-1/2">
            <div className="text-3xl font-bold text-primary md:text-6xl">Campus</div>
            <p className="mt-8 font-sans text-sm font-medium text-light md:text-lg leading-relaxed">
              The Lahore Campus, spread over 12.5 acres, is located in Faisal Town which is
              the heart of greater Lahore. The campus consists of three blocks, which with
              their striking exterior brickwork and magnificent marble domes are a valuable
              addition to the rich architectural heritage of Lahore.
            </p>
            <p className="mt-4 font-sans text-sm font-medium text-light/90 md:text-lg leading-relaxed">
              The facilities consist of fully air-conditioned purpose-built classrooms
              equipped with teaching aids, and a number of computing and engineering
              laboratories. The Engineering labs comprise Electronics, Digital Systems,
              Embedded Controls, Antenna and Microwave, Microprocessors, and Communications
              Labs. The computing labs consist of database, programming, software
              engineering, and computer application labs.
            </p>
          </div>
          <div className="flex justify-center w-full mt-12 md:w-1/2 md:mt-0 px-5">
            <iframe
              title="FAST NUCES Lahore Campus Map"
              loading="lazy"
              className="rounded-xl border-2 border-primary/30 shadow-xl w-full h-[280px] sm:h-[360px] md:h-[400px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13607.668560810213!2d74.27661824911654!3d31.498961304052212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore%20Campus!5e0!3m2!1sen!2s!4v1580080747006!5m2!1sen!2s"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <PageWrapper title="Home" size="8xl">
      <div className="homepage scroll-smooth">
        <HeroSection showTimeline={false} />
        <VideoHighlights />
        <ConferencesSection />
        <GalleryHighlights />
        <Heading text="Our Sponsors" />
        <SponsorsGrid />
        <MediaPartnersSection />
        <CommunityPartnersSection />
        <TechCollaboratorsSection />
        <StatsSection />
        <CampusSection />
      </div>
    </PageWrapper>
  )
}
