import { NextRequest, NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email (mock authentication)
    const user = Object.values(mockUsers).find((u) => u.email === email)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In a real app, verify password hash here
    // For demo purposes, we'll accept any password

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
