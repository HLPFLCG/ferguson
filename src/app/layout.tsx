import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: "Hotel Manzanillo | Boutique Retreat on Costa Rica's Caribbean Coast",
  description: 'A boutique retreat in Manzanillo, Costa Rica — where the rainforest meets the sea. Currently being lovingly restored for your arrival.',
  keywords: ['Manzanillo', 'Costa Rica', 'boutique hotel', 'Caribbean', 'eco-tourism', 'Gandoca-Manzanillo'],
  openGraph: {
    title: 'Hotel Manzanillo',
    description: 'Where the Rainforest Meets the Sea',
    url: 'https://manzanillo.lat',
    siteName: 'Hotel Manzanillo',
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
