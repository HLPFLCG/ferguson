import type { Metadata } from 'next'
import historyData from '@/data/history.json'

export const metadata: Metadata = {
  title: 'History of Manzanillo',
  description:
    "The history of Manzanillo, Costa Rica — a village shaped by Bribri indigenous heritage, the Afro-Caribbean diaspora, the Atlantic Railroad, and the wildlife refuge that protected it all.",
  alternates: { canonical: 'https://manzanillo.lat/history' },
  openGraph: {
    title: 'The History of Manzanillo, Costa Rica',
    description:
      'A village shaped by isolation, indigenous heritage, the African diaspora, and the wilderness that surrounds it.',
    url: 'https://manzanillo.lat/history',
  },
}

const { sections, timeline, pullquotes } = historyData

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
