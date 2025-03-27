'use client'

import Link from 'next/link'
import { GithubLogo, LinktreeLogo, LinkedinLogo } from '@phosphor-icons/react'
import styles from './DesktopNavigation.module.css'

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
          <GithubLogo size={32} />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://linkedin.com/in/mariobulic" target="_blank" rel="noopener noreferrer">
          <LinkedinLogo size={32} />
        </a>
      </li>
      <li className={styles.navigationItem}>
        <a href="https://linktr.ee/mariobulic" target="_blank" rel="noopener noreferrer">
          <LinktreeLogo size={32} />
        </a>
      </li>
    </ul>
  )
}

export default DesktopNavigation
