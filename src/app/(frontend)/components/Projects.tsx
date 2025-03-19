import { getPayload } from 'payload'
import config from '@/payload.config'
import styles from './Projects.module.css'
import strings from '@/app/lib/strings'
import Card from './Card'

export interface Project {
  id: string
  title: string
  subtitle: string
  role: string
  slug: string
}

export async function Projects({ isHomePage }: { isHomePage: boolean }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: projects } = await payload
    .find({
      collection: 'projects',
      limit: isHomePage ? 6 : 10,
    })
    .catch(() => ({ docs: [] }))

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section
      className={`${styles.projectsSection} container`}
      style={{ marginTop: isHomePage ? '4rem' : '0' }}
    >
      {isHomePage ? (
        <h2>{strings.projects.homepageTitle}</h2>
      ) : (
        <h1>{strings.projects.pageTitle}</h1>
      )}
      <div className={styles.projectsGrid}>
        <Card projects={projects as Project[]} />
      </div>
    </section>
  )
}
