import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { MaintenanceBanner } from '@/components/maintenance/MaintenanceBanner'
import UpcomingEventsBanner from "@/components/banners/UpcomingEventsBanner";
// import { FloatingNav } from '@/components/layout/FloatingNav'
import { AuthProvider } from '@/context/AuthContext'
import { Providers } from './providers'



const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: 'The Glamping Spot',
//   description: 'Luxury outdoor accommodations in beautiful natural settings',
//   icons: {
//     icon: [
//       { url: '/images/TheGlampingSpot_W.png', sizes: 'any' },
//     ],
//   },
// }

export const metadata = {
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body>
        {/* Skip to main content link for accessibility */}
        
         <a href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-emerald-600 focus:text-white"
        >
          Skip to main content
        </a>

        {/* Fixed position wrapper for banner and header */}
        <Providers>
          <MaintenanceBanner />
 
          <Header />
     
          <main className="min-h-screen py-16">
          {children}</main>
        {/* <FloatingNav /> */}
        
        <Footer/>
        </Providers>
      </body>
    </html>
  )
}