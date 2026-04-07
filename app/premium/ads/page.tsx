'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { FeedHeader } from '@/components/FeedHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

export default function PremiumAdsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    budget: '100',
    duration: '7',
  })

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
              Premium Feature
            </h2>
            <p className="text-gray-600 mb-6">
              Only premium members can create ads. Upgrade your account to get started.
            </p>
            <Button onClick={() => router.push('/premium')}>
              Upgrade to Premium
            </Button>
          </Card>
        </main>
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate ad creation
      alert('Ad created successfully!')
      router.push('/feed')
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
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create a Premium Ad
          </h1>
          <p className="text-gray-600 mb-8">
            Reach more members with a sponsored post. Your ad will get featured placement.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Ad Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="What are you promoting?"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Ad Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us about your offer..."
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                Landing URL
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                  Daily Budget ($)
                </label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  min="10"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration (days)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[7, 14, 30].map((days) => (
                    <option key={days} value={days}>
                      {days} days
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    Total Cost
                  </p>
                  <p className="text-xs text-blue-700">
                    {parseInt(formData.budget) * parseInt(formData.duration)} days ×{' '}
                    ${formData.budget}/day
                  </p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${parseInt(formData.budget) * parseInt(formData.duration)}
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Creating Ad...' : 'Launch Ad'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
