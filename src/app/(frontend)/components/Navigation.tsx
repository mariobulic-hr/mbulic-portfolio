import Link from 'next/link'
import Image from 'next/image'
import styles from './Navigation.module.css'
import Icon from '@mdi/react'
import { mdiLinkedin, mdiGithub } from '@mdi/js'

const Navigation = () => {
  return (
    <nav className={`${styles.navigation} container`}>
      <div className={styles.navigationTitle}>
        <Link href="/">
          <Image src={`/images/mbulic.svg`} alt="Mario Bulic" width={70} height={70} priority />
        </Link>
      </div>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link href="/projects">Projects</Link>
        </li>
        {/*        <li className={styles.navigationItem}>
          <Link href="/stories">Stories</Link>
        </li> */}
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
      </ul>
    </nav>
  )
}

export default Navigation
