import Image from 'next/image'
import Link from 'next/link'
import content from '@/data/content.json'

const highlights = [
  {
    icon: '🏖️',
    title: 'Beach & Reef',
    description: 'Swim in crystal-clear Caribbean waters above one of the healthiest coral reefs on the coast.',
    link: '/explore',
  },
  {
    icon: '🌿',
    title: 'Jungle & Wildlife',
    description: "The Gandoca-Manzanillo Wildlife Refuge begins at the edge of the village. Sloths, toucans, and sea turtles await.",
    link: '/explore',
  },
  {
    icon: '🥁',
    title: 'Culture & Community',
    description: "Afro-Caribbean heritage, Bribri indigenous traditions, and the warmest people you'll ever meet.",
    link: '/history',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={content.home.heroImage}
          alt="Tropical beach in Manzanillo, Costa Rica"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-jungle/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-sand/80 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Manzanillo · Costa Rica
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
              Explore Rooms
            </Link>
            <Link
              href="/explore"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sand font-semibold px-8 py-4 rounded-full transition-all border border-sand/30 text-sm uppercase tracking-wide"
            >
              Discover Manzanillo
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

      {/* Highlights strip */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Why Manzanillo</p>
            <h2 className="font-heading text-4xl md:text-5xl text-jungle">
              A Place Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-sand"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="font-heading text-2xl text-jungle mb-3 group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                <span className="mt-5 inline-block text-teal text-sm font-medium group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-jungle py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl text-sand mb-4">
              Begin Your Journey
            </h2>
            <p className="text-sand/70 max-w-xl mx-auto">
              Everything you need to plan your stay in one of Costa Rica&apos;s last truly authentic villages.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/booking', label: 'Book a Room', icon: '🛏️' },
              { href: '/explore', label: 'Activities', icon: '🤿' },
              { href: '/history', label: 'Our History', icon: '📖' },
              { href: '/pricing', label: 'Pricing', icon: '💰' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 text-center transition-all border border-white/10 hover:border-white/20"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <span className="text-sand text-sm font-medium group-hover:text-sand/80">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / coming soon */}
      <section className="bg-teal/10 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-jungle mb-4">
            Be the First to Know
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re putting the finishing touches on something special. 
            Send us an email and we&apos;ll reach out when we&apos;re ready to welcome guests.
          </p>
          <a
            href="mailto:hello@manzanillo.lat?subject=Please notify me when Hotel Manzanillo opens"
            className="inline-block bg-jungle hover:bg-jungle/90 text-sand font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg text-sm uppercase tracking-wide"
          >
            Get Notified
          </a>
        </div>
      </section>
    </div>
  )
}
