'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import LiteYouTubeEmbedPkg from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import FsLightboxPkg from 'fslightbox-react'
import MarqueePkg from 'react-fast-marquee'
import CountUpPkg from 'react-countup'

import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import SponsorsGrid from '../components/SponsorsGrid'
import { useApiQuery, useRegistrationConfig } from '../services/api'

const LiteYouTubeEmbed = LiteYouTubeEmbedPkg?.default ?? LiteYouTubeEmbedPkg
const FsLightbox = FsLightboxPkg?.default ?? FsLightboxPkg
const Marquee = MarqueePkg?.default ?? MarqueePkg
const CountUp = CountUpPkg?.default ?? CountUpPkg

const formatPKR = new Intl.NumberFormat('ur-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
}).format

const activityImages = Array.from({ length: 19 }, (_, idx) => idx + 1)
  .filter((id) => id !== 18)
  .map((id) => ({
    id,
    image: `/assets/activities/2026/small/${id}.jpg`,
  }))

function Countdown() {
  const targetDate = 'April 16, 2027 09:00:00'
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

  const units = [
    { label: 'Days', value: Math.floor(remaining / 86400000) },
    { label: 'Hours', value: Math.floor((remaining / 3600000) % 24) },
    { label: 'Mins', value: Math.floor((remaining / 60000) % 60) },
    { label: 'Secs', value: Math.floor((remaining / 1000) % 60) },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl mb-10">
      {units.map((u) => (
        <div
          key={u.label}
          className="bg-secondary/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:border-primary/45 transition-colors"
        >
          <span className="font-mono text-3xl sm:text-5xl font-black text-primary tracking-tight tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function HeroSection() {
  const { isOpen } = useRegistrationConfig('team')

  return (
    <section
      id="introduction"
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-14 flex flex-col justify-center items-center bg-gradient-to-b from-secondary via-surface-low to-surface-dark border-b border-primary/15 bg-grid-pattern overflow-hidden"
    >
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[320px] h-[320px] bg-tertiary/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        {/* Status Badge Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-card/90 border border-primary/40 shadow-sm backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[11px] sm:text-xs text-primary tracking-wider font-bold">
            SOFTEC&apos;27 • April 16–18, 2027 • FAST NUCES Lahore
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-light max-w-5xl uppercase mb-6 leading-[1.08]">
          WELCOME TO{' '}
          <span className="text-primary drop-shadow-[0_0_32px_rgba(206,239,85,0.35)]">
            SOFTEC&apos;27
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-on-surface-muted max-w-2xl mb-10 leading-relaxed">
          Pakistan&apos;s premier collegiate tech extravaganza uniting innovators,
          algorithmic minds, and industry pioneers for three days of fierce competition
          and technological legacy.
        </p>

        <Countdown />

        {/* CTA Duo */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <Link
            href={isOpen ? '/registration/competition' : '/competitions'}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-primary text-dark font-bold tracking-tight hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{isOpen ? 'Register Now' : 'Explore Competitions'}</span>
            <span className="material-symbols-outlined text-lg">north_east</span>
          </Link>
          <Link
            href="/registration/competition"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl bg-secondary/75 text-light border border-primary/25 hover:border-primary hover:text-primary transition-all font-semibold text-sm"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span>{isOpen ? 'Registration Status' : 'Notify Me'}</span>
          </Link>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-5 border-t border-outline-subtle/40 text-xs font-bold text-on-surface-muted">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">
              workspace_premium
            </span>
            <span className="text-light">PKR 2M+ Prize Pool</span>
          </div>
          <span className="hidden sm:inline text-outline-subtle">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">
              history_edu
            </span>
            <span className="text-light">30th Legacy Edition</span>
          </div>
          <span className="hidden sm:inline text-outline-subtle">•</span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">
              location_on
            </span>
            <span className="text-light">FAST NUCES Lahore</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCompetitionsSection() {
  const { data: competitions, isLoading } = useApiQuery('/competitions_listable/')
  const featured = competitions?.slice(0, 4) || []

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 md:px-14 bg-light text-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-dark text-primary text-[10px] uppercase font-bold tracking-widest mb-3">
              Flagship Tracks
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark tracking-tight">
              Engineered for Elite Minds
            </h2>
            <p className="text-sm md:text-base text-dark/70 max-w-2xl mt-3">
              Choose from {competitions?.length || 19} high-stakes tracks evaluated by
              industry veterans and distinguished academic scholars.
            </p>
          </div>
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-dark border-b-2 border-secondary pb-1 transition-colors self-start md:self-auto"
          >
            <span>View All {competitions?.length || 19} Competitions</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <Loader isLoading={isLoading}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((comp) => (
              <div
                key={comp.id}
                className="group relative rounded-2xl bg-white border border-dark/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-light border border-secondary/15 p-2 flex items-center justify-center">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-primary text-dark text-xs font-extrabold shadow-sm">
                    Winner: {formatPKR(comp.winner_Prize)}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-4 group-hover:text-secondary transition-colors">
                    {comp.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-dark/10">
                    <div>
                      <span className="text-[10px] font-bold text-dark/55 uppercase block">
                        Registration Fee
                      </span>
                      <span className="text-base font-bold text-dark">
                        {formatPKR(comp.fees)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-dark/55 uppercase block">
                        Max Team Size
                      </span>
                      <span className="text-base font-bold text-dark">
                        {comp.max_team_size} Members
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/competitions?comp=${comp.id}`}
                  className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-dark text-primary text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors"
                >
                  <span>View Rules &amp; Prizes</span>
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              </div>
            ))}
          </div>
        </Loader>
      </div>
    </section>
  )
}

function VideoAndGallerySection() {
  const [toggler, setToggler] = useState(false)
  const [activeImage, setActiveImage] = useState('')

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 md:px-14 bg-surface-dark text-light border-y border-primary/15">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] text-primary uppercase font-bold tracking-widest block mb-2">
            Relive The Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-light tracking-tight">
            SOFTEC Highlights
          </h2>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-primary/25 shadow-2xl mb-14">
          <LiteYouTubeEmbed
            id="wzCHr34CDiQ"
            title="SOFTEC Highlights"
            poster="maxresdefault"
            webp
            aspectHeight={9}
            aspectWidth={16}
            params="rel=0"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {activityImages.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setToggler(!toggler)
                setActiveImage(`/assets/activities/2026/${item.id}.jpg`)
              }}
              className="group relative rounded-xl overflow-hidden aspect-[3/2] border border-outline-subtle/40 cursor-pointer"
            >
              <img
                src={item.image}
                alt={`SOFTEC Highlight ${item.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  zoom_in
                </span>
              </div>
            </div>
          ))}
        </div>
        <FsLightbox toggler={toggler} type="image" sources={[activeImage]} />
      </div>
    </section>
  )
}

function ConferencesAndEcosystem() {
  const { data: mediaPartners } = useApiQuery('/media-partners/')
  const { data: communityPartners } = useApiQuery('/community-partners/')
  const { data: techCollaborators } = useApiQuery('/tech-collaborators/')

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 md:px-14 bg-light text-dark">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Conference Banner */}
        <div className="rounded-2xl overflow-hidden border border-dark/10 shadow-lg bg-white">
          <div className="px-6 py-4 bg-secondary text-light flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Conferences &amp; Talks
            </span>
            <span className="text-xs text-on-surface-muted">Industry Keynotes</span>
          </div>
          <img
            src="/assets/conference.png"
            className="w-full object-cover"
            alt="What AI is replacing and How you can win?"
            loading="lazy"
          />
        </div>

        {/* Sponsors */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] text-secondary uppercase font-bold tracking-widest block mb-2">
              Ecosystem Enablers
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark tracking-tight">
              Our Sponsors
            </h2>
          </div>
          <SponsorsGrid />
        </div>

        {/* Media Partners */}
        {mediaPartners && (
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-center text-secondary mb-8">
              Media Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {mediaPartners.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-4 bg-white rounded-xl border border-dark/10 w-44 sm:w-52 h-28 hover:border-secondary hover:shadow-md transition-all"
                >
                  <img
                    src={p.logo}
                    alt={p.title}
                    title={p.title}
                    className="max-h-16 max-w-[140px] object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Community Partners */}
        {communityPartners && (
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-center text-secondary mb-8">
              Community Partners
            </h3>
            <Marquee gradient gradientColor="#F2F3EB" speed={110} pauseOnHover>
              {communityPartners.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 mx-3 bg-white rounded-xl border border-dark/10 flex items-center justify-center w-44 h-24"
                >
                  <img
                    src={p.logo}
                    alt={p.title}
                    title={p.title}
                    loading="lazy"
                    className="max-h-16 max-w-[140px] object-contain"
                  />
                </a>
              ))}
            </Marquee>
          </div>
        )}

        {/* Technical Collaborators */}
        {techCollaborators && (
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-center text-secondary mb-8">
              Technical Collaborators
            </h3>
            <Marquee
              gradient
              gradientColor="#F2F3EB"
              speed={80}
              pauseOnHover
              direction="right"
            >
              {techCollaborators.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 mx-3 bg-white rounded-xl border border-dark/10 flex items-center justify-center w-44 h-24"
                >
                  <img
                    src={p.logo}
                    alt={p.title}
                    title={p.title}
                    loading="lazy"
                    className="max-h-16 max-w-[140px] object-contain"
                  />
                </a>
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  )
}

function StatsSection() {
  const { data: competitions } = useApiQuery('/competitions_listable/')
  const competitionCount = competitions?.length || 19

  const stats = [
    { title: 'Legacy Edition', count: 30, suffix: 'th', desc: 'Pioneering collegiate tech since 1995.' },
    { title: 'Participants', count: 2500, suffix: '+', desc: 'Delegates from top institutes nationwide.' },
    { title: 'Total Footfall', count: 17000, suffix: '+', desc: 'Tech leaders, alumni & enthusiasts.' },
    { title: 'Competitions', count: competitionCount, desc: 'AI, coding, cyber defense & robotics.' },
    { title: 'Prize Money', count: 2, suffix: 'M+', desc: 'Direct cash prizes and awards.' },
    { title: 'Universities', count: 30, suffix: '+', desc: 'Represented across Pakistan & beyond.' },
  ]

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 md:px-14 bg-secondary border-y border-primary/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] text-primary uppercase font-bold tracking-widest block mb-2">
              Three Decades of Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-light tracking-tight">
              Impact in Numbers
            </h2>
          </div>
          <p className="text-sm md:text-base text-on-surface-muted max-w-md">
            Setting the benchmark as Pakistan&apos;s flagship university technology
            Olympiad since 1995.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="p-7 rounded-2xl bg-surface-card/70 backdrop-blur-md border border-primary/20 hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">
                <CountUp
                  enableScrollSpy
                  scrollSpyOnce
                  delay={0.5}
                  end={stat.count}
                  suffix={stat.suffix || ''}
                  duration={1.5}
                />
              </div>
              <h4 className="text-lg font-bold text-light mb-1">{stat.title}</h4>
              <p className="text-xs sm:text-sm text-on-surface-muted">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CampusSection() {
  const days = [
    {
      tag: 'D1',
      title: 'Day 1: April 16, 2027 — Grand Opening & Preliminaries',
      desc: 'Keynote addresses, initial programming heats, and qualification brackets.',
      cls: 'bg-primary text-dark',
    },
    {
      tag: 'D2',
      title: 'Day 2: April 17, 2027 — Hackathons & Exhibitions',
      desc: '36-hour sprints, Software Project Expo, CTF showdown, and industry networking.',
      cls: 'bg-tertiary text-dark',
    },
    {
      tag: 'D3',
      title: 'Day 3: April 18, 2027 — Finales & Grand Award Night',
      desc: 'Final jury defense, formal award ceremony, and closing celebrations.',
      cls: 'bg-secondary text-primary border border-primary/30',
    },
  ]

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 md:px-14 bg-surface-dark text-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-secondary text-primary text-[10px] uppercase font-bold tracking-widest mb-4">
            Venue &amp; Schedule
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-light tracking-tight mb-5">
            FAST NUCES Lahore Campus
          </h2>
          <p className="text-sm md:text-base text-on-surface-muted mb-8 leading-relaxed">
            Spread over 12.5 acres in Faisal Town, Lahore, FAST NUCES combines striking
            architectural heritage with state-of-the-art computing and engineering
            laboratories.
          </p>

          <div className="space-y-4 mb-6">
            {days.map((d) => (
              <div
                key={d.tag}
                className="p-4 rounded-xl bg-surface-high border border-outline-subtle/40 flex items-start gap-4"
              >
                <span
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${d.cls}`}
                >
                  {d.tag}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-light">{d.title}</h4>
                  <p className="text-xs sm:text-sm text-on-surface-muted mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-on-surface-muted">
            <span className="material-symbols-outlined text-primary">pin_drop</span>
            <span>852-B Milaad St, Block B Faisal Town, Lahore 54770, Pakistan</span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-primary/20 bg-surface-high p-4 sm:p-6 shadow-2xl">
            <div className="rounded-xl overflow-hidden border border-outline-subtle/40 mb-5">
              <iframe
                title="FAST NUCES Lahore Campus Map"
                loading="lazy"
                className="w-full h-[280px] sm:h-[340px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13607.668560810213!2d74.27661824911654!3d31.498961304052212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore%20Campus!5e0!3m2!1sen!2s!4v1580080747006!5m2!1sen!2s"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-tertiary uppercase font-bold tracking-wider block">
                  Arrival Protocol
                </span>
                <h5 className="text-base font-bold text-light">Main Gate 2 Entry</h5>
                <p className="text-xs text-on-surface-muted">
                  Designated parking for registered participant buses &amp; delegates.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=FAST+NUCES+Lahore+Campus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-dark text-xs font-extrabold hover:shadow-glow transition-all shrink-0"
              >
                <span>Open in Maps</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <PageWrapper title="Home" size="8xl">
      <HeroSection />
      <FeaturedCompetitionsSection />
      <VideoAndGallerySection />
      <ConferencesAndEcosystem />
      <StatsSection />
      <CampusSection />
    </PageWrapper>
  )
}
