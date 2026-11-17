'use client'

import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import MemberCard from '../components/MemberCard'
import { useApiQuery } from '../services/api'

export default function TeamPage() {
  const { data, isLoading } = useApiQuery('/exeTeam/')

  return (
    <PageWrapper size={7} title="Executive Team">
      <Heading text="Our Executive Team" />
      <Loader isLoading={isLoading}>
        <div className="flex flex-wrap justify-center gap-6">
          {data?.map((member) => (
            <MemberCard
              key={member.id}
              imageClass="h-[400px]"
              member={member}
            />
          ))}
        </div>
      </Loader>
    </PageWrapper>
  )
}
