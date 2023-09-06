import { NextResponse } from 'next/server'

export async function GET() {
  const data = { status: 'ok' }

  return NextResponse.json(data)
}
