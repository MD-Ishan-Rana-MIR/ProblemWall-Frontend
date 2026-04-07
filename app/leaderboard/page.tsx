'use client'

import { useState, useEffect } from 'react'
import { FeedHeader } from '@/components/FeedHeader'
import { Leaderboard } from '@/components/Leaderboard'
import { User } from '@/lib/types'
import { Card } from '@/components/ui/card'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch leaderboard')
      const { data } = await response.json()
      setUsers(data)
    } catch (err) {
      setError('Failed to load leaderboard')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950">
      <FeedHeader
        currentSort="newest"
        onSortChange={() => {}}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-300 dark:to-blue-300 bg-clip-text text-transparent">
            Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">
            The most engaged and respected members of the Spacify community
          </p>
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin text-3xl">⏳</div>
          </div>
        ) : (
          <Leaderboard users={users} />
        )}
      </main>
    </div>
  )
}
