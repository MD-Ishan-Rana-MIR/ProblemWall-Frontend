'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { FeedHeader } from '@/components/FeedHeader'
import { PostCard } from '@/components/PostCard'
import { Post } from '@/lib/types'
import { Card } from '@/components/ui/card'

// Sorting options for feed filtering
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

export default function FeedPage() {
  const router = useRouter()

  // Get authenticated user from context
  const { user } = useAuth()

  // State management
  const [posts, setPosts] = useState<Post[]>([]) // store posts
  const [isLoading, setIsLoading] = useState(true) // loading state
  const [error, setError] = useState('') // error message
  const [currentSort, setCurrentSort] = useState('newest') // current sorting type

  // Fetch posts whenever sort option changes
  useEffect(() => {
    fetchPosts()
  }, [currentSort])

  // Fetch posts from API
  const fetchPosts = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Call API with sorting parameter
      const response = await fetch(`/api/posts?sort=${currentSort}`)

      if (!response.ok) throw new Error('Failed to fetch posts')

      const { data } = await response.json()

      // Convert ISO date strings to JavaScript Date objects
      const typedPosts = data.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      }))

      setPosts(typedPosts)
    } catch (err) {
      setError('Failed to load posts')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle upvote/downvote action
  const handleVote = async (
    postId: string,
    voteType: 'upvote' | 'downvote'
  ) => {
    // If user is not logged in → redirect to login page
    if (!user) {
      router.push('/auth/login')
      return
    }

    try {
      // Send vote request to API
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          postId,
          voteType,
        }),
      })

      if (!response.ok) throw new Error('Vote failed')

      // Optimistically update UI (without refetching)
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            // Increase vote count based on type
            if (voteType === 'upvote') {
              return { ...post, upvotes: post.upvotes + 1 }
            } else {
              return { ...post, downvotes: post.downvotes + 1 }
            }
          }
          return post
        })
      )
    } catch (err) {
      console.error('Vote error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Feed header (sorting dropdown, create post button, etc.) */}
      <FeedHeader
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Show welcome message if user is not logged in */}
        {!user && (
          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-2">
              Welcome to Spacify
            </h2>
            <p className="text-blue-800 text-sm">
              Sign in to create posts, vote, and engage with the community.
            </p>
          </Card>
        )}

        {/* Show error message if API fails */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </Card>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin">⏳</div>
          </div>
        ) : posts.length === 0 ? (

          // Empty state (no posts found)
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              No posts found. Be the first to share!
            </p>
          </Card>

        ) : (

          // Render posts list
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onVote={handleVote}
              />
            ))}
          </div>

        )}
      </main>
    </div>
  )
}