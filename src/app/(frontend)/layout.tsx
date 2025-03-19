import { Montserrat } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import { Mona_Sans } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const monaSans = Mona_Sans({
  subsets: ['latin'],
  variable: '--font-mona-sans',
  display: 'swap',
})

export const metadata = {
  description: 'Seasoned React developer',
  title: 'Mario Bulic',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={`${montserrat.className} ${spaceGrotesk.className} ${monaSans.className}`}
    >
      <body suppressHydrationWarning>
        <PageTransition>
          <Navigation />
          <main className="wrapper">{children}</main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  )
}
