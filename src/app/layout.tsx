import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Ferguson Travel Co. | Curated Caribbean & Costa Rica Travel',
  description: 'Expertly guided travel to Costa Rica\'s Caribbean coast and beyond. Real trips, real places, community-rooted experiences.',
  keywords: ['Costa Rica', 'Caribbean travel', 'travel agency', 'Manzanillo', 'guided tours', 'eco-tourism', 'Bribri', 'Talamanca'],
  openGraph: {
    title: 'Ferguson Travel Co.',
    description: 'Real Trips. Real Places. No Shortcuts.',
    url: 'https://manzanillo.lat',
    siteName: 'Ferguson Travel Co.',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        <SessionProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
