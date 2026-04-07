'use client'

import { useState } from 'react'
import { Comment } from '@/lib/types'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'

export default function CommentItem({
    comment,
    allComments,
    setComments,
}: {
    comment: Comment
    allComments: Comment[]
    setComments: any
}) {
    const { user } = useAuth()
    const router = useRouter()

    const [reply, setReply] = useState('')
    const [showReply, setShowReply] = useState(false)

    // Get replies
    const replies = allComments.filter(
        (c) => c.parentId === comment.id
    )

    // Handle reply
    const handleReply = async () => {
        if (!user) {
            router.push('/auth/login')
            return
        }

        if (!reply.trim()) return

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId: comment.postId,
                message: reply,
                parentId: comment.id,
                userId: user.id,
            }),
        })

        const newReply = await res.json()

        setComments((prev: Comment[]) => [...prev, newReply])
        setReply('')
        setShowReply(false)
    }

    return (
        <div className="border-l pl-4 mt-3">
            {/* Comment */}
            <p className="text-sm text-gray-800">{comment.message}</p>

            {/* Reply button */}
            <button
                onClick={() => setShowReply(!showReply)}
                className="text-xs text-blue-500 mt-1"
            >
                Reply
            </button>

            {/* Reply input */}
            {showReply && (
                <div className="flex gap-2 mt-2">
                    <input
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write reply..."
                        className="border p-1 flex-1 rounded"
                    />
                    <button
                        onClick={handleReply}
                        className="bg-blue-500 text-white px-2 rounded"
                    >
                        Send
                    </button>
                </div>
            )}

            {/* Replies */}
            <div className="ml-4 mt-2">
                {replies.map((rep) => (
                    <CommentItem
                        key={rep.id}
                        comment={rep}
                        allComments={allComments}
                        setComments={setComments}
                    />
                ))}
            </div>
        </div>
    )
}