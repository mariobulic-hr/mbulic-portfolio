'use client'

import { CaretCircleDown } from '@phosphor-icons/react'
import strings from '@/app/lib/strings'
import styles from './ScrollArrow.module.css'

const ScrollArrow = () => {
  const handleScroll = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      className={styles.scrollArrow}
      onClick={handleScroll}
      aria-label="Scroll down to projects"
    >
      <span className={styles.scrollArrowText}>{strings.homepage.scroll}</span>
      <CaretCircleDown size={32} />
    </button>
  )
}

export default ScrollArrow
