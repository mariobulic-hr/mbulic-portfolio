import Link from 'next/link'
import styles from './Card.module.css'
import type { Project } from './Projects'

const Card = ({ projects }: { projects: Project[] }) => {
  return projects.map((project: Project) => (
    <Link key={project.id} href={`/projects/${project.slug}`} className={styles.projectCard}>
      <div className={styles.projectContent}>
        <div className={styles.projectTitle}>
          <h3>{project.title}</h3>
        </div>
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
        {project.role && <p className={styles.projectRole}>{project.role}</p>}
      </div>
      <div className={styles.projectLinks}>
        <span className={styles.projectLink}>Read More</span>
      </div>
    </Link>
  ))
}

export default Card
