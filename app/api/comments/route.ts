import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory DB (replace with real DB)
let COMMENTS: any[] = []

export async function POST(req: NextRequest) {
  const body = await req.json()

  const newComment = {
    id: Date.now().toString(),
    postId: body.postId,
    userId: body.userId || 'guest',
    message: body.message,
    parentId: body.parentId || null,
    createdAt: new Date().toISOString(),
  }

  COMMENTS.push(newComment)

  return NextResponse.json(newComment)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')

  const filtered = COMMENTS.filter(c => c.postId === postId)

  return NextResponse.json({ data: filtered })
}