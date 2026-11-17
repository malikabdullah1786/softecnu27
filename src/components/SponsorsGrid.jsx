'use client'

import { useApiQuery } from '../services/api'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import MotionReveal from './MotionReveal'

function SponsorTier({ sponsorList, level }) {
  return (
    <div>
      <h2 className="text-secondary mt-10 text-3xl font-bold text-center">{level}</h2>
      <div className="flex flex-wrap justify-evenly gap-4 p-6 mt-6 bg-white rounded-2xl border border-secondary/15 shadow-sm">
        {sponsorList.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.link}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-secondary/10 bg-light/60 hover:border-secondary/40 hover:shadow-md transition-all w-full max-w-[220px] sm:w-52 h-36"
          >
            <MotionReveal fullHeight>
              <div className="justify-center flex flex-col items-center h-full">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name || sponsor.title || level}
                  title={sponsor.title || sponsor.name}
                  className="object-contain max-h-20 max-w-[180px] p-0 hover:opacity-85"
                  loading="lazy"
                />
                {sponsor.title && (
                  <h3 className="text-secondary mt-2 text-sm font-bold text-center">
                    {sponsor.title}
                  </h3>
                )}
              </div>
            </MotionReveal>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function SponsorsGrid() {
  const { data, error, isLoading } = useApiQuery('/sponsors/')

  if (error) return <ErrorMessage />
  if (!data) return null

  const tiers = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Education Partner']

  return (
    <div className="flex justify-center mx-auto flex-col w-[95%] md:w-4/5">
      <Loader isLoading={isLoading}>
        {tiers.map(
          (level) =>
            data[level] && (
              <SponsorTier key={level} sponsorList={data[level]} level={level} />
            )
        )}
      </Loader>
    </div>
  )
}
