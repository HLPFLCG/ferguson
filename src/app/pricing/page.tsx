import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import content from '@/data/content.json'
import packages from '@/data/packages.json'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Travel Packages & Pricing',
  description:
    'All-inclusive Costa Rica Caribbean coast travel packages — from $750/person. 4 to 7 night trips including guides, accommodation, cultural experiences, and airport transfers.',
  alternates: { canonical: 'https://manzanillo.lat/pricing' },
  openGraph: {
    title: 'Costa Rica Caribbean Travel Packages',
    description:
      'Curated packages from $750/person. Guides, accommodation, and experiences all included — no hidden fees.',
    url: 'https://manzanillo.lat/pricing',
  },
}

const faqs = [
  {
    q: 'What is included in the price?',
    a: 'Each package listing shows exactly what is included. In general: accommodation, specified meals, guided experiences, and in-country transportation. International flights are not included.',
  },
  {
    q: 'How does payment work?',
    a: 'A 25% deposit secures your spot at booking via Stripe. The remaining balance is due 60 days before your departure date. All payments are processed securely through Stripe.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellations more than 60 days before departure receive a full refund minus the deposit. Cancellations within 60 days are non-refundable but we can transfer your booking to another departure date.',
  },
  {
    q: 'Can I customise a package?',
    a: 'Yes. Email us at bookings@fergusontravel.com and we can discuss custom itineraries, extensions, or modifications to any standard package.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function PricingPage() {
  const paragraphs = content.pricing.content.split('\n\n')

  return (
    <div className="pt-16">
      <JsonLd schema={faqSchema} />
      {/* Hero */}
      <section className="bg-jungle py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-4">Transparent Pricing</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand leading-tight">
            {content.pricing.title}
          </h1>
        </div>
      </section>

      {/* Philosophy text */}
      <section className="bg-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Package cards */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl text-jungle mb-4">All Packages</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              All prices are per person. Packages include accommodation, experiences, and logistics as listed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-sand/50 rounded-2xl overflow-hidden border border-sand hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <p className="text-teal text-xs uppercase tracking-wider font-medium mb-1">{pkg.tagline}</p>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-2xl text-jungle">{pkg.name}</h3>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="font-heading text-3xl text-coral font-bold">
                        ${pkg.pricePerPerson.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{pkg.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {pkg.includes.map((item) => (
                      <span key={item} className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-5">
                    <span>🗓 {pkg.duration} nights</span>
                    <span>·</span>
                    <span>👥 Max {pkg.capacity} guests</span>
                  </div>
                  <Link
                    href="/booking"
                    className="inline-block bg-jungle hover:bg-jungle/90 text-sand font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                  >
                    Book This Package →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-teal/10 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-jungle mb-10 text-center">Common Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-heading text-lg text-jungle mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jungle py-20 px-4 text-center">
        <h2 className="font-heading text-4xl text-sand mb-4">Ready to Book?</h2>
        <p className="text-sand/70 mb-8">Select a package and reserve your spot in minutes.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            Book a Package
          </Link>
          <a
            href="mailto:bookings@fergusontravel.com"
            className="bg-white/10 hover:bg-white/20 text-sand font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  )
}
