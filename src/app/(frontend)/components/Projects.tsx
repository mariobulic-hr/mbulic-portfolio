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
  timeStart: string
  timeEnd: string
}

const sortProjects = (projects: Project[]) => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.timeStart)
    const dateB = new Date(b.timeStart)
    return dateB.getTime() - dateA.getTime()
  })
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
    <div className={`${styles.projectsSection} ${isHomePage ? 'spacing-top' : ''}`}>
      {isHomePage ? (
        <h2>{strings.projects.homepageTitle}</h2>
      ) : (
        <h1>{strings.projects.pageTitle}</h1>
      )}
      <div className={styles.projectsGrid}>
        <Card projects={sortProjects(projects as Project[])} />
      </div>
    </div>
  )
}
