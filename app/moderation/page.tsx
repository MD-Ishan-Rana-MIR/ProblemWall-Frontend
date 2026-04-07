'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { FeedHeader } from '@/components/FeedHeader'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

interface ModerationFlag {
  id: string
  contentId: string
  contentType: string
  reportedBy: string
  reason: string
  details: string
  status: 'pending' | 'reviewed' | 'resolved'
  createdAt: string
  action?: string
}

export default function ModerationPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [flags, setFlags] = useState<ModerationFlag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'pending' | 'reviewed' | 'resolved'>('pending')

  useEffect(() => {
    fetchFlags()
  }, [filter])

  const fetchFlags = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/moderation?status=${filter}`)
      if (!response.ok) throw new Error('Failed to fetch flags')
      const { data } = await response.json()
      setFlags(data)
    } catch (err) {
      setError('Failed to load moderation reports')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResolve = async (flagId: string, action: string) => {
    try {
      const response = await fetch('/api/moderation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flagId,
          status: 'resolved',
          action,
        }),
      })

      if (!response.ok) throw new Error('Failed to resolve flag')

      setFlags((prev) => prev.filter((f) => f.id !== flagId))
    } catch (err) {
      console.error('Error resolving flag:', err)
    }
  }

  if (!user?.isPremium) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FeedHeader
          currentSort="newest"
          onSortChange={() => {}}
          sortOptions={SORT_OPTIONS}
        />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600">
              Only premium members can access the moderation dashboard.
            </p>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedHeader
        currentSort="newest"
        onSortChange={() => {}}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Moderation Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage community reports
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['pending', 'reviewed', 'resolved'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin">⏳</div>
          </div>
        ) : flags.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              No {filter} reports at this time.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {flags.map((flag) => (
              <Card key={flag.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="capitalize">
                        {flag.contentType}
                      </Badge>
                      <Badge variant="destructive">
                        {flag.reason}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Content ID: {flag.contentId}
                    </p>
                  </div>
                  <Badge
                    className={
                      flag.status === 'pending'
                        ? 'bg-yellow-500'
                        : flag.status === 'reviewed'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                    }
                  >
                    {flag.status}
                  </Badge>
                </div>

                {flag.details && (
                  <p className="text-gray-700 mb-4 p-3 bg-gray-50 rounded">
                    {flag.details}
                  </p>
                )}

                {flag.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleResolve(flag.id, 'removed')}
                    >
                      Remove Content
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(flag.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(flag.id, 'needs_review')}
                    >
                      Mark for Review
                    </Button>
                  </div>
                )}

                {flag.action && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm">
                    <p className="font-semibold text-green-900">
                      Action Taken: <span className="capitalize">{flag.action}</span>
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
