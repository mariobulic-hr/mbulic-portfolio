import Link from 'next/link'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navigationTitle}>
        <Link href="/">
          {'<'} Mario<span className={styles.navigationTitleDot}>.</span>Bulic {'>'}
        </Link>
      </div>
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
          <a
            href="/MarioBulicResume.pdf"
            download="MarioBulicResume.pdf"
            className={styles.downloadButton}
          >
            My Resume
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
