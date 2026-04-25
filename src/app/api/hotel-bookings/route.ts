export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

const HOTEL_ROOMS = 12
const PRICE_PER_NIGHT = 99

export type HotelBooking = {
  id: string
  checkIn: string
  checkOut: string
  nights: number
  rooms: number
  guestName: string
  guestEmail: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  updatedAt: string
  notes?: string
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function getKV(): KVNamespace | null {
  try {
    const { env } = getRequestContext()
    const kv = (env as CloudflareEnv).BOOKINGS_KV
    return kv ?? null
  } catch {
    return null
  }
}

/** Returns an array of date strings (YYYY-MM-DD) for each night being occupied
 *  (check-in night through the night before check-out). */
function getNights(checkIn: string, checkOut: string): string[] {
  const nights: string[] = []
  const current = new Date(checkIn + 'T00:00:00Z')
  const end = new Date(checkOut + 'T00:00:00Z')
  while (current < end) {
    nights.push(current.toISOString().slice(0, 10))
    current.setUTCDate(current.getUTCDate() + 1)
  }
  return nights
}

export async function POST(req: NextRequest) {
  const kv = getKV()

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { checkIn, checkOut, rooms, guestName, guestEmail, notes } = body

  if (!checkIn || !checkOut || !rooms || !guestName || !guestEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validate dates
  const checkInDate = new Date((checkIn as string) + 'T00:00:00Z')
  const checkOutDate = new Date((checkOut as string) + 'T00:00:00Z')

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return NextResponse.json({ error: 'Invalid dates' }, { status: 400 })
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  if (checkInDate < today) {
    return NextResponse.json({ error: 'Check-in date cannot be in the past' }, { status: 400 })
  }

  if (checkOutDate <= checkInDate) {
    return NextResponse.json({ error: 'Check-out must be after check-in' }, { status: 400 })
  }

  const nights = getNights(checkIn as string, checkOut as string)
  if (nights.length > 30) {
    return NextResponse.json({ error: 'Maximum stay is 30 nights' }, { status: 400 })
  }

  const roomCount = Number(rooms)
  if (!Number.isInteger(roomCount) || roomCount < 1 || roomCount > HOTEL_ROOMS) {
    return NextResponse.json(
      { error: `Rooms must be between 1 and ${HOTEL_ROOMS}` },
      { status: 400 }
    )
  }

  // Email format check
  const emailStr = String(guestEmail)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const totalPrice = roomCount * nights.length * PRICE_PER_NIGHT

  // Demo mode — KV not configured
  if (!kv) {
    const id = generateId()
    return NextResponse.json({
      bookingId: id,
      totalPrice,
      nights: nights.length,
      demo: true,
    })
  }

  // Check availability for every night in the requested range
  const nightCounts = await Promise.all(
    nights.map(async (night) => {
      const val = await kv.get(`hotel:avail:${night}`)
      return { night, count: parseInt(val ?? '0', 10) }
    })
  )

  const constrained = nightCounts.find((n) => n.count + roomCount > HOTEL_ROOMS)
  if (constrained) {
    const remaining = HOTEL_ROOMS - constrained.count
    const msg =
      remaining <= 0
        ? `Sorry, no rooms are available on ${constrained.night}.`
        : `Only ${remaining} room${remaining === 1 ? '' : 's'} available on ${constrained.night}.`
    return NextResponse.json({ error: msg }, { status: 409 })
  }

  // Create booking record
  const id = generateId()
  const now = new Date().toISOString()
  const booking: HotelBooking = {
    id,
    checkIn: (checkIn as string).slice(0, 10),
    checkOut: (checkOut as string).slice(0, 10),
    nights: nights.length,
    rooms: roomCount,
    guestName: String(guestName),
    guestEmail: emailStr,
    totalPrice,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    ...(notes ? { notes: String(notes) } : {}),
  }

  await kv.put(`hotel-booking:${id}`, JSON.stringify(booking))

  // Update availability counter for each night.
  // Note: Cloudflare KV does not support atomic transactions. A small window
  // exists where two concurrent requests could both pass the pre-check above.
  // As a best-effort mitigation we re-read the counters after writing and roll
  // back if an overcommit is detected.
  await Promise.all(
    nightCounts.map(({ night, count }) =>
      kv.put(`hotel:avail:${night}`, String(count + roomCount))
    )
  )

  // Post-write overcommit check
  const finalCounts = await Promise.all(
    nights.map(async (night) => {
      const val = await kv.get(`hotel:avail:${night}`)
      return { night, count: parseInt(val ?? '0', 10) }
    })
  )

  const overcommit = finalCounts.find((n) => n.count > HOTEL_ROOMS)
  if (overcommit) {
    // Roll back: remove the booking and restore the counters
    await kv.delete(`hotel-booking:${id}`)
    await Promise.all(
      nightCounts.map(({ night, count }) =>
        kv.put(`hotel:avail:${night}`, String(count))
      )
    )
    return NextResponse.json(
      { error: 'Sorry, those dates just became unavailable. Please try again.' },
      { status: 409 }
    )
  }

  return NextResponse.json({ bookingId: id, totalPrice, nights: nights.length })
}
