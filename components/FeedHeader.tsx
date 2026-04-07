'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/providers'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SortOption {
  value: string
  label: string
}

interface FeedHeaderProps {
  currentSort: string
  onSortChange: (sort: string) => void
  sortOptions: SortOption[]
}

export function FeedHeader({ currentSort, onSortChange, sortOptions }: FeedHeaderProps) {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Sort'

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
            Spacify
          </Link>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/feed"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors"
            >
              Leaderboard
            </Link>
          </nav>

          {/* Right side - User menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90">
                  <Link href="/post/create">Create Post</Link>
                </Button>

                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 hover:bg-slate-100 dark:hover:bg-slate-800">
                      {user.avatar}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/user/${user.id}`}>Profile</Link>
                    </DropdownMenuItem>
                    {user.isPremium && (
                      <DropdownMenuItem asChild>
                        <Link href="/premium">Premium</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort by:</span>
          <div className="flex gap-2 flex-wrap">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={currentSort === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className={currentSort === option.value ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90 border-0' : ''}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
