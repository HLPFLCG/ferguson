import Image from 'next/image'
import Link from 'next/link'
import content from '@/data/content.json'
import packages from '@/data/packages.json'
import aboutData from '@/data/about.json'

const { testimonials } = aboutData

const highlights = [
  {
    icon: '🏖️',
    title: 'Caribbean Coast',
    description:
      "Costa Rica's southern Caribbean — pristine reef, jungle-backed beaches, and a community that has protected this corner of the coast for generations.",
    link: '/explore',
  },
  {
    icon: '🌿',
    title: 'Deep Nature',
    description:
      'The Gandoca-Manzanillo Wildlife Refuge borders our primary destination. Sloths, toucans, sea turtles, and some of the healthiest coral reefs in the Americas.',
    link: '/explore',
  },
  {
    icon: '🥁',
    title: 'Living Culture',
    description:
      "Afro-Caribbean heritage, Bribri indigenous traditions, and communities that have called this coast home for generations. This isn't performance — it's real life.",
    link: '/history',
  },
]

const howItWorks = [
  { step: '01', label: 'Browse Packages', icon: '🗺️', href: '/pricing' },
  { step: '02', label: 'Select & Book', icon: '📅', href: '/booking' },
  { step: '03', label: 'Pay via Stripe', icon: '💳', href: '/booking' },
  { step: '04', label: 'Pack & Arrive', icon: '✈️', href: '/about' },
]

export default function HomePage() {
  const featuredPackages = packages.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={content.home.heroImage}
          alt="Costa Rica Caribbean Coast"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-jungle/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-sand/80 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Ferguson Travel Co. · Caribbean Coast Specialists
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-sand leading-tight mb-6">
            {content.home.tagline}
          </h1>
          <p className="text-sand/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {content.home.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              View Packages
            </Link>
            <Link
              href="/explore"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sand font-semibold px-8 py-4 rounded-full transition-all border border-sand/30 text-sm uppercase tracking-wide"
            >
              Discover the Coast
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-sand/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-sand/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Curated Trips</p>
            <h2 className="font-heading text-4xl md:text-5xl text-jungle">
              Featured Packages
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-sand"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-teal text-xs uppercase tracking-wider font-medium mb-1">{pkg.tagline}</p>
                  <h3 className="font-heading text-xl text-jungle mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">from</span>
                      <span className="font-heading text-2xl text-coral font-bold ml-1">${pkg.pricePerPerson}</span>
                      <span className="text-xs text-gray-500">/person</span>
                    </div>
                    <Link
                      href="/booking"
                      className="bg-jungle hover:bg-jungle/90 text-sand text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="inline-block border-2 border-jungle text-jungle hover:bg-jungle hover:text-sand font-semibold px-8 py-3 rounded-full transition-all text-sm"
            >
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-jungle py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl text-sand mb-4">
              Why Travel With Us
            </h2>
            <p className="text-sand/70 max-w-xl mx-auto">
              We know this coast the way you know your own neighborhood.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group bg-white/10 hover:bg-white/20 rounded-2xl p-8 transition-all border border-white/10 hover:border-white/20"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-heading text-2xl text-sand mb-3 group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-sand/70 leading-relaxed text-sm">{item.description}</p>
                <span className="mt-5 inline-block text-teal text-sm font-medium group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Simple Process</p>
            <h2 className="font-heading text-4xl text-jungle">How It Works</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="group text-center p-6 rounded-2xl bg-sand/50 hover:bg-sand border border-sand hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-teal text-xs font-bold uppercase tracking-widest mb-2">{item.step}</div>
                <span className="text-jungle text-sm font-medium group-hover:text-teal transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal/10 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-jungle mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-600 mb-8">
            Every trip we sell is one we&apos;ve done ourselves. Email us and we&apos;ll
            help you find the right package for your travel style.
          </p>
          <a
            href="mailto:hello@fergusontravel.com?subject=Trip inquiry"
            className="inline-block bg-jungle hover:bg-jungle/90 text-sand font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg text-sm uppercase tracking-wide"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Traveler Stories</p>
            <h2 className="font-heading text-4xl text-jungle">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm border border-sand/60">
                <div className="flex mb-4" aria-label="5 stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-coral text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed text-sm mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-jungle text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location} · {t.trip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-jungle py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100%', label: 'Locally guided' },
              { value: '$0', label: 'Hidden fees' },
              { value: '4+', label: 'Countries covered' },
              { value: '100%', label: 'Satisfaction rate' },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-heading text-3xl font-bold text-coral mb-1">{item.value}</div>
                <div className="text-sand/70 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

