const sections = [
  {
    id: 'edge-of-world',
    title: 'A Village at the Edge of the World',
    content: `Manzanillo sits at the southernmost tip of Costa Rica's Caribbean coast, in the Limón province, just kilometers from the border with Panama. It is reached by a single road that winds through banana plantations and small Afro-Caribbean communities before ending, definitively, at the sea. There are no roads beyond.

This geographic isolation has been, paradoxically, the village's greatest protector. While much of Costa Rica's Caribbean coast has seen rapid development and tourism pressure, Manzanillo has remained small, quiet, and stubbornly itself.`,
  },
  {
    id: 'afro-caribbean',
    title: 'Afro-Caribbean Roots',
    content: `The people of Manzanillo are predominantly descended from Jamaican and other Caribbean islanders brought to Costa Rica in the late 19th century to build the Atlantic Railroad, the great project of entrepreneur Minor Keith, who would go on to found the United Fruit Company. These workers settled along the coast, establishing communities, planting crops, raising families.

They brought with them the music, the food, the faith, and the language of the Caribbean — English Creole mixed with Spanish, reggae rhythms, rice and beans cooked in coconut milk. Their descendants remain. You hear the Creole in the streets, taste it in the food, feel it in the rhythm of daily life. This is not a reconstructed heritage for tourists — it is living culture.`,
  },
  {
    id: 'bribri',
    title: 'The Bribri People',
    content: `Long before the railroad workers arrived, this corner of Costa Rica was home to the Bribri, one of the largest indigenous groups in Costa Rica. The Bribri have inhabited the Talamanca region — the mountain and coastal lands between Costa Rica and Panama — for thousands of years.

Their cosmology, language, and agricultural traditions, particularly their mastery of cacao cultivation, represent one of the richest indigenous cultures in Central America. The Bribri Talamanca Territory remains one of the most significant indigenous territories in Costa Rica, and many Bribri communities still practice traditional farming, ceremony, and governance.`,
  },
  {
    id: 'wildlife-refuge',
    title: 'The Wildlife Refuge',
    content: `In 1985, the Gandoca-Manzanillo National Wildlife Refuge was established, protecting 9,449 hectares of terrestrial and marine ecosystems. Within its boundaries are some of the most biodiverse environments in Central America: coral reef systems that rival those of the Caribbean's best dive sites, seagrass beds that serve as feeding grounds for endangered green sea turtles, mangrove estuaries, tropical rainforest, and the Laguna Gandoca.

The Laguna Gandoca is one of the only natural spawning sites for the tarpon in all of Costa Rica. The refuge also protects critical nesting habitat for four species of sea turtles, including the enormous leatherback, which comes ashore at Playa Gandoca between March and July.

The establishment of the refuge was a turning point — it set a legal boundary around the village, limiting development and ensuring that Manzanillo would remain embedded in wilderness.`,
  },
  {
    id: 'cacao',
    title: 'Cacao & Culture',
    content: `Cacao has been cultivated in this region for centuries — first by the Bribri, for whom it holds spiritual as well as culinary significance, and later by the Afro-Caribbean farming communities who integrated it into their agricultural economy. The dark, richly flavored cacao of the Talamanca region is renowned among chocolatiers.

Today, cacao farm tours offer visitors a chance to trace the journey from pod to chocolate, while supporting the farming families who have tended these trees for generations.`,
  },
  {
    id: 'then-and-now',
    title: 'Then and Now',
    content: `Manzanillo today is a village of perhaps a few hundred permanent residents. There is a handful of small restaurants, a few guesthouses, a soccer field, a small church. The road still ends here. The reef is still intact. The turtles still come.

It is, by any measure, one of the last truly authentic corners of Costa Rica — and it is the privilege and responsibility of everyone who visits to help keep it that way.`,
  },
]

const timeline = [
  { year: 'Pre-1850s', event: "Bribri indigenous communities inhabit the Talamanca region for thousands of years" },
  { year: '1870s–1890s', event: "Atlantic Railroad construction brings Jamaican and Caribbean workers to Costa Rica's coast" },
  { year: '1899', event: "United Fruit Company founded by Minor Keith; banana plantations transform the Caribbean coast" },
  { year: '1985', event: 'Gandoca-Manzanillo National Wildlife Refuge established, protecting 9,449 hectares' },
  { year: '2000s', event: 'Manzanillo gradually discovered by eco-tourists and surfers; remains largely unspoiled' },
  { year: '2023', event: 'Hotel Manzanillo renovation begins under new ownership, committed to community-first tourism' },
]

const pullquotes = [
  'The road still ends here. The reef is still intact. The turtles still come.',
  'This is not a reconstructed heritage for tourists — it is living culture.',
  "Geographic isolation has been, paradoxically, the village's greatest protector.",
]

export default function HistoryPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-jungle py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-4">Limón Province, Costa Rica</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-sand leading-tight">
            The History of Manzanillo
          </h1>
          <p className="mt-6 text-sand/70 text-xl max-w-2xl mx-auto leading-relaxed">
            A village shaped by isolation, indigenous heritage, the African diaspora, and the wilderness that surrounds it.
          </p>
        </div>
      </section>

      {/* Article content */}
      <section className="bg-sand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section, i) => (
            <article key={section.id} className="mb-20">
              {i > 0 && <hr className="border-teal/20 mb-20" />}
              <h2 className="font-heading text-3xl md:text-4xl text-jungle mb-8">
                {section.title}
              </h2>
              {section.content.split('\n\n').map((para, j) => {
                const matchingQuote = pullquotes.find(q => para.includes(q.split('.')[0]))
                return (
                  <div key={j}>
                    {matchingQuote && (
                      <blockquote className="my-8 pl-6 border-l-4 border-coral">
                        <p className="font-heading text-xl text-coral italic">
                          &ldquo;{matchingQuote}&rdquo;
                        </p>
                      </blockquote>
                    )}
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">{para}</p>
                  </div>
                )
              })}
            </article>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-jungle py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl text-sand">A Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-teal/30 hidden md:block" />
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <span className="font-heading text-2xl font-bold text-teal">{item.year}</span>
                  <p className="text-sand/80 mt-2 text-sm leading-relaxed">{item.event}</p>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-teal border-4 border-jungle top-1" />
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
