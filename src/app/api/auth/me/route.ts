export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenCookieName } from '@/lib/edge-auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(getTokenCookieName())?.value
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || ''
  const email = await verifyToken(token, secret)
  if (!email) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({ user: { email } })
}
