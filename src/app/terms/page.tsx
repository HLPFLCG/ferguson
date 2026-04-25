import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Ferguson Travel Co. — booking conditions, cancellation policy, and traveler responsibilities.',
  alternates: { canonical: 'https://manzanillo.lat/terms' },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="pt-16">
      <section className="bg-jungle py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-bold text-sand">Terms of Service</h1>
          <p className="text-sand/60 mt-2 text-sm">Last updated: January 2025</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Booking & Payment</h2>
              <p>
                A 25% deposit is required to confirm a booking. The remaining balance is due 60 days
                before your departure date. All payments are processed securely via Stripe.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Cancellation Policy</h2>
              <p>
                Cancellations made more than 60 days before departure receive a full refund, minus
                the deposit. Cancellations within 60 days of departure are non-refundable, though we
                will work with you to transfer your booking to another available departure date where
                possible.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Changes to Bookings</h2>
              <p>
                If you need to change your departure date, party size, or package, please contact us
                as early as possible. Changes are subject to availability and may incur additional
                costs. Email{' '}
                <a href="mailto:bookings@fergusontravel.com" className="text-teal underline">
                  bookings@fergusontravel.com
                </a>{' '}
                with any change requests.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Travel Insurance</h2>
              <p>
                We strongly recommend that all travelers purchase comprehensive travel insurance
                covering trip cancellation, medical evacuation, and personal liability before
                departure. This is the traveler&apos;s responsibility.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Our Responsibilities</h2>
              <p>
                We are responsible for the services described in your package — accommodation,
                guides, experiences, and transport as listed. We are not responsible for
                international flights, visa requirements, or personal travel decisions made
                during your trip.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Contact</h2>
              <p>
                Questions? Email{' '}
                <a href="mailto:hello@fergusontravel.com" className="text-teal underline">
                  hello@fergusontravel.com
                </a>{' '}
                and we&apos;ll respond personally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
