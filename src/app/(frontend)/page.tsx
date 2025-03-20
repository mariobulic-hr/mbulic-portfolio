import { getPayload } from 'payload'
import { Suspense } from 'react'
import config from '@/payload.config'
import { Projects } from './components/Projects'
import TechTags from './components/TechTags'
import HeroSection from './components/HeroSection'
import ScrollArrow from './components/ScrollArrow'
import Loading from './loading'

import './styles.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <div className="main">
      <Suspense fallback={<Loading />}>
        <HeroSectionWithData />
      </Suspense>
      <Projects isHomePage={true} />
    </div>
  )
}

async function HeroSectionWithData() {
  'use server'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepageData = await payload
    .findGlobal({
      slug: 'homepage',
    })
    .catch(() => null)

  return (
    <>
      <HeroSection homepageData={homepageData} />
      <TechTags techTags={homepageData?.techStack} />
      <ScrollArrow />
    </>
  )
}
