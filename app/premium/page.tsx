'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers'
import Link from 'next/link'
import { FeedHeader } from '@/components/FeedHeader'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
  { value: 'validated', label: 'Validated' },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'Forever',
    description: 'Get started with the basics',
    features: [
      'Create up to 20 posts/month',
      'Upvote & downvote posts',
      'View leaderboard',
      'Community access',
      'Basic support',
    ],
    cta: 'Current Plan',
    isPremium: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'Per month',
    description: 'Unlock advanced features',
    features: [
      'Unlimited posts',
      'Premium-only posts',
      'Priority in trending',
      'Advanced analytics',
      'Community moderation tools',
      'Email support',
    ],
    cta: 'Upgrade Now',
    isPremium: true,
    badge: 'POPULAR',
  },
  {
    name: 'Pro',
    price: '$24.99',
    period: 'Per month',
    description: 'Maximum reach and control',
    features: [
      'Everything in Premium',
      'Featured post slots',
      'Custom analytics dashboard',
      'Early access to features',
      'Priority support',
      'API access',
    ],
    cta: 'Upgrade to Pro',
    isPremium: true,
  },
]

export default function PremiumPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleUpgrade = (planName: string) => {
    if (planName === 'Free') return
    setSelectedPlan(planName)
    // In a real app, this would redirect to payment
    alert(`Upgrading to ${planName} plan...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FeedHeader
        currentSort="newest"
        onSortChange={() => { }}
        sortOptions={SORT_OPTIONS}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Spacify Premium Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to maximize your impact in the Spacify community
          </p>
          {user?.isPremium && (
            <Badge className="mt-4 bg-green-500">Your current plan: Premium</Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`overflow-hidden transition-transform hover:shadow-lg ${plan.isPremium && plan.badge ? 'ring-2 ring-blue-500 md:scale-105' : ''
                }`}
            >
              {plan.badge && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  {plan.badge}
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{plan.description}</p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleUpgrade(plan.name)}
                  className="w-full mb-6"
                  variant={
                    user?.isPremium && plan.isPremium
                      ? 'outline'
                      : plan.isPremium
                        ? 'default'
                        : 'outline'
                  }
                  disabled={user?.isPremium && plan.isPremium}
                >
                  {user?.isPremium && plan.isPremium
                    ? 'Current Plan'
                    : plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-green-600 text-lg">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time.',
              },
              {
                q: 'Is there a free trial?',
                a: 'We offer a 7-day free trial for Premium plans. No credit card required.',
              },
              {
                q: 'What happens to my posts if I downgrade?',
                a: 'All your posts remain public. Premium-only posts become visible to everyone.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you&apos;re not satisfied.',
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        {!user?.isPremium && (
          <Card className="mt-12 bg-blue-600 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to upgrade your Spacify experience?
            </h2>
            <p className="mb-6">
              Join thousands of premium members enjoying exclusive features and growing their
              reputation.
            </p>
            <Button
              onClick={() => handleUpgrade('Premium')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started with Premium
            </Button>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Link href="/feed" className="text-blue-600 hover:underline">
            ← Back to feed
          </Link>
        </div>
      </main>
    </div>
  )
}
