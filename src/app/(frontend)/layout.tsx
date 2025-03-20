import Navigation from './components/navigation/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { Mona_Sans } from 'next/font/google'
import { PostHogProvider } from '@/app/lib/providers'
import './styles.css'
import { MobileMenuProvider } from './context/Context'

const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  description: 'Seasoned React developer',
  title: 'Mario Bulic',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={monaSans.className}>
      <body suppressHydrationWarning>
        <PostHogProvider>
          <MobileMenuProvider>
            <PageTransition>
              <Navigation />
              <main className="wrapper">{children}</main>
              <Footer />
            </PageTransition>
          </MobileMenuProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
