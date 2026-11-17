'use client'

import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import MemberCard from '../components/MemberCard'
import { useApiQuery } from '../services/api'

export default function HallOfHonorPage() {
  const { data, isLoading } = useApiQuery('/hof/')

  return (
    <PageWrapper size={7} title="Hall of Honor">
      <Heading text="Hall of Honor" />
      <Loader isLoading={isLoading}>
        <div className="flex flex-wrap justify-center gap-6">
          {data?.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </Loader>
    </PageWrapper>
  )
}
