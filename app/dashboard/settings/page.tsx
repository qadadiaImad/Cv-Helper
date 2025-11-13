"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, CreditCard, Crown, Zap } from "lucide-react"
import Link from "next/link"

interface UserData {
  id: string
  name: string
  email: string
  subscriptionStatus: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setError('Failed to load user data')
        }
      } catch (err) {
        console.error('Failed to fetch user:', err)
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const getSubscriptionBadge = (status: string) => {
    const badgeClass = status === 'FREE' ? 'bg-gray-200 text-gray-800' :
                       status === 'ONE_TIME' ? 'bg-yellow-500 text-white' :
                       status === 'BASIC' ? 'bg-blue-500 text-white' :
                       'bg-purple-500 text-white'
    
    const label = status === 'FREE' ? 'Free' :
                  status === 'ONE_TIME' ? 'Quick Boost' :
                  status === 'BASIC' ? 'Basic Monthly' :
                  status === 'PRO' ? 'Pro Unlimited' : status
    
    return <Badge className={badgeClass}>{label}</Badge>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">{error || 'User not found'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account and subscription</p>
      </div>

      {/* Profile Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-lg">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Subscription Status
          </CardTitle>
          <CardDescription>Your current plan and benefits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Plan</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user?.subscriptionStatus?.toLowerCase().replace('_', ' ')}
              </p>
            </div>
            {getSubscriptionBadge(user?.subscriptionStatus || 'FREE')}
          </div>

          {user?.subscriptionStatus === 'FREE' && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Upgrade to unlock AI-powered features and premium templates
              </p>
              <Link href="/pricing">
                <Button className="w-full sm:w-auto">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common account actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/pricing" className="block">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              View Pricing Plans
            </Button>
          </Link>
          <Link href="/dashboard/cvs" className="block">
            <Button variant="outline" className="w-full justify-start">
              <User className="w-4 h-4 mr-2" />
              My Resumes
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
