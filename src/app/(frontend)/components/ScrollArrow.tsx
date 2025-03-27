'use client'

import { CaretCircleDown } from '@phosphor-icons/react'
import strings from '@/app/lib/strings'
import styles from './ScrollArrow.module.css'

const ScrollArrow = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className={styles.scrollArrow} onClick={handleScroll}>
      <div className={styles.scrollArrowText}>{strings.homepage.scroll}</div>
      <CaretCircleDown size={32} />
    </div>
  )
}

export default ScrollArrow
