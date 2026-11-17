'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import EntitySelector from '../components/EntitySelector'
import Button from '../components/Button'
import assets from '../assets'
import { useApiQuery } from '../services/api'

const formatPKR = new Intl.NumberFormat('ur-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
}).format

function FeatureStatCard({ text, value, svg, accentClass }) {
  return (
    <div className={`flex flex-wrap gap-4 rounded-xl border-l-4 w-full sm:w-auto ${accentClass}`}>
      <div className="flex items-start p-5 sm:p-6 shadow-md w-full sm:min-w-[300px] md:min-w-[340px] bg-white rounded-r-xl">
        <div className="flex items-center justify-center mx-2 h-14 w-14 rounded-full bg-secondary text-primary">
          <img src={svg} alt={text} width={28} />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{value}</h2>
          <p className="mt-1 text-sm font-medium text-dark/60">{text}</p>
        </div>
      </div>
    </div>
  )
}

function CompetitionMeta({ selected }) {
  if (!selected) return null
  return (
    <div className="md:px-6 flex flex-wrap justify-center gap-8 px-6 mb-6">
      <FeatureStatCard
        text="Registration Fee"
        value={formatPKR(selected.fees)}
        accentClass="border-secondary"
        svg={assets.Dollar}
      />
      <FeatureStatCard
        text="Max Members"
        value={selected.max_team_size}
        accentClass="border-tertiary"
        svg={assets.Person}
      />
    </div>
  )
}

function CompetitionDocuments({ selected }) {
  if (!selected?.details?.length) return null
  return (
    <section className="details flex items-center justify-center mx-auto my-5">
      <div className="gap-x-12 gap-y-6 md:flex-row flex flex-col py-4 mx-auto">
        {selected.details.map((doc) => (
          <a key={doc.title} target="_blank" rel="noreferrer" href={doc.document}>
            <Button outlined download text={doc.title} type="button" />
          </a>
        ))}
      </div>
    </section>
  )
}

