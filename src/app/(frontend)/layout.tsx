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

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://mariobulic.com'

export const metadata: Metadata = {
  title: {
    default: 'Mario Bulic - Software Developer',
    template: '%s | Mario Bulic',
  },
  description:
    'Experienced software developer specializing in React, Next.js, and full-stack web development. Building modern, performant web applications.',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Mario Bulic - Software Developer',
    description:
      'Experienced software developer specializing in React, Next.js, and full-stack web development.',
    url: baseUrl,
    siteName: 'Mario Bulic',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mario Bulic - Software Developer',
    description:
      'Experienced software developer specializing in React, Next.js, and full-stack web development.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monaSans.variable}>
      <body suppressHydrationWarning>
        <PostHogProvider>
          <MobileMenuProvider>
            <Navigation />
            <main className="wrapper">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </MobileMenuProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
