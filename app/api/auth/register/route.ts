import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'
import { User } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (Object.values(mockUsers).some((u) => u.email === email)) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      )
    }

    if (Object.values(mockUsers).some((u) => u.username === username)) {
      return NextResponse.json(
        { success: false, error: 'Username already taken' },
        { status: 400 }
      )
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      avatar: '👤',
      bio: '',
      totalUpvotes: 0,
      totalPosts: 0,
      joinedDate: new Date(),
      isPremium: false,
      score: 0,
    }

    mockUsers[newUser.id] = newUser

    return NextResponse.json({ success: true, data: newUser }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
