import Image from 'next/image'
import content from '@/data/content.json'

const values = [
  {
    title: 'Community First',
    description: 'We hire local guides, stay in locally owned accommodation, and contribute directly to the communities that host our tours.',
    icon: '🤝',
  },
  {
    title: 'No Shortcuts',
    description: 'Every experience we sell is one we\'ve personally done. If it isn\'t worth sending our closest friends on, it isn\'t in our catalogue.',
    icon: '✨',
  },
  {
    title: 'Sustainable by Design',
    description: 'Sustainable travel means the people who live where you\'re visiting are genuinely better off because you came. We build that in from the start.',
    icon: '🌱',
  },
]

export default function AboutPage() {
  const paragraphs = content.about.content.split('\n\n')

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src={content.about.heroImage}
          alt="Costa Rica Caribbean coast"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle via-jungle/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">About Ferguson Travel Co.</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand">
            {content.about.title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">What We Stand For</p>
            <h2 className="font-heading text-4xl text-jungle">Our Commitments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8 rounded-2xl bg-sand/50 border border-sand">
                <div className="text-5xl mb-5">{value.icon}</div>
                <h3 className="font-heading text-2xl text-jungle mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl text-white mb-6">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Browse our packages or reach out directly. Every trip starts with a conversation — 
            and we answer every email personally.
          </p>
          <a
            href="mailto:hello@fergusontravel.com"
            className="inline-block bg-white text-teal font-semibold px-8 py-4 rounded-full hover:bg-sand transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}


  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src={content.about.heroImage}
          alt="Hotel Manzanillo garden and surroundings"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle via-jungle/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">About the Hotel</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand">
            {content.about.title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">What We Stand For</p>
            <h2 className="font-heading text-4xl text-jungle">Our Commitments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8 rounded-2xl bg-sand/50 border border-sand">
                <div className="text-5xl mb-5">{value.icon}</div>
                <h3 className="font-heading text-2xl text-jungle mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently renovating */}
      <section className="bg-teal py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl text-white mb-6">
            Currently Undergoing a Beautiful Transformation
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            We are in the midst of a careful, unhurried restoration. Original woodwork is being sanded 
            and refinished. Local artisans are tiling bathrooms by hand. The garden is being coaxed 
            back into something lush and welcoming. We are not rushing. We are doing this right.
          </p>
          <a
            href="mailto:hello@manzanillo.lat"
            className="inline-block bg-white text-teal font-semibold px-8 py-4 rounded-full hover:bg-sand transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
