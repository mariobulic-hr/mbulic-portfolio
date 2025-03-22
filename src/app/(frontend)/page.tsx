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

  if (!homepageData) {
    return (
      <div className="container">
        <h1>Error loading homepage data</h1>
        <p>Please try again later.</p>
      </div>
    )
  }

  return (
    <>
      <HeroSection homepageData={homepageData} />
      <TechTags techTags={homepageData.techStack} />
      <ScrollArrow />
      <Projects isHomePage={true} />
    </>
  )
}
