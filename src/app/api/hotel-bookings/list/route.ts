export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { verifyToken, getTokenCookieName } from '@/lib/edge-auth'

function getKV(): KVNamespace | null {
  try {
    const { env } = getRequestContext()
    const kv = (env as CloudflareEnv).BOOKINGS_KV
    return kv ?? null
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
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
    return NextResponse.json({ bookings: [], unavailable: true })
  }

  const listed = await kv.list({ prefix: 'hotel-booking:', limit: 500 })
  const results = await Promise.all(
    listed.keys.map(async ({ name }) => {
      const raw = await kv.get(name)
      if (!raw) return null
      try {
        return JSON.parse(raw)
      } catch {
        return null
      }
    })
  )

  const bookings = results
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  return NextResponse.json({ bookings })
}
