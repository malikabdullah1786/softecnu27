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
      <div className="rounded-2xl xl:mx-0 group relative overflow-hidden cursor-pointer">
        <div className="md:opacity-0 rounded-xl group-hover:md:opacity-100 from-black/80 to-transparent bg-gradient-to-t -bottom-2 absolute inset-x-0 z-10 text-white transition duration-300 ease-in-out opacity-100 cursor-pointer">
          <div className="transform-gpu bg-textGradient group-hover:md:opacity-100 group-hover:md:translate-y-0 p-4 pb-10 space-y-3 text-xl transition duration-300 ease-in-out translate-y-4">
            <div className="md:block hidden text-lg font-bold text-white">
              {selected.description}
            </div>
          </div>
        </div>
        <div
          className="w-full max-h-[720px]"
          style={{
            filter: loaded ? 'grayscale(0) blur(0px)' : 'grayscale(100%) blur(10px)',
          }}
        >
          <img
            alt={selected.name}
            width={1080}
            height={720}
            className="w-full bg-logo-light-yellow max-h-[720px] object-cover transition duration-300 ease-in-out group-hover:scale-110"
            src={selected.highlight_image}
          />
        </div>
      </div>
      <div className="md:hidden mt-4 text-base text-gray-700">
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
