'use client'

import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { FeedHeader } from '@/components/FeedHeader'
import { CreatePostForm } from '@/components/CreatePostForm'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

export default function CreatePostPage() {
  const router = useRouter()
  const { user } = useAuth()

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedHeader
        currentSort="newest"
        onSortChange={() => {}}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <CreatePostForm />
      </main>
    </div>
  )
}
