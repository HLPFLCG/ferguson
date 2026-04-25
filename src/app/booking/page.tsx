'use client'

import { useState } from 'react'
import Image from 'next/image'
import rooms from '@/data/rooms.json'
import Toast from '@/components/Toast'

export default function BookingPage() {
  const [showToast, setShowToast] = useState(false)

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowToast(true)
  }

  return (
    <div className="pt-16">
      {showToast && (
        <Toast
          message="Online booking coming soon — please email reservations@manzanillo.lat to reserve!"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Hero */}
      <section className="bg-jungle py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-4">Reserve Your Stay</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand leading-tight">
            Book Direct &amp; Save
          </h1>
          <p className="mt-6 text-sand/70 text-xl max-w-2xl mx-auto">
            No booking fees, no middlemen. Reserve directly with us by email and get 
            our best rate — plus a personal welcome from the team.
          </p>
          <a
            href="mailto:reservations@manzanillo.lat"
            className="mt-8 inline-block bg-coral hover:bg-coral/90 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm uppercase tracking-wide"
          >
            reservations@manzanillo.lat
          </a>
        </div>
      </section>

      {/* Room cards */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Accommodations</p>
            <h2 className="font-heading text-4xl text-jungle">Our Rooms</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-2xl text-jungle">{room.name}</h3>
                      {'perBed' in room && room.perBed && (
                        <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">per bed</span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">from</div>
                      <div className="font-heading text-2xl text-jungle font-bold">${room.localRate}/night</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{room.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.map((feature) => (
                      <span key={feature} className="text-xs bg-sand text-gray-600 px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-sand/50 rounded-xl">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Local Rate</div>
                      <div className="font-heading text-xl text-jungle font-bold">${room.localRate}<span className="text-sm font-normal text-gray-500">/night</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Visitor Rate</div>
                      <div className="font-heading text-xl text-coral font-bold">${room.visitorRate}<span className="text-sm font-normal text-gray-500">/night</span></div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBookNow}
                      className="flex-1 bg-jungle hover:bg-jungle/90 text-sand font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      Book Now
                    </button>
                    <a
                      href={`mailto:reservations@manzanillo.lat?subject=Inquiry: ${room.name}`}
                      className="flex-1 border-2 border-jungle text-jungle hover:bg-jungle/5 font-semibold py-3 rounded-xl transition-colors text-sm text-center"
                    >
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="bg-teal/10 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-jungle">Note on our pricing model:</strong> We maintain two rate tiers — 
            a Local Community Rate for Costa Rican residents and a Visitor Rate for international guests. 
            This is a deliberate, transparent choice. <a href="/pricing" className="text-teal underline">Learn more about our philosophy →</a>
          </p>
        </div>
      </section>
    </div>
  )
}
