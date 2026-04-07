'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface ReportModalProps {
  contentId: string
  contentType: 'post' | 'comment'
  onClose: () => void
  onSubmit: (reason: string, details: string) => Promise<void>
}

const REPORT_REASONS = [
  'Spam or misleading',
  'Harassment or bullying',
  'Hate speech',
  'Misinformation',
  'Self-promotion',
  'Adult content',
  'Other',
]

export function ReportModal({
  contentId,
  contentType,
  onClose,
  onSubmit,
}: ReportModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!reason) {
      setError('Please select a reason')
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(reason, details)
      onClose()
    } catch (err) {
      setError('Failed to submit report. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Report {contentType === 'post' ? 'Post' : 'Comment'}
          </h2>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Reason for reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason...</option>
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="details" className="text-sm font-medium">
                Additional details (optional)
              </label>
              <Textarea
                id="details"
                placeholder="Provide more context about your report..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !reason}
                className="flex-1"
              >
                {isLoading ? 'Submitting...' : 'Submit Report'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
