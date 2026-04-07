# Spacify - Community Platform Documentation

## Overview

Spacify is a modern community platform where users can share ideas, engage through voting, build reputation, and access premium features. Built with Next.js 15, React 19, and Tailwind CSS.

## Key Features

### 1. Authentication System
- **Login/Register Pages** (`/auth/login`, `/auth/register`)
- User accounts with profiles and avatars
- Mock authentication with demo credentials
- AuthProvider for global state management

**Demo Credentials:**
- Email: `alex@example.com`
- Password: any password

### 2. Feed & Post System
- **Feed Page** (`/feed`)
  - Sorting options: Newest, Trending, Validated
  - Upvote/downvote system for posts
  - Post creation with categories
  - Premium-only post options

- **Post Creation** (`/post/create`)
  - Rich text support
  - Category selection
  - Premium posting (for premium users)

- **Post Card Component**
  - Vote tracking
  - Author information
  - Comment count display
  - Content reporting

### 3. User Profiles & Leaderboard
- **User Profile Pages** (`/user/[id]`)
  - User reputation score
  - Post and upvote statistics
  - Member status
  - Activity metrics

- **Leaderboard** (`/leaderboard`)
  - Top users ranked by reputation
  - Score calculations
  - Member statistics
  - Medal badges (gold, silver, bronze)

### 4. Premium Features
- **Premium Plans** (`/premium`)
  - Free tier
  - Premium tier ($9.99/month)
  - Pro tier ($24.99/month)
  - Feature comparisons
  - FAQ section

- **Premium Ads** (`/premium/ads`)
  - Create sponsored posts
  - Set budgets and duration
  - Featured placement
  - Premium-only feature

### 5. Content Moderation
- **Report System**
  - Report posts/comments
  - Multiple report reasons
  - Detailed descriptions
  - Modal-based UI

- **Moderation Dashboard** (`/moderation`)
  - Premium members only
  - Review pending reports
  - Mark reports as reviewed/resolved
  - Content removal actions

## File Structure

```
app/
├── page.tsx                    # Home/landing page
├── auth/
│   ├── login/page.tsx         # Login page
│   └── register/page.tsx       # Registration page
├── feed/page.tsx              # Main feed
├── post/
│   └── create/page.tsx        # Create post page
├── leaderboard/page.tsx       # Leaderboard page
├── user/[id]/page.tsx         # User profile page
├── premium/
│   ├── page.tsx               # Premium plans
│   └── ads/page.tsx           # Create premium ads
├── moderation/page.tsx        # Moderation dashboard
├── api/
│   ├── posts/route.ts         # Posts API
│   ├── votes/route.ts         # Voting API
│   ├── users/route.ts         # Users API
│   ├── auth/
│   │   ├── login/route.ts     # Login endpoint
│   │   └── register/route.ts  # Register endpoint
│   └── moderation/route.ts    # Moderation API
├── layout.tsx                 # Root layout with AuthProvider
└── providers.tsx              # Authentication context

components/
├── PostCard.tsx               # Post display component
├── FeedHeader.tsx             # Navigation header
├── CreatePostForm.tsx         # Post creation form
├── Leaderboard.tsx            # Leaderboard table
├── ReportModal.tsx            # Content reporting modal
└── ui/                        # shadcn/ui components

lib/
├── types.ts                   # TypeScript interfaces
└── mock-data.ts              # Mock database

```

## Data Models

### User
- id, username, email, avatar
- totalUpvotes, totalPosts
- isPremium, score (reputation)
- joinedDate, bio

### Post
- id, authorId, title, content
- category, upvotes, downvotes
- commentCount, isValidated
- isPremiumOnly, createdAt

### Vote
- id, userId, postId/commentId
- voteType (upvote/downvote)

### ModerationFlag
- id, contentId, contentType
- reason, reportedBy, status
- createdAt, resolvedAt

## API Endpoints

### Posts
- `GET /api/posts?sort=newest&category=all` - Fetch posts with filtering
- `POST /api/posts` - Create new post

### Votes
- `POST /api/votes` - Upvote/downvote posts

### Users
- `GET /api/users?id=user-1` - Get user by ID
- `GET /api/users` - Get all users (sorted by score)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Moderation
- `GET /api/moderation?status=pending` - Get flags by status
- `POST /api/moderation` - Submit content report
- `PATCH /api/moderation` - Update flag status

## Usage Instructions

### 1. Getting Started
1. Visit the home page (`/`)
2. Sign up with `/auth/register` or login with demo credentials
3. Access the feed to browse posts

### 2. Creating Posts
1. Click "Create Post" in the header
2. Fill in title, content, and category
3. Submit to publish (premium users can make posts premium-only)

### 3. Engaging with Posts
1. Click upvote/downvote arrows to vote
2. Click report button (⚠️) to flag inappropriate content
3. Select reason and submit report

### 4. Viewing Leaderboard
1. Navigate to `/leaderboard`
2. View top users by reputation
3. Click on user to view their profile

### 5. Premium Features
1. Visit `/premium` to see plans
2. Upgrade to unlock:
   - Unlimited posts
   - Premium-only posts
   - Create ads (`/premium/ads`)
   - Access moderation dashboard

### 6. Moderation (Premium Only)
1. Visit `/moderation`
2. Review pending reports
3. Remove content or approve posts

## Customization

### Theme Colors
Edit the design tokens in `tailwind.config.ts` and `globals.css` to customize colors.

### Mock Data
Update `lib/mock-data.ts` to modify:
- Initial users
- Sample posts
- Mock votes

### Categories
Edit `CATEGORIES` array in `components/CreatePostForm.tsx` to add new post categories.

## Future Enhancements

1. **Database Integration**
   - Replace mock data with Supabase/PostgreSQL
   - Implement proper authentication with JWT

2. **Real-time Features**
   - WebSocket for live voting updates
   - Real-time notifications

3. **Search & Filtering**
   - Advanced search capabilities
   - User mentions and hashtags

4. **Comments System**
   - Full comment threads
   - Comment voting

5. **Payment Integration**
   - Stripe checkout for premium
   - Subscription management

6. **Analytics**
   - User engagement metrics
   - Post performance tracking

## Performance Notes

- Posts are paginated in the feed
- User leaderboard is sorted by reputation score
- Mock data is lightweight for demo purposes
- Component structure optimized for scalability

## Demo Accounts

```
User 1: alex@example.com (Premium, High Score)
User 2: sarah@example.com (Premium, High Score)
User 3: john@example.com (Free)
User 4: emma@example.com (Free)
User 5: mike@example.com (Free)
```

All demo accounts accept any password for authentication.

---

## Technical Stack

- **Framework:** Next.js 15 with App Router
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** React Context API
- **Dates:** date-fns
- **Type Safety:** TypeScript

## Support

For issues or questions, refer to the documentation or check the implementation in the respective component files.
