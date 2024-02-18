import './globals.css'
import type { Metadata } from 'next'
import { Inter, Inria_Serif } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const nightAtTheOpera = localFont({
  src: './assets/NightAtTheOperaNF.otf',
  display: 'swap',
  variable: '--font-opera',
});

const inria = Inria_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-inria',
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
    <html
      lang="en"
      className={`h-full ${nightAtTheOpera.variable} ${inria.variable} ${inter.variable}`}
    >
      <body className={`h-full ${inter.className} font-normal`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
