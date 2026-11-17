'use client'

import PageWrapper from '../components/PageWrapper'
import Heading from '../components/Heading'
import SponsorsGrid from '../components/SponsorsGrid'

export default function SponsorsPage() {
  return (
    <PageWrapper size="8xl" title="Sponsors">
      <Heading text="Sponsors for SOFTEC 2027" />
      <SponsorsGrid />
    </PageWrapper>
  )
}
