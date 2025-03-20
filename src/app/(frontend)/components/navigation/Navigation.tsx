import Link from 'next/link'
import Image from 'next/image'
import MobileButton from './MobileButton'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={`${styles.navigation} container`}>
      <div className={styles.navigationTitle}>
        <Link href="/">
          <Image src={`/images/mbulic.svg`} alt="Mario Bulic" width={70} height={70} priority />
        </Link>
      </div>
      <DesktopNavigation />
      <MobileNavigation />
      <MobileButton />
    </nav>
  )
}

export default Navigation
