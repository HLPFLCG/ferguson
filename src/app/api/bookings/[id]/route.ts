export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { verifyToken, getTokenCookieName } from '@/lib/edge-auth'
import type { Booking } from '../route'

function getKV(): KVNamespace | null {
  try {
    const { env } = getRequestContext()
    const kv = (env as CloudflareEnv).BOOKINGS_KV
    return kv ?? null
  } catch {
    return null
  }
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

  const raw = await kv.get(`booking:${id}`)
  if (!raw) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const booking: Booking = JSON.parse(raw)

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

  const updated: Booking = { ...booking, status, updatedAt: new Date().toISOString() }
  await kv.put(`booking:${id}`, JSON.stringify(updated))

  // If cancelling a previously non-cancelled booking, release the availability slots
  if (status === 'cancelled' && booking.status !== 'cancelled') {
    const availKey = `avail:${booking.packageId}:${booking.departureDate}`
    const current = parseInt((await kv.get(availKey)) ?? '0', 10)
    await kv.put(availKey, String(Math.max(0, current - booking.partySize)))
  }

  // If un-cancelling (pending/confirmed) a previously cancelled booking, re-claim slots
  if (status !== 'cancelled' && booking.status === 'cancelled') {
    const availKey = `avail:${booking.packageId}:${booking.departureDate}`
    const current = parseInt((await kv.get(availKey)) ?? '0', 10)
    await kv.put(availKey, String(current + booking.partySize))
  }

  return NextResponse.json({ ok: true, booking: updated })
}
