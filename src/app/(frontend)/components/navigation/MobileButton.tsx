'use client'
import { useMobileMenu } from '@/app/(frontend)/context/Context'
import { List, X } from '@phosphor-icons/react'
import styles from './MobileButton.module.css'

const MobileButton = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <button
      className={styles.navigationMenuButton}
      onClick={toggleMenu}
      aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isMobileMenuOpen}
    >
      {isMobileMenuOpen ? <X size={32} /> : <List size={32} />}
    </button>
  )
}

export default MobileButton