function CompetitionPrizes({ selected }) {
  if (!selected) return null
  return (
    <section className="prizes">
      <Heading text="Prizes" />
      <div className="flex flex-col items-center justify-center gap-10 px-6 py-4 mt-10 md:items-end md:flex-row">
        <div className="border-2 border-primary text-light order-1 md:order-2 rounded-2xl py-8 px-6 w-full max-w-[20rem] md:w-[24rem] bg-secondary shadow-2xl">
          <img
            src={assets.GoldAward}
            alt="Gold Award"
            width={150}
            className="pb-2 mx-auto"
          />
          <h3 className="text-4xl md:text-6xl mt-4 font-bold text-center text-primary">Winner</h3>
          <h4 className="mt-5 text-3xl text-center text-light">
            <strong>{formatPKR(selected.winner_Prize)}</strong>
          </h4>
        </div>

        {selected.runnerUp_Prize && (
          <div
            className={`border border-secondary/20 text-dark order-2 ${
              selected.second_RunnerUp_Prize ? 'md:order-1' : 'md:order-3'
            } w-[16rem] rounded-2xl py-6 px-4 md:w-[18rem] bg-white shadow-lg`}
          >
            <img
              src={assets.SilverAward}
              alt="Silver Award"
              width={100}
              className="pb-2 mx-auto"
            />
            <h3 className="text-3xl font-bold text-center text-secondary">Runner up</h3>
            <h4 className="mt-5 text-2xl text-center text-dark">
              <strong>{formatPKR(selected.runnerUp_Prize)}</strong>
            </h4>
          </div>
        )}

        {selected.second_RunnerUp_Prize && (
          <div className="border border-tertiary/40 text-dark order-3 rounded-2xl w-[16rem] py-6 px-4 md:w-[18rem] bg-tertiary/20 shadow-lg">
            <img
              src={assets.BronzeAward}
              alt="Bronze Award"
              width={75}
              className="pb-2 mx-auto"
            />
            <h3 className="text-2xl font-bold text-center text-secondary">Runner up 2</h3>
            <h4 className="mt-5 text-2xl text-center text-dark">
              <strong>{formatPKR(selected.second_RunnerUp_Prize)}</strong>
            </h4>
          </div>
        )}
      </div>

      {selected.name?.includes('Gaming') && (
        <>
          <Heading text="Valorant" />
          <CompetitionMeta selected={{ fees: 2500, max_team_size: 6 }} />
          <div className="flex flex-col items-center justify-center gap-10 px-6 py-4 mt-10 md:items-end md:flex-row">
            <div className="border-2 border-primary text-light order-1 md:order-2 rounded-2xl py-8 px-6 md:w-[26rem] bg-secondary shadow-2xl">
              <img
                src={assets.GoldAward}
                alt="Gold Award"
                width={150}
                className="pb-2 mx-auto"
              />
              <h3 className="text-6xl mt-4 font-bold text-center text-primary">Winner</h3>
              <h4 className="mt-5 text-3xl text-center">
                <strong>{formatPKR(20000)}</strong>
              </h4>
            </div>
            <div className="border border-secondary/20 text-dark order-2 md:order-3 w-[16rem] rounded-2xl py-6 px-4 md:w-[18rem] bg-white shadow-lg">
              <img
                src={assets.SilverAward}
                alt="Silver Award"
                width={100}
                className="pb-2 mx-auto"
              />
              <h3 className="text-3xl font-bold text-center text-secondary">Runner up</h3>
              <h4 className="mt-5 text-2xl text-center">
                <strong>{formatPKR(10000)}</strong>
              </h4>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function CompetitionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialId = Number(searchParams.get('comp')) || 1
  const [selectedId, setSelectedId] = useState(initialId)
  const detailsRef = useRef(null)
  const { data: competitions, isLoading } = useApiQuery('/competitions_listable/')

  useEffect(() => {
    const paramId = Number(searchParams.get('comp'))
    if (paramId) setSelectedId(paramId)
  }, [searchParams])

  const selected =
    competitions?.find((c) => c.id === selectedId) || competitions?.[0] || null

  const handleCopyShareLink = () => {
    if (!selected) return
    const url = `${window.location.origin}/competitions?comp=${selected.id}`
    navigator.clipboard?.writeText(url)
    toast.success(`Link copied for ${selected.name}`)
  }

  return (
    <PageWrapper size={8} title="Competitions">
      <Heading text="Competitions" />
      <Loader isLoading={isLoading}>
        <EntitySelector
          showMeta
          list={competitions}
          selected={selected?.id ?? selectedId}
          handleClick={(id) => {
            setSelectedId(id)
            router.replace(`/competitions?comp=${id}`, { scroll: false })
            detailsRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          }}
        />
        <div
          className="scroll-my-20 flex flex-col justify-center py-4"
          ref={detailsRef}
        >
          <section className="md:my-10 info w-full my-4">
            <div className="flex flex-wrap justify-center gap-4 px-4">
              <Link
                href="/registration/competition/"
                className="text-dark bg-primary rounded-xl hover:bg-secondary hover:text-primary border-secondary border-2 px-8 py-4 font-bold uppercase focus:outline-none text-xl text-center transition-all shadow-md"
              >
                Register Now
              </Link>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="text-secondary bg-white rounded-xl hover:bg-secondary hover:text-primary border-secondary/30 border-2 px-6 py-4 font-bold uppercase text-base transition-all"
              >
                Share Competition Link
              </button>
            </div>

            {selected?.sponsor && (
              <section className="sponsor w-full mt-10">
                <Heading text="Powered By" />
                <div className="py-4 px-6 flex flex-col mx-auto max-w-[20rem] justify-center bg-white rounded-2xl border border-secondary/15">
                  <img
                    src={selected.sponsor.logo}
                    className="object-contain mx-auto max-h-28"
                    width={240}
                    alt={selected.sponsor.name}
                  />
                </div>
              </section>
            )}

            <Heading text={selected ? `${selected.name} — Details` : 'Details'} />
            <CompetitionMeta selected={selected} />
            <CompetitionDocuments selected={selected} />
          </section>

          <CompetitionPrizes selected={selected} />

          {selected?.technical_collaborator?.length > 0 && (
            <section className="sponsor w-full mt-10">
              <Heading text="Technical Collaborators" />
              <div className="sm:m-auto flex flex-wrap justify-center gap-6 mx-10">
                {selected.technical_collaborator.map((collab) => (
                  <div
                    key={collab.name}
                    className="bg-white p-4 rounded-xl border border-secondary/15"
                  >
                    <img
                      src={collab.logo}
                      className="object-contain max-h-24"
                      width={220}
                      alt={collab.name}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </Loader>
    </PageWrapper>
  )
}

export default function CompetitionsPage() {
  return (
    <Suspense fallback={null}>
      <CompetitionsContent />
    </Suspense>
  )
}
