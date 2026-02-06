import Link from 'next/link'
import MobileButton from './MobileButton'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={`${styles.navigation} container`}>
      <div className={styles.navigationTitle}>
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mbulic.svg" alt="Mario Bulic" width={70} height={70} />
        </Link>
      </div>
      <DesktopNavigation />
      <MobileNavigation />
      <MobileButton />
    </nav>
  )
}

export default Navigation
