import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { MaintenanceBanner } from '@/components/maintenance/MaintenanceBanner'
import DevEnvironmentIndicator from '@/components/maintenance/DevEnvironmentIndicator'



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'The Glamping Spot',
  description: 'Luxury outdoor accommodations in beautiful natural settings',
  icons: {
    icon: [
      { url: '/images/TheGlampingSpot_W.png', sizes: 'any' },
    ],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-emerald-600 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Fixed position wrapper for banner and header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
          <MaintenanceBanner expectedCompletion="Summer 2025" />
        </div>

        <Header />

        <div className="flex flex-col min-h-screen">
          {/* Add padding to push content below fixed header */}
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <DevEnvironmentIndicator show={isDevelopment} />
      </body>
    </html>
  )
}