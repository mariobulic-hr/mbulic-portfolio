import { mdiGithub } from '@mdi/js'
import styles from './DesktopNavigation.module.css'
import Link from 'next/link'
import Icon from '@mdi/react'
import { mdiLinkedin, mdiTreeOutline } from '@mdi/js'

const DesktopNavigation = () => {
  return (
    <ul className={styles.navigationList}>
      <li className={styles.navigationItem}>
        <Link href="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link href="/projects">Projects</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link href="/contact">Contact</Link>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://github.com/mariobulic-hr" target="_blank" rel="noopener noreferrer">
          <Icon path={mdiGithub} title="Github profile" size={1} />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://linkedin.com/in/mariobulic" target="_blank" rel="noopener noreferrer">
          <Icon path={mdiLinkedin} title="Linkedin profile" size={1} />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://linktr.ee/mariobulic" target="_blank" rel="noopener noreferrer">
          <Icon path={mdiTreeOutline} title="Github profile" size={1} />
        </a>
      </li>
    </ul>
  )
}

export default DesktopNavigation
