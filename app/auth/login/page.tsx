'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/app/providers'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      router.push('/feed')
    } catch (err) {
      setError('Failed to login. Please check your credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950 p-4">
      <Card className="w-full max-w-md border-slate-200 dark:border-slate-700 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-teal-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
            Spacify
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Welcome back to the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-900 dark:text-white">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-900 dark:text-white">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:opacity-90 font-semibold py-2 h-10"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
            <span>Don&apos;t have an account? </span>
            <Link href="/auth/register" className="text-blue-600 dark:text-teal-400 hover:underline font-semibold">
              Sign up
            </Link>
          </div>

          <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
            <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
              <strong className="text-slate-900 dark:text-slate-200">Demo Credentials:</strong><br />
              Email: alex@example.com<br />
              Password: any password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
