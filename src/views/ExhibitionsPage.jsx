'use client'

import { useEffect, useRef, useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import EntitySelector from '../components/EntitySelector'
import { useApiQuery } from '../services/api'

function ExhibitionDetail({ selected }) {
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    if (!selected?.highlight_image) return
    setLoaded(false)
    let img = new Image()
    img.src = selected.highlight_image
    img.onload = () => setLoaded(true)
    return () => {
      img = null
    }
  }, [selected])

  if (!selected) return null

  return (
    <section className="w-full px-6">
      <h3 className="md:text-4xl text-logo-black py-12 text-2xl font-bold text-center">
        {selected.name}
      </h3>
      <div className="rounded-2xl xl:mx-0 group relative overflow-hidden cursor-pointer border border-secondary/15 shadow-lg">
        <div className="md:opacity-0 rounded-xl group-hover:md:opacity-100 from-dark/90 via-dark/50 to-transparent bg-gradient-to-t bottom-0 absolute inset-x-0 z-10 text-light transition duration-300 ease-in-out opacity-100 cursor-pointer">
          <div className="transform-gpu group-hover:md:opacity-100 group-hover:md:translate-y-0 p-6 space-y-3 text-xl transition duration-300 ease-in-out translate-y-2">
            <div className="md:block hidden text-base lg:text-lg font-semibold text-light">
              {selected.description}
            </div>
          </div>
        </div>
        <div
          className="w-full max-h-[600px]"
          style={{
            filter: loaded ? 'grayscale(0) blur(0px)' : 'grayscale(100%) blur(10px)',
          }}
        >
          <img
            alt={selected.name}
            width={1080}
            height={720}
            className="w-full bg-light max-h-[600px] object-cover transition duration-300 ease-in-out group-hover:scale-105"
            src={selected.highlight_image}
          />
        </div>
      </div>
      <div className="md:hidden mt-4 p-5 rounded-xl bg-white border border-secondary/15 text-sm text-dark/80 shadow-sm">
        {selected.description}
      </div>
    </section>
  )
}

export default function ExhibitionsPage() {
  const [selectedId, setSelectedId] = useState(1)
  const detailRef = useRef(null)
  const { data: exhibitions, isLoading } = useApiQuery('/exhibitions/')

  const selected =
    exhibitions?.find((e) => e.id === selectedId) || exhibitions?.[0] || null

  return (
    <PageWrapper size={7} title="Exhibitions">
      <Heading text="Exhibitions" />
      <Loader isLoading={isLoading}>
        <EntitySelector
          list={exhibitions}
          selected={selected?.id ?? selectedId}
          handleClick={(id) => {
            setSelectedId(id)
            detailRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            })
          }}
        />
        <div className="scroll-my-20 flex flex-col justify-center py-4" ref={detailRef}>
          <ExhibitionDetail selected={selected} />
        </div>
      </Loader>
    </PageWrapper>
  )
}
