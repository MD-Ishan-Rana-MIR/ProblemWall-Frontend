import { NextRequest, NextResponse } from 'next/server'
import { mockPosts } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort') || 'newest'
    const category = searchParams.get('category')

    let posts = [...mockPosts]

    // Filter by category if provided
    if (category && category !== 'all') {
      posts = posts.filter(
        (post) =>
          post.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Sort posts
    if (sort === 'trending') {
      posts.sort((a, b) => {
        const scoreA = a.upvotes - a.downvotes
        const scoreB = b.upvotes - b.downvotes
        return scoreB - scoreA
      })
    } else if (sort === 'validated') {
      posts = posts.filter((post) => post.isValidated)
      posts.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )
    } else {
      // newest (default)
      posts.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )
    }

    // Serialize dates and avoid sending full author objects
    const serializedPosts = posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      author: post.author ? {
        id: post.author.id,
        username: post.author.username,
        avatar: post.author.avatar,
      } : { id: post.authorId, username: 'User', avatar: '👤' }
    }))

    return NextResponse.json({ success: true, data: serializedPosts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, authorId, isPremiumOnly } = body

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the user in mock data
    const { mockUsers } = await import('@/lib/mock-data')
    const authorUser = Object.values(mockUsers).find((u) => u.id === authorId) || {
      id: authorId,
      username: 'User',
      email: '',
      avatar: '👤',
      bio: '',
      totalUpvotes: 0,
      totalPosts: 0,
      joinedDate: new Date(),
      isPremium: false,
      score: 0,
    }

    const newPost = {
      id: `post-${Date.now()}`,
      authorId,
      author: authorUser,
      title,
      content,
      category: category || 'General',
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isValidated: false,
      isPremiumOnly: isPremiumOnly || false,
    }

    mockPosts.push(newPost)

    // Serialize the response
    const serializedPost = {
      ...newPost,
      createdAt: newPost.createdAt.toISOString(),
      updatedAt: newPost.updatedAt.toISOString(),
      author: {
        id: newPost.author.id,
        username: newPost.author.username,
        avatar: newPost.author.avatar,
      }
    }

    return NextResponse.json({ success: true, data: serializedPost }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
