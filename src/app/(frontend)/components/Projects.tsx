import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import styles from './Projects.module.css'
import TechTags from './TechTags'

interface Project {
  id: string
  title: string
  subtitle: string
  role?: string
  projectTechnologies?: { technology: string }[]
  projectURL?: string
  githubURL?: string
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
    <section className={styles.projectsSection} style={{ marginTop: isHomePage ? '4rem' : '0' }}>
      {isHomePage ? <h2>My Projects</h2> : <h1>Projects</h1>}
      <div className={styles.projectsGrid}>
        {projects.map((project) => {
          return (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>
                {project.role && <p className={styles.projectRole}>{project.role}</p>}

                {!isHomePage && <TechTags techTags={project.projectTechnologies} />}

                <div className={styles.projectLinks}>
                  {project.slug && (
                    <a href={`/projects/${project.slug}`} className={styles.projectLink}>
                      Read More
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
