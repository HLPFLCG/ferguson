'use client'

import { useState } from 'react'

type FormState = {
  checkIn: string
  checkOut: string
  rooms: string
  guestName: string
  guestEmail: string
  notes: string
}

const initialForm: FormState = {
  checkIn: '',
  checkOut: '',
  rooms: '1',
  guestName: '',
  guestEmail: '',
  notes: '',
}

const PRICE_PER_NIGHT = 99
const TOTAL_ROOMS = 12

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function calcNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.max(0, Math.round(diff / 86400000))
}

export default function HotelPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState<{
    bookingId: string
    totalPrice: number
    nights: number
    demo?: boolean
  } | null>(null)

  const nights = calcNights(form.checkIn, form.checkOut)
  const totalPrice = nights > 0 ? nights * Number(form.rooms) * PRICE_PER_NIGHT : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/hotel-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          rooms: Number(form.rooms),
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

      setConfirmation(data)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-jungle py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-4">
            Currently Renovating
          </p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-sand leading-tight">
            Hotel Manzanillo
          </h1>
          <p className="mt-6 text-sand/70 text-xl max-w-2xl mx-auto">
            {TOTAL_ROOMS} rooms nestled in the Caribbean coast. Book your stay at{' '}
            <strong className="text-sand">${PRICE_PER_NIGHT}/night</strong> and be among
            our first guests once renovation is complete.
          </p>
        </div>
      </section>

      {/* Amenities strip */}
      <section className="bg-teal/10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🏖️', label: 'Steps from the beach' },
              { icon: '🌿', label: 'Jungle surroundings' },
              { icon: '🍳', label: 'Breakfast included' },
              { icon: '🛜', label: 'Free Wi-Fi' },
            ].map((item) => (
              <div key={item.label} className="py-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-jungle text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section className="bg-sand py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {confirmation ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-heading text-3xl text-jungle mb-3">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your reservation has been received. We&apos;ll be in touch with details
                as the renovation wraps up.
              </p>
              <div className="bg-sand/60 rounded-xl p-5 text-left mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Booking ID</span>
                  <span className="font-mono text-jungle">{confirmation.bookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-medium">{form.checkIn}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-medium">{form.checkOut}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Nights</span>
                  <span className="font-medium">{confirmation.nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rooms</span>
                  <span className="font-medium">{form.rooms}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-sand">
                  <span className="text-gray-700">Total</span>
                  <span className="text-jungle">${confirmation.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              {confirmation.demo && (
                <p className="text-xs text-gray-400 mb-4">
                  Demo mode — booking is not persisted.
                </p>
              )}
              <button
                onClick={() => {
                  setConfirmation(null)
                  setForm(initialForm)
                }}
                className="bg-jungle hover:bg-jungle/90 text-sand font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <p className="text-teal text-sm uppercase tracking-[0.3em] font-medium mb-3">
                  Reserve Your Room
                </p>
                <h2 className="font-heading text-4xl text-jungle">Book Your Stay</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  ${PRICE_PER_NIGHT}/night · {TOTAL_ROOMS} rooms total · No double-booking
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in <span className="text-coral">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.checkIn}
                      min={getTodayStr()}
                      onChange={(e) => {
                        const newCheckIn = e.target.value
                        setForm((f) => ({
                          ...f,
                          checkIn: newCheckIn,
                          // Reset check-out if it's no longer after check-in
                          checkOut: f.checkOut <= newCheckIn ? '' : f.checkOut,
                        }))
                      }}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out <span className="text-coral">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.checkOut}
                      min={form.checkIn || getTodayStr()}
                      onChange={(e) => setForm((f) => ({ ...f, checkOut: e.target.value }))}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      required
                    />
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms <span className="text-coral">*</span>
                  </label>
                  <select
                    value={form.rooms}
                    onChange={(e) => setForm((f) => ({ ...f, rooms: e.target.value }))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    required
                  >
                    {Array.from({ length: TOTAL_ROOMS }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'room' : 'rooms'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest info */}
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
                    placeholder="Early check-in, accessibility needs, special occasions..."
                  />
                </div>

                {/* Price summary */}
                {totalPrice !== null && (
                  <div className="bg-sand/60 rounded-xl p-5 border border-sand">
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex justify-between">
                        <span>
                          {form.rooms} {Number(form.rooms) === 1 ? 'room' : 'rooms'} × {nights}{' '}
                          {nights === 1 ? 'night' : 'nights'}
                        </span>
                        <span>${PRICE_PER_NIGHT}/night</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-sand">
                      <span className="font-semibold text-gray-700">Total</span>
                      <span className="font-heading text-2xl text-jungle font-bold">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-coral/10 border border-coral/30 rounded-xl px-4 py-3 text-coral text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 text-sm uppercase tracking-wide"
                >
                  {submitting ? 'Checking availability...' : 'Request Booking →'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Availability is checked in real time. We&apos;ll confirm your booking by email.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Contact note */}
      <section className="bg-teal/10 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-jungle">Questions about the hotel?</strong> Email us at{' '}
            <a href="mailto:hotel@fergusontravel.com" className="text-teal underline">
              hotel@fergusontravel.com
            </a>{' '}
            and we&apos;ll get back to you personally.
          </p>
        </div>
      </section>
    </div>
  )
}
