import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Ferguson Travel Co. — how we collect, use, and protect your information.',
  alternates: { canonical: 'https://manzanillo.lat/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <section className="bg-jungle py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl font-bold text-sand">Privacy Policy</h1>
          <p className="text-sand/60 mt-2 text-sm">Last updated: January 2025</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">What we collect</h2>
              <p>
                When you make a booking or send us an email, we collect your name, email address,
                and trip details. We use this information to process your booking and communicate
                with you about your trip. We do not sell your information to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Payments</h2>
              <p>
                All payments are processed by Stripe. We do not store your payment card details.
                Stripe&apos;s privacy policy governs how they handle your payment information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Cookies</h2>
              <p>
                This site uses minimal session cookies for authentication purposes only (admin
                access). We do not use tracking cookies or third-party analytics at this time.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Your data rights</h2>
              <p>
                You may request a copy of your personal data, or ask us to delete it, at any time
                by emailing{' '}
                <a href="mailto:hello@fergusontravel.com" className="text-teal underline">
                  hello@fergusontravel.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-jungle mb-3">Contact</h2>
              <p>
                Questions about this policy? Email us at{' '}
                <a href="mailto:hello@fergusontravel.com" className="text-teal underline">
                  hello@fergusontravel.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
