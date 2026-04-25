export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createToken, makeTokenCookie, TOKEN_TTL_SECONDS } from '@/lib/edge-auth'

function getAllowedEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS || ''
  if (raw) {
    return raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  }
  // Legacy fallback
  return ['admin@manzanillo.lat']
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  const allowedEmails = getAllowedEmails()
  if (!allowedEmails.includes((email as string).toLowerCase())) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH || ''
  const valid = await bcrypt.compare(password as string, passwordHash)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || ''
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const token = await createToken(email as string, secret)

  const res = NextResponse.json({ ok: true, email })
  res.headers.set('Set-Cookie', makeTokenCookie(token, TOKEN_TTL_SECONDS))
  return res
}

