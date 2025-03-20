'use client'

import { mdiMenuOpen } from '@mdi/js'
import Icon from '@mdi/react'
import { useMobileMenu } from '@/app/(frontend)/context/Context'
import styles from './MobileButton.module.css'

const MobileButton = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <div className={styles.navigationMenuButton} onClick={toggleMenu}>
      <Icon path={mdiMenuOpen} size={2} />
    </div>
  )
}

export default MobileButton
