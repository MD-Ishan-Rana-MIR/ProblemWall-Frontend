import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('id')

    if (userId) {
      const user = mockUsers[userId as string]
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, data: user })
    }

    // Return all users for leaderboard
    const users = Object.values(mockUsers).sort(
      (a, b) => b.score - a.score
    )

    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
