'use client'

import { useState } from 'react'
import Image from 'next/image'
import packages from '@/data/packages.json'

type Package = (typeof packages)[number]

type FormState = {
  departureDate: string
  partySize: string
  guestName: string
  guestEmail: string
  notes: string
}

const initialForm: FormState = {
  departureDate: '',
  partySize: '1',
  guestName: '',
  guestEmail: '',
  notes: '',
}

// Minimum date = 14 days from today
function getMinDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().slice(0, 10)
}

export default function BookingPage() {
  const [selected, setSelected] = useState<Package | null>(null)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSelect = (pkg: Package) => {
    setSelected(pkg)
    setForm(initialForm)
    setError('')
    setSuccess(false)
    // Scroll to form after a short delay
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selected.id,
          departureDate: form.departureDate,
          partySize: Number(form.partySize),
          guestName: form.guestName,
          guestEmail: form.guestEmail,
          notes: form.notes || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSuccess(true)
      // Redirect to Stripe payment link
      window.location.href = data.stripeUrl
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const totalPrice =
    selected && form.partySize
      ? selected.pricePerPerson * Number(form.partySize)
      : null

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-jungle py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-4">Reserve Your Trip</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand leading-tight">
            Book a Package
          </h1>
          <p className="mt-6 text-sand/70 text-xl max-w-2xl mx-auto">
            Select a package, choose your departure, and secure your spot. 
            Payment is handled securely via Stripe.
          </p>
        </div>
      </section>

      {/* Package cards */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Step 1</p>
            <h2 className="font-heading text-4xl text-jungle">Choose Your Package</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all group border-2 ${
                  selected?.id === pkg.id
                    ? 'border-teal shadow-xl scale-[1.01]'
                    : 'border-transparent hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {selected?.id === pkg.id && (
                    <div className="absolute top-4 right-4 bg-teal text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Selected
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <p className="text-teal text-xs uppercase tracking-wider font-medium mb-1">{pkg.tagline}</p>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-2xl text-jungle">{pkg.name}</h3>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="text-xs text-gray-500">from</div>
                      <div className="font-heading text-2xl text-coral font-bold">
                        ${pkg.pricePerPerson.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{pkg.description}</p>

                  {/* Includes */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Includes</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((item) => (
                        <span key={item} className="text-xs bg-teal/10 text-teal px-3 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <span>🗓 {pkg.duration} nights</span>
                    <span>·</span>
                    <span>👥 Up to {pkg.capacity} guests per departure</span>
                  </div>

                  <button
                    onClick={() => handleSelect(pkg)}
                    className={`w-full font-semibold py-3 rounded-xl transition-colors text-sm ${
                      selected?.id === pkg.id
                        ? 'bg-teal text-white'
                        : 'bg-jungle hover:bg-jungle/90 text-sand'
                    }`}
                  >
                    {selected?.id === pkg.id ? '✓ Selected — fill in your details below' : 'Select This Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form — shown when a package is selected */}
      {selected && (
        <section id="booking-form" className="bg-white py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">Step 2</p>
              <h2 className="font-heading text-4xl text-jungle">Your Details</h2>
              <p className="text-gray-600 mt-2">
                Booking: <strong>{selected.name}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date <span className="text-coral">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.departureDate}
                    min={getMinDate()}
                    onChange={(e) => setForm((f) => ({ ...f, departureDate: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Earliest: {getMinDate()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Party Size <span className="text-coral">*</span>
                  </label>
                  <select
                    value={form.partySize}
                    onChange={(e) => setForm((f) => ({ ...f, partySize: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  >
                    {Array.from({ length: selected.capacity }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Max {selected.capacity} per departure</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  value={form.guestName}
                  onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-coral">*</span>
                </label>
                <input
                  type="email"
                  value={form.guestEmail}
                  onChange={(e) => setForm((f) => ({ ...f, guestEmail: e.target.value }))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  placeholder="jane@example.com"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Used to pre-fill your Stripe payment page</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                  placeholder="Dietary requirements, accessibility needs, special occasions..."
                />
              </div>

              {/* Price summary */}
              {totalPrice !== null && (
                <div className="bg-sand/60 rounded-xl p-5 border border-sand">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      {selected.name} × {form.partySize} {Number(form.partySize) === 1 ? 'person' : 'people'}
                    </span>
                    <span className="font-heading text-xl text-jungle font-bold">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    25% deposit (${Math.round(totalPrice * 0.25).toLocaleString()}) due today via Stripe · Balance due 60 days before departure
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-coral/10 border border-coral/30 rounded-xl px-4 py-3 text-coral text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-teal/10 border border-teal/30 rounded-xl px-4 py-3 text-teal text-sm">
                  Booking confirmed! Redirecting you to payment...
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || success}
                className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 text-sm uppercase tracking-wide"
              >
                {submitting ? 'Checking availability...' : 'Confirm & Pay via Stripe →'}
              </button>

              <p className="text-center text-xs text-gray-400">
                Your spot is held for 24 hours once the booking is submitted. 
                Payment is processed securely via Stripe.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Note */}
      <section className="bg-teal/10 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-jungle">Questions before booking?</strong> Every package is something 
            we&apos;ve done ourselves. Email us at{' '}
            <a href="mailto:bookings@fergusontravel.com" className="text-teal underline">
              bookings@fergusontravel.com
            </a>{' '}
            and we&apos;ll answer personally.
          </p>
        </div>
      </section>
    </div>
  )
}

