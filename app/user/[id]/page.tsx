'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { FeedHeader } from '@/components/FeedHeader'
import { User } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

export default function UserProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/users?id=${userId}`)
      if (!response.ok) throw new Error('User not found')
      const { data } = await response.json()
      setUser(data)
    } catch (err) {
      setError('Failed to load user profile')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedHeader
        currentSort="newest"
        onSortChange={() => {}}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin">⏳</div>
          </div>
        ) : user ? (
          <>
            {/* Profile Header */}
            <Card className="overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32" />
              <div className="px-6 py-6 -mt-16 relative">
                <div className="flex items-end gap-4 mb-4">
                  <div className="text-8xl bg-white rounded-lg p-2 border-4 border-white shadow-lg">
                    {user.avatar}
                  </div>
                  <div className="flex-1 pb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {user.username}
                    </h1>
                    {user.isPremium && (
                      <Badge className="mt-2 bg-yellow-500">Premium Member</Badge>
                    )}
                  </div>
                </div>

                {user.bio && (
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                )}

                {/* <p className="text-sm text-gray-500">
                  Joined {user.joinedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p> */}
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {user.score}
                </div>
                <div className="text-sm text-gray-600">Reputation Score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {user.totalUpvotes}
                </div>
                <div className="text-sm text-gray-600">Total Upvotes</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {user.totalPosts}
                </div>
                <div className="text-sm text-gray-600">Posts Created</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.floor(user.totalUpvotes / Math.max(user.totalPosts, 1))}
                </div>
                <div className="text-sm text-gray-600">Avg Upvotes/Post</div>
              </Card>
            </div>

            {/* Activity Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Activity & Contributions
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Posts</span>
                  <span className="font-semibold">{user.totalPosts}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Total Upvotes Received</span>
                  <span className="font-semibold text-green-600">
                    +{user.totalUpvotes}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-700">Member Status</span>
                  <span className="font-semibold">
                    {user.isPremium ? '⭐ Premium' : 'Free'}
                  </span>
                </div>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <Link href="/feed" className="text-blue-600 hover:underline">
                ← Back to feed
              </Link>
            </div>
          </>
        ) : null}
      </main>
    </div>
  )
}
