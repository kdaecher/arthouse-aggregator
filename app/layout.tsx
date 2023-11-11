import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })

const NightAtTheOpera = localFont({
  src: './assets/NightAtTheOperaNF.otf',
  display: 'swap',
  variable: '--font-opera',
});

export const metadata: Metadata = {
  title: 'Arthouse Aggregator',
  description: 'Karson Daecher 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${NightAtTheOpera.variable}`}>
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  )
}
