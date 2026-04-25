import type { Metadata } from 'next'
import Link from 'next/link'
import activities from '@/data/activities.json'

export const metadata: Metadata = {
  title: 'Explore Manzanillo',
  description:
    "Discover what to do in Manzanillo, Costa Rica — snorkeling the Caribbean reef, kayaking the Gandoca mangroves, Bribri cultural tours, whale watching, and the best local restaurants.",
  alternates: { canonical: 'https://manzanillo.lat/explore' },
  openGraph: {
    title: 'Explore Manzanillo, Costa Rica',
    description:
      'Reef, rainforest, culture, and cuisine — everything you need in Manzanillo, Costa Rica.',
    url: 'https://manzanillo.lat/explore',
  },
}

export default function ExplorePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-teal py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/70 text-sm uppercase tracking-[0.3em] font-medium mb-4">Discover</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight">
            Explore Manzanillo
          </h1>
          <p className="mt-6 text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Reef, rainforest, culture, and cuisine — everything you need is here, 
            and most of it begins at the water&apos;s edge.
          </p>
        </div>
      </section>

      {/* Activities grid */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`rounded-2xl p-8 border transition-all hover:shadow-lg ${
                  activity.highlight
                    ? 'bg-jungle text-sand border-jungle md:col-span-2 lg:col-span-1'
                    : 'bg-white border-sand hover:-translate-y-1'
                }`}
              >
                <div className="text-5xl mb-4">{activity.icon}</div>
                <h3
                  className={`font-heading text-2xl mb-3 ${
                    activity.highlight ? 'text-sand' : 'text-jungle'
                  }`}
                >
                  {activity.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    activity.highlight ? 'text-sand/80' : 'text-gray-600'
                  }`}
                >
                  {activity.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        activity.highlight
                          ? 'bg-white/15 text-sand'
                          : 'bg-teal/10 text-teal'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jungle py-20 px-4 text-center">
        <h2 className="font-heading text-4xl text-sand mb-4">
          Ask Us Anything
        </h2>
        <p className="text-sand/70 max-w-xl mx-auto mb-8">
          The best guides in Manzanillo grew up here. We&apos;ll connect you with local experts 
          for any activity, from dawn kayak launches to cacao ceremonies.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-4 rounded-full transition-all"
        >
          Book Your Stay
        </Link>
      </section>
    </div>
  )
}
