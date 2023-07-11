import { FC } from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home - Johannes Andersen',
  description: "Johannes Andersen's personal website",
  creator: 'Johannes Andersen',
  keywords: ['Johand', 'Johannes Andersen', 'Portfolio', 'Personal Website'],
  applicationName: 'Johand.dev',
  generator: 'Next.js',
  metadataBase: new URL('https://johand.dev'),
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://johand.dev',
    siteName: 'Johand.dev',
    title: 'Home - Johannes Andersen',
    description: "Johannes Andersen's personal website",
  },
  twitter: {
    title: 'Home - Johannes Andersen',
    card: 'summary_large_image',
    creator: '@johand199',
    site: '@johand199',
    description: "Johannes Andersen's personal website",
  },
}

interface Props {
  children: React.ReactNode
}

const RootLayout: FC<Props> = ({ children }) => (
  <html className="h-full" lang="en">
    <body className={`${inter.className} h-full`}>{children}</body>
  </html>
)

export default RootLayout
