export const runtime = 'edge'

import { NextResponse } from 'next/server'

// Auth is handled by /api/auth/login and /api/auth/logout
export function GET() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export function POST() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
