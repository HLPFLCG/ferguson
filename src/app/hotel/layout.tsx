import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Hotel Manzanillo',
  description:
    'Hotel Manzanillo — 12 rooms steps from the Caribbean Sea. Currently renovating. Book your stay and be among our first guests on the coast.',
  alternates: { canonical: 'https://manzanillo.lat/hotel' },
  openGraph: {
    title: 'Hotel Manzanillo | Caribbean Coast Costa Rica',
    description:
      '12 rooms on the southern Caribbean coast of Costa Rica. Steps from the beach, surrounded by the Gandoca-Manzanillo Wildlife Refuge.',
    url: 'https://manzanillo.lat/hotel',
  },
}

const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Hotel Manzanillo',
  description:
    'Boutique hotel on the Caribbean coast of Costa Rica, steps from the beach and adjacent to the Gandoca-Manzanillo Wildlife Refuge.',
  url: 'https://manzanillo.lat/hotel',
  email: 'hotel@fergusontravel.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manzanillo',
    addressRegion: 'Limón',
    addressCountry: 'CR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.6357,
    longitude: -82.6603,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Beach access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Breakfast included', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Jungle surroundings', value: true },
  ],
  numberOfRooms: 12,
}

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={lodgingSchema} />
      {children}
    </>
  )
}
