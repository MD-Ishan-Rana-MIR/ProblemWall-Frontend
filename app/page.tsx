'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/app/providers'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950">
      {/* Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-blue-600 dark:from-teal-400 dark:via-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
            Spacify
          </h1>
          <nav className="flex gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" className="text-foreground hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Link href="/feed">Feed</Link>
                </Button>
                <Button asChild variant="ghost" className="text-foreground hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Link href="/leaderboard">Leaderboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 dark:from-teal-300 dark:via-blue-300 dark:to-teal-300 bg-clip-text text-transparent leading-tight">
            Share, Discuss & Grow
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Spacify is a modern community platform where you can share your ideas, engage with others, and build your reputation in the tech community.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {user ? (
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90">
                <Link href="/feed">Explore Feed</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90">
                  <Link href="/auth/register">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 dark:border-slate-700">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-400 transition-all duration-300">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Share Ideas</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Post your thoughts, questions, and insights with the community.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300">
            <div className="text-5xl mb-4">⬆️</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Vote & Engage</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Upvote quality content and engage in meaningful discussions.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-400 transition-all duration-300">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Build Reputation</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Earn reputation points and climb the leaderboard rankings.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
