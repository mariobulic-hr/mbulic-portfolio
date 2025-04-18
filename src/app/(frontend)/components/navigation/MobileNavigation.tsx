'use client'

import { useMobileMenu } from '../../context/Context'
import styles from './MobileNavigation.module.css'
import Link from 'next/link'
import { GithubLogo, LinktreeLogo, LinkedinLogo } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'

const MobileNavigation = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const pathname = usePathname()

  const closeDrawer = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayOpen : ''}`}
        onClick={closeDrawer}
      />

      <div className={`${styles.drawer} ${isMobileMenuOpen ? styles.drawerOpen : ''}`}>
        <nav className={styles.nav}>
          <Link href="/" className={pathname === '/' ? styles.active : ''} onClick={closeDrawer}>
            Home
          </Link>
          <Link
            href="/projects"
            className={pathname === '/projects' ? styles.active : ''}
            onClick={closeDrawer}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={pathname === '/contact' ? styles.active : ''}
            onClick={closeDrawer}
          >
            Contact
          </Link>
          <div className={styles.socialLinks}>
            <Link
              href="https://github.com/mariobulic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Github profile"
            >
              <GithubLogo size={32} />
            </Link>
            <Link
              href="https://linkedin.com/in/mariobulic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <LinkedinLogo size={32} />
            </Link>
            <Link
              href="https://linktr.ee/mariobulic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Linktree profile"
            >
              <LinktreeLogo size={32} />
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileNavigation
