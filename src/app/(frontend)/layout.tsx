import { PostHogProvider } from '@/app/lib/providers'
import './styles.css'
import { MobileMenuProvider } from './context/Context'
import { Metadata } from 'next'
import { Mona_Sans } from 'next/font/google'
import Navigation from './components/navigation/Navigation'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

const monaSans = Mona_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mona-sans',
})

export const metadata: Metadata = {
  title: 'Mario Bulic',
  description: 'Mario Bulic - Software Developer',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monaSans.variable}>
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
