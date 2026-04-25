import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Package',
  description:
    'Book your Costa Rica Caribbean coast trip online. Select a package, choose your departure date, and secure your spot in minutes — payment via Stripe.',
  alternates: { canonical: 'https://manzanillo.lat/booking' },
  openGraph: {
    title: 'Book a Costa Rica Trip | Ferguson Travel Co.',
    description:
      'Select a package, choose your dates, and reserve your spot. 25% deposit secures your booking.',
    url: 'https://manzanillo.lat/booking',
  },
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
