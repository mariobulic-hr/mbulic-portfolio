'use client'

import Icon from '@mdi/react'
import { mdiArrowDownDropCircleOutline } from '@mdi/js'
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
      <Icon path={mdiArrowDownDropCircleOutline} size={1} />
    </div>
  )
}

export default ScrollArrow
