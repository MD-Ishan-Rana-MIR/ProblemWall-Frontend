import { NextRequest, NextResponse } from 'next/server'
import { mockVotes, mockPosts } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, postId, voteType } = body

    if (!userId || !postId || !voteType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the post
    const post = mockPosts.find((p) => p.id === postId)
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    // Check if user already voted on this post
    const existingVote = mockVotes.find(
      (v) => v.userId === userId && v.postId === postId
    )

    if (existingVote) {
      // Remove old vote
      if (existingVote.voteType === 'upvote') {
        post.upvotes = Math.max(0, post.upvotes - 1)
      } else {
        post.downvotes = Math.max(0, post.downvotes - 1)
      }

      const voteIndex = mockVotes.indexOf(existingVote)
      mockVotes.splice(voteIndex, 1)

      // If same vote type, just remove and return
      if (existingVote.voteType === voteType) {
        return NextResponse.json({ success: true, data: { voteRemoved: true } })
      }
    }

    // Add new vote
    if (voteType === 'upvote') {
      post.upvotes += 1
    } else {
      post.downvotes += 1
    }

    const newVote = {
      id: `vote-${Date.now()}`,
      userId,
      postId,
      commentId: null,
      voteType: voteType as 'upvote' | 'downvote',
      createdAt: new Date(),
    }

    mockVotes.push(newVote)

    return NextResponse.json({ success: true, data: newVote })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to vote' },
      { status: 500 }
    )
  }
}
