import Image from 'next/image'
import Link from 'next/link'
import strings from '@/app/lib/strings'
import DotAccent from './DotAccent'
import styles from './HeroSection.module.css'
import { Homepage } from '@/payload-types'

const HeroSection = ({ homepageData }: { homepageData: Homepage }) => {
  return (
    <div className={`${styles.heroSection} container`}>
      <div className={styles.heroSectionContent}>
        <div className={styles.heroSectionImage}>
          <Image
            src={`/images/mariobulic.jpeg`}
            alt="Mario Bulic"
            width={0}
            height={0}
            priority
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={styles.heroSectionDescription}>
          <h1>
            {strings.homepage.hi}
            <DotAccent />
            {homepageData?.title}
          </h1>
          <p>{homepageData?.description}</p>
          <div className={styles.heroSectionLinks}>
            <Link href="/contact" className={styles.heroSectionLink}>
              {strings.homepage.quote}
            </Link>
            <Link href="/stories/introduction" className={styles.heroSectionLinkSecondary}>
              {strings.homepage.about}
            </Link>
            <a
              href="/MarioBulicResume.pdf"
              download="MarioBulicResume.pdf"
              className={`${styles.heroSectionLinkSecondary} ${styles.heroSectionLink}`}
            >
              My Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
