export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { verifyToken, getTokenCookieName } from '@/lib/edge-auth'
import type { HotelBooking } from '../route'

function getKV(): KVNamespace | null {
  try {
    const { env } = getRequestContext()
    const kv = (env as CloudflareEnv).BOOKINGS_KV
    return kv ?? null
  } catch {
    return null
  }
}

/** Returns each occupied night date for a booking. */
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

const VALID_STATUSES = ['pending', 'confirmed', 'cancelled'] as const
type Status = (typeof VALID_STATUSES)[number]

function isValidStatus(s: unknown): s is Status {
  return typeof s === 'string' && (VALID_STATUSES as readonly string[]).includes(s)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check
  const token = req.cookies.get(getTokenCookieName())?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || ''
  const email = await verifyToken(token, secret)
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const kv = getKV()
  if (!kv) {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 })
  }

  const { id } = await params
  if (!id || !/^[a-z0-9]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid booking ID' }, { status: 400 })
  }

  const raw = await kv.get(`hotel-booking:${id}`)
  if (!raw) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const booking: HotelBooking = JSON.parse(raw)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { status } = body
  if (!isValidStatus(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
  }

  const updated: HotelBooking = { ...booking, status, updatedAt: new Date().toISOString() }
  await kv.put(`hotel-booking:${id}`, JSON.stringify(updated))

  const nights = getNights(booking.checkIn, booking.checkOut)

  // Cancelling: release the rooms back for each night.
  // Math.max(0, ...) mirrors the existing tour-bookings route and guards
  // against going negative if counters are ever out of sync.
  if (status === 'cancelled' && booking.status !== 'cancelled') {
    await Promise.all(
      nights.map(async (night) => {
        const current = parseInt((await kv.get(`hotel:avail:${night}`)) ?? '0', 10)
        await kv.put(`hotel:avail:${night}`, String(Math.max(0, current - booking.rooms)))
      })
    )
  }

  // Un-cancelling: re-claim the rooms for each night
  if (status !== 'cancelled' && booking.status === 'cancelled') {
    await Promise.all(
      nights.map(async (night) => {
        const current = parseInt((await kv.get(`hotel:avail:${night}`)) ?? '0', 10)
        await kv.put(`hotel:avail:${night}`, String(current + booking.rooms))
      })
    )
  }

  return NextResponse.json({ ok: true, booking: updated })
}
