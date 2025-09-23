import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

import './globals.css'
import Footer from './jobs/Footer'
export const metadata: Metadata = {
  title: 'JobMatch - Your Next Career Starts Here',
  description: 'Your Next Job Starts Here',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className={` antialiased`}>
        {/* Sticky Footer */}
        <div className="min-h-dvh grid grid-rows-[1fr_auto]">
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster richColors theme="light" />
      </body>
    </html>
  )
}
