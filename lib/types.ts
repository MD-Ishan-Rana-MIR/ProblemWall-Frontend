// User types
export interface User {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
  totalUpvotes: number
  totalPosts: number
  joinedDate: Date
  isPremium: boolean
  score: number // reputation score for leaderboard
}

// Post types
export interface Post {
  id: string
  authorId: string
  author: User
  title: string
  content: string
  category: string
  upvotes: number
  downvotes: number
  commentCount: number
  createdAt: Date
  updatedAt: Date
  isValidated: boolean
  isPremiumOnly: boolean
}

// Comment types
export interface Comment {
  id: string
  postId: string
  authorId: string
  author: User
  content: string
  upvotes: number
  downvotes: number
  createdAt: Date
  updatedAt: Date
}

// Vote types
export interface Vote {
  id: string
  userId: string
  postId: string | null
  commentId: string | null
  voteType: 'upvote' | 'downvote'
  createdAt: Date
}

// Subscription types
export interface Subscription {
  id: string
  userId: string
  tier: 'free' | 'premium' | 'pro'
  startDate: Date
  endDate: Date | null
  isActive: boolean
  paymentMethod: 'stripe' | 'paypal'
}

// Moderation types
export interface ModerationFlag {
  id: string
  postId: string | null
  commentId: string | null
  reason: string
  flaggedBy: string
  status: 'pending' | 'reviewed' | 'resolved'
  createdAt: Date
  resolvedAt: Date | null
}

// Leaderboard entry
export interface LeaderboardEntry extends User {
  rank: number
}
