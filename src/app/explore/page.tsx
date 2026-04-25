import Link from 'next/link'

const activities = [
  {
    id: 'wildlife-refuge',
    icon: '🦜',
    title: 'Gandoca-Manzanillo Wildlife Refuge',
    description: "One of Costa Rica's most biodiverse protected areas, the Gandoca-Manzanillo Wildlife Refuge encompasses over 9,000 hectares of coral reef, mangrove, rainforest, and beach. Trails wind through primary jungle to secluded beaches. Leatherback sea turtles nest on Playa Gandoca from March through July. Wildlife spotting includes sloths, monkeys, toucans, and poison dart frogs.",
    tags: ['Hiking', 'Wildlife', 'Sea Turtles'],
    highlight: false,
  },
  {
    id: 'snorkeling',
    icon: '🤿',
    title: 'Snorkeling & Scuba Diving',
    description: "The coral reef system just offshore is one of the healthiest on Costa Rica's Caribbean coast. Snorkel directly from the beach or join a guided dive. Visibility is best from September through November. Expect to see parrotfish, angelfish, moray eels, sea turtles, and vibrant coral formations.",
    tags: ['Snorkeling', 'Scuba', 'Marine Life'],
    highlight: false,
  },
  {
    id: 'kayaking',
    icon: '🛶',
    title: 'Kayaking Through Mangroves',
    description: "Paddle through the ethereal mangrove channels of the Gandoca lagoon at dawn or dusk. The mangroves are critical habitat for birds — you'll spot herons, kingfishers, roseate spoonbills, and, if you're lucky, a caiman watching from the bank.",
    tags: ['Kayaking', 'Birdwatching', 'Dawn & Dusk'],
    highlight: false,
  },
  {
    id: 'dolphins',
    icon: '🐬',
    title: 'Dolphin & Whale Watching',
    description: 'Bottlenose and spinner dolphins are year-round residents of the waters around Manzanillo. Humpback whales migrate through from October to February (from the Northern Hemisphere) and again from July to October (from the Southern Hemisphere). Boat tours depart from the small dock near the village.',
    tags: ['Boat Tour', 'Dolphins', 'Whales'],
    highlight: false,
  },
  {
    id: 'colores',
    icon: '🍽️',
    title: 'Restaurante Colores',
    description: 'The most beloved restaurant in Manzanillo, Colores sits right on the beach with the kind of view that makes it impossible to leave after lunch. The menu is fresh Caribbean seafood — whole fried snapper, lobster rice, garlic shrimp — alongside traditional rice and beans cooked in coconut milk, fried plantains, and the best patacones on the coast. Open daily 11am–9pm. Come hungry, leave slowly.',
    tags: ['Dining', 'Seafood', 'Caribbean', 'Open Daily 11am–9pm'],
    highlight: true,
  },
  {
    id: 'beach',
    icon: '🏖️',
    title: 'Playa Manzanillo',
    description: 'The village beach is a long, curved stretch of golden sand backed by coconut palms and the edge of the jungle. The water is calm inside the reef, making it ideal for swimming. At low tide, you can walk the beach for kilometers toward the refuge entrance.',
    tags: ['Swimming', 'Beach', 'Walking'],
    highlight: false,
  },
  {
    id: 'bribri-tours',
    icon: '🌿',
    title: 'Bribri Cultural Tours',
    description: 'Venture into the mountains above Manzanillo to visit Bribri communities and learn about their history, language, and relationship with the land. Cacao ceremonies, traditional medicine walks, and cultural exchange with community leaders. All tours are community-led and community-benefiting.',
    tags: ['Cultural', 'Indigenous', 'Community-Led'],
    highlight: false,
  },
  {
    id: 'cacao',
    icon: '🍫',
    title: 'Cacao Farm Visits',
    description: 'The cacao farms of the Talamanca region are living museums of indigenous agricultural tradition. Walk the rows of cacao trees, open a pod and taste the raw pulp, watch the fermentation and drying process, and take home a bar of single-origin chocolate made by the farming family themselves.',
    tags: ['Farm Tour', 'Chocolate', 'Cultural'],
    highlight: false,
  },
  {
    id: 'guides',
    icon: '🧭',
    title: 'Local Guides',
    description: 'The best guides in Manzanillo are the people who grew up here. Ask at the hotel — we maintain relationships with trusted local guides for all activities, from night hikes to fishing trips to cultural tours.',
    tags: ['Guided Tours', 'Local', 'All Activities'],
    highlight: false,
  },
]

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
