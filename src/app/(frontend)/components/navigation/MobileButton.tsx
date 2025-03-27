'use client'
import { useMobileMenu } from '@/app/(frontend)/context/Context'
import { List } from '@phosphor-icons/react'
import styles from './MobileButton.module.css'

const MobileButton = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <div className={styles.navigationMenuButton} onClick={toggleMenu}>
      <List size={32} />
    </div>
  )
}

export default MobileButton
