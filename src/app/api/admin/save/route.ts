export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenCookieName } from '@/lib/edge-auth'

const allowedFiles = ['content', 'rooms'] as const
type AllowedFile = (typeof allowedFiles)[number]

function isAllowedFile(file: unknown): file is AllowedFile {
  return typeof file === 'string' && (allowedFiles as readonly string[]).includes(file)
}

function isValidData(file: AllowedFile, data: unknown): boolean {
  if (data === null || typeof data !== 'object') return false
  if (file === 'content') {
    const d = data as Record<string, unknown>
    return (
      typeof d.home === 'object' &&
      typeof d.about === 'object' &&
      typeof d.pricing === 'object'
    )
  }
  if (file === 'rooms') {
    return Array.isArray(data)
  }
  return false
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(getTokenCookieName())?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || ''
  const email = await verifyToken(token, secret)
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { file, data } = body

  if (!isAllowedFile(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  if (!isValidData(file, data)) {
    return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 })
  }

  return NextResponse.json({ error: 'Storage not available in this environment' }, { status: 503 })
}
