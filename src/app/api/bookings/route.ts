export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import packages from '@/data/packages.json'

export type Booking = {
  id: string
  packageId: string
  packageName: string
  departureDate: string
  guestName: string
  guestEmail: string
  partySize: number
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

export async function POST(req: NextRequest) {
  const kv = getKV()
  if (!kv) {
    return NextResponse.json(
      { error: 'Booking storage is not available. Please contact us directly to reserve.' },
      { status: 503 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { packageId, departureDate, partySize, guestName, guestEmail, notes } = body

  if (!packageId || !departureDate || !partySize || !guestName || !guestEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const pkg = packages.find((p) => p.id === packageId)
  if (!pkg) {
    return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
  }

  // Validate departure date (at least 14 days from now)
  const departure = new Date(departureDate as string)
  if (isNaN(departure.getTime())) {
    return NextResponse.json({ error: 'Invalid departure date' }, { status: 400 })
  }
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 14)
  if (departure < minDate) {
    return NextResponse.json(
      { error: 'Departure date must be at least 14 days from today' },
      { status: 400 }
    )
  }

  const size = Number(partySize)
  if (!Number.isInteger(size) || size < 1 || size > pkg.capacity) {
    return NextResponse.json(
      { error: `Party size must be between 1 and ${pkg.capacity}` },
      { status: 400 }
    )
  }

  // Email format check
  const emailStr = String(guestEmail)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  // Check availability: count non-cancelled bookings for this package + date
  const dateStr = (departureDate as string).slice(0, 10)
  const availKey = `avail:${packageId}:${dateStr}`
  const currentCount = parseInt((await kv.get(availKey)) ?? '0', 10)

  if (currentCount + size > pkg.capacity) {
    const remaining = pkg.capacity - currentCount
    const msg =
      remaining <= 0
        ? 'Sorry, this departure date is fully booked.'
        : `Only ${remaining} spot${remaining === 1 ? '' : 's'} remaining for this departure.`
    return NextResponse.json({ error: msg }, { status: 409 })
  }

  // Create booking record
  const id = generateId()
  const now = new Date().toISOString()
  const booking: Booking = {
    id,
    packageId,
    packageName: pkg.name,
    departureDate: dateStr,
    guestName: String(guestName),
    guestEmail: emailStr,
    partySize: size,
    totalPrice: pkg.pricePerPerson * size,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    ...(notes ? { notes: String(notes) } : {}),
  }

  await kv.put(`booking:${id}`, JSON.stringify(booking))

  // Update availability count
  await kv.put(availKey, String(currentCount + size))

  // Build Stripe URL — append pre-filled email if the link supports it
  const stripeUrl = `${pkg.stripeLinkUrl}?prefilled_email=${encodeURIComponent(emailStr)}`

  return NextResponse.json({ bookingId: id, stripeUrl })
}
