import React from 'react'
import { Montserrat } from 'next/font/google'
import Navigation from './components/Navigation'
import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  description: 'Seasoned React developer',
  title: 'Mario Bulic',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={montserrat.className}>
      <body suppressHydrationWarning>
        <Navigation />
        <main className="wrapper">{children}</main>
      </body>
    </html>
  )
}
