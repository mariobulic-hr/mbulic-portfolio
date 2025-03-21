import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroSection from './components/HeroSection'
import TechTags from './components/TechTags'
import ScrollArrow from './components/ScrollArrow'
import { Projects } from './components/Projects'

// This makes the page static
export const revalidate = 3600 // Revalidate every hour

async function getHomepageData() {
  const payload = await getPayload({ config })
  const homepageData = await payload
    .findGlobal({
      slug: 'homepage',
    })
    .catch(() => null)

  return homepageData
}

export default async function Home() {
  const homepageData = await getHomepageData()

  return (
    <>
      <HeroSection homepageData={homepageData!} />
      <TechTags techTags={homepageData?.techStack} />
      <ScrollArrow />
      <Projects isHomePage={true} />
    </>
  )
}
