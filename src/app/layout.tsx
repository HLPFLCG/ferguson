import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'
import JsonLd from '@/components/JsonLd'

const SITE_URL = 'https://manzanillo.lat'
const SITE_NAME = 'Ferguson Travel Co.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Curated Caribbean & Costa Rica Travel`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Expertly guided travel to Costa Rica's Caribbean coast. Real trips, real places, community-rooted experiences from the specialists in Manzanillo.",
  keywords: [
    'Costa Rica travel',
    'Caribbean coast Costa Rica',
    'Manzanillo Costa Rica',
    'guided tours Costa Rica',
    'eco-tourism',
    'Bribri cultural tours',
    'Talamanca',
    'travel agency',
    'all-inclusive packages',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: 'Real Trips. Real Places. No Shortcuts.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ferguson Travel Co. — Caribbean Coast Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Real Trips. Real Places. No Shortcuts.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Curated travel to Costa Rica's Caribbean coast — expertly guided, community-rooted experiences in Manzanillo and Talamanca.",
  email: 'hello@fergusontravel.com',
  areaServed: [
    { '@type': 'Place', name: 'Manzanillo, Costa Rica' },
    { '@type': 'Place', name: 'Talamanca, Costa Rica' },
    { '@type': 'Place', name: "Costa Rica's Caribbean Coast" },
    { '@type': 'Place', name: 'Bocas del Toro, Panama' },
  ],
  knowsAbout: [
    'Eco-tourism',
    'Cultural tourism',
    'Costa Rica Caribbean coast',
    'Bribri indigenous culture',
    'Afro-Caribbean heritage',
    'Wildlife refuges',
  ],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd schema={travelAgencySchema} />
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
