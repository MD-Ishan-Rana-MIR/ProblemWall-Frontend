'use client'

import Link from 'next/link'
import { User } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LeaderboardProps {
  users: User[]
}

export function Leaderboard({ users }: LeaderboardProps) {
  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700 dark:from-teal-600 dark:via-blue-600 dark:to-teal-700 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        <p className="text-blue-50 text-sm mt-1">Top contributors by reputation</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 dark:text-slate-100">
                Rank
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 dark:text-slate-100">
                User
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-900 dark:text-slate-100">
                Score
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-900 dark:text-slate-100">
                Posts
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-900 dark:text-slate-100">
                Upvotes
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-800/30 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-full font-semibold text-sm text-white ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-500' : index === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-teal-500'}`}>
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <span className="text-lg">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/user/${user.id}`}
                    className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-teal-400 transition-colors"
                  >
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {user.username}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Joined {typeof user.joinedDate === 'string' ? new Date(user.joinedDate).toLocaleDateString() : user.joinedDate.toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="font-bold text-slate-900 dark:text-white text-lg">
                    {user.score}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:opacity-80">{user.totalPosts}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {user.totalUpvotes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
