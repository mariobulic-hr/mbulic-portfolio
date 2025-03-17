import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Projects } from './components/Projects'
import TechTags from './components/TechTags'
import Image from 'next/image'
import Link from 'next/link'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homepageData = await payload
    .findGlobal({
      slug: 'homepage',
    })
    .catch(() => null)

  return (
    <div className="main">
      <div className="heroSection">
        <div className="heroSectionContent">
          <div className="heroSectionImage">
            <Image
              src={`/images/mariobulic.webp`}
              alt="Mario Bulic"
              width={0}
              height={0}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </div>
          <div className="heroSectionDescription">
            <h1>{homepageData?.title}</h1>
            <p>{homepageData?.description}</p>
            <div className="heroSectionLinks">
              <Link href="/contact" className="heroSectionLink">
                Get a Quote
              </Link>
              <Link href="/about" className="heroSectionLink heroSectionLinkSecondary">
                My Story
              </Link>
            </div>
          </div>
        </div>
      </div>
      <TechTags techTags={homepageData?.techStack} />
      <Projects isHomePage={true} />
    </div>
  )
}
