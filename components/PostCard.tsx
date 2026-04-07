'use client'

import { Post } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ReportModal } from './ReportModal'
import CommentSection from './CommentSection'

interface PostCardProps {
  post: Post
  onVote: (postId: string, voteType: 'upvote' | 'downvote') => Promise<void>
}

export function PostCard({ post, onVote }: PostCardProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const [votes, setVotes] = useState({
    upvotes: post.upvotes,
    downvotes: post.downvotes,
  })

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (isVoting) return // prevent spam click

    setIsVoting(true)
    try {
      await onVote(post.id, voteType)

      // Optimistic update
      setVotes((prev) => ({
        ...prev,
        [voteType === 'upvote' ? 'upvotes' : 'downvotes']:
          prev[voteType === 'upvote' ? 'upvotes' : 'downvotes'] + 1,
      }))
    } catch (error) {
      console.error('Voting error:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const score = votes.upvotes - votes.downvotes

  const handleReport = async (reason: string, details: string) => {
    try {
      const response = await fetch('/api/moderation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: post.id,
          contentType: 'post',
          userId: 'current-user',
          reason,
          details,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit report')

      setShowReportModal(false)
    } catch (error) {
      console.error('Report error:', error)
    }
  }

  return (
    <Card className="p-5 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-200 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">

      <div className="flex gap-5">

        {/* 🔼 Vote Section */}
        <div className="flex flex-col items-center gap-2 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('upvote')}
            disabled={isVoting}
            className="h-9 w-9 p-0 hover:bg-teal-100 dark:hover:bg-teal-900/30"
          >
            ↑
          </Button>

          <span className="text-sm font-bold min-w-[2rem] text-center">
            {score}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote('downvote')}
            disabled={isVoting}
            className="h-9 w-9 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            ↓
          </Button>
        </div>

        {/* 📝 Content Section */}
        <div className="flex-1 min-w-0">

          {/* Title + Actions */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/post/${post.id}`} className="group">
                <h3 className="font-semibold group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
              </Link>

              <p className="text-sm mt-2 line-clamp-2 text-gray-600 dark:text-gray-400">
                {post.content}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {post.isPremiumOnly && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Premium
                </span>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportModal(true)}
                className="hover:text-red-500"
              >
                ⚠️
              </Button>
            </div>
          </div>

          {/* 📊 Metadata */}
          <div className="flex items-center gap-2 text-xs mt-3 text-gray-500 flex-wrap">
            <span className="font-medium">
              {typeof post.author === 'string'
                ? post.author
                : post.author?.username || 'User'}
            </span>

            <span>•</span>
            <span>{post.category}</span>

            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>

            <span>•</span>

            {/* 💬 Toggle Comments */}
            <button
              onClick={() => setShowComments((prev) => !prev)}
              className="text-blue-500 hover:underline flex items-center gap-1"
            >
              💬 {post.commentCount || 0}
            </button>
          </div>
        </div>
      </div>

      {/* 💬 Comment Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4 animate-in fade-in duration-200">
          <CommentSection postId={post.id} />
        </div>
      )}

      {/* ⚠️ Report Modal */}
      {showReportModal && (
        <ReportModal
          contentId={post.id}
          contentType="post"
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}
    </Card>
  )
}