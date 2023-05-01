import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { FC } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home - Johannes Andersen',
  description: "Johannes Andersen's personal website",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: FC<Props> = ({ children }) => (
  <html className="h-full" lang="en">
    <body className={`${inter.className} h-full`}>
      {children}
      <Analytics />
    </body>
  </html>
)

export default RootLayout
