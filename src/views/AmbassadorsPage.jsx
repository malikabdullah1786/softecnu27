'use client'

import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import MemberCard from '../components/MemberCard'
import { useApiQuery } from '../services/api'

export default function AmbassadorsPage() {
  const { data, isLoading, isFetched, isError } = useApiQuery('/ambassadors/')

  return (
    <PageWrapper size={7} title="Ambassadors">
      <Heading text="Ambassadors" />
      <div className="flex flex-wrap justify-center gap-6 px-4">
        <Loader isLoading={isLoading}>
          {isError || (isFetched && (!data || data.length === 0)) ? (
            <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto bg-white border border-secondary/15 rounded-2xl p-10 text-center shadow-sm my-8">
              <span className="px-3 py-1 rounded-full bg-primary/40 text-secondary text-xs font-bold uppercase tracking-wider">
                SOFTEC Campus Ambassadors
              </span>
              <h2 className="text-2xl font-bold text-secondary mt-4">
                Ambassador Profiles Coming Soon
              </h2>
              <p className="text-dark/70 mt-2">
                Our campus ambassador directory for this edition is currently being
                updated. Check back soon or explore our competitions.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Link
                  href="/registration/ambassador"
                  className="px-6 py-3 rounded-lg bg-secondary text-primary font-bold hover:bg-dark transition-all"
                >
                  Ambassador Registration
                </Link>
                <Link
                  href="/competitions"
                  className="px-6 py-3 rounded-lg border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-primary transition-all"
                >
                  View Competitions
                </Link>
              </div>
            </div>
          ) : (
            data?.map((member) => (
              <MemberCard key={member.code || member.id} role="ambassador" member={member} />
            ))
          )}
        </Loader>
      </div>
    </PageWrapper>
  )
}
