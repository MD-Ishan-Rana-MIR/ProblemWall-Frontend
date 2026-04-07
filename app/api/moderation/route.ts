import { NextRequest, NextResponse } from 'next/server'

const FLAGGED_CONTENT: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentId, contentType, userId, reason, details } = body

    if (!contentId || !contentType || !userId || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const flagId = `flag-${Date.now()}`
    FLAGGED_CONTENT[flagId] = {
      id: flagId,
      contentId,
      contentType,
      reportedBy: userId,
      reason,
      details,
      status: 'pending',
      createdAt: new Date(),
    }

    return NextResponse.json({
      success: true,
      data: { flagId, message: 'Report submitted successfully' },
    })
  } catch (error) {
    console.error('Moderation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status') || 'pending'

    const reports = Object.values(FLAGGED_CONTENT).filter(
      (flag) => flag.status === status
    )

    return NextResponse.json({ success: true, data: reports })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { flagId, status, action } = body

    if (!flagId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const flag = FLAGGED_CONTENT[flagId]
    if (!flag) {
      return NextResponse.json(
        { success: false, error: 'Flag not found' },
        { status: 404 }
      )
    }

    flag.status = status
    flag.resolvedAt = new Date()
    flag.action = action

    return NextResponse.json({ success: true, data: flag })
  } catch (error) {
    console.error('Error updating report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update report' },
      { status: 500 }
    )
  }
}
