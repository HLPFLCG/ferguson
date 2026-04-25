import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { file, data } = await req.json()

  const allowedFiles = ['content', 'rooms', 'pricing']
  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'src', 'data', `${file}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json({ success: true })
}
