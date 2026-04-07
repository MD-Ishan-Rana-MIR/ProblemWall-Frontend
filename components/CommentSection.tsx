'use client'

import { useEffect, useState } from 'react'
import { Comment } from '@/lib/types'
import CommentItem from './CommentItem'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'

export default function CommentSection({ postId }: { postId: string }) {
  const { user } = useAuth()
  const router = useRouter()

  const [comments, setComments] = useState<Comment[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`)
      const data = await res.json()
      setComments(data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  // Add main comment
  const handleComment = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!message.trim()) return

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId,
        message,
        parentId: null,
        userId: user.id,
      }),
    })

    const newComment = await res.json()
    setComments(prev => [...prev, newComment])
    setMessage('')
  }

  return (
    <div className="mt-6">
      {/* Add Comment */}
      <div className="flex gap-2 mb-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a comment..."
          className="border p-2 flex-1 rounded-md"
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 text-white px-4 rounded-md"
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        comments
          .filter(c => !c.parentId)
          .map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              allComments={comments}
              setComments={setComments}
            />
          ))
      )}
    </div>
  )
}