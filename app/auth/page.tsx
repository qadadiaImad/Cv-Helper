"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type ApiUser = { id: string; name: string; email: string }

type ApiResponse<T = unknown> = { error?: string; user?: ApiUser } & T

export default function AuthPage() {
  const [registerName, setRegisterName] = React.useState("")
  const [registerEmail, setRegisterEmail] = React.useState("")
  const [registerPassword, setRegisterPassword] = React.useState("")

  const [loginEmail, setLoginEmail] = React.useState("")
  const [loginPassword, setLoginPassword] = React.useState("")

  const [currentUser, setCurrentUser] = React.useState<ApiUser | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      })
      const data: ApiResponse = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")
      setMessage("Registered successfully")
      await fetchMe()
    } catch (err: any) {
      setMessage(err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
      const data: ApiResponse = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      setMessage("Logged in successfully")
      await fetchMe()
    } catch (err: any) {
      setMessage(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  async function fetchMe() {
    try {
      const res = await fetch("/api/auth/me", { method: "GET" })
      const data: ApiResponse = await res.json()
      if (!res.ok) {
        setCurrentUser(null)
        return
      }
      setCurrentUser(data.user ?? null)
    } catch {
      setCurrentUser(null)
    }
  }

  async function handleLogout() {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (!res.ok) throw new Error("Logout failed")
      setMessage("Logged out")
      setCurrentUser(null)
    } catch (err: any) {
      setMessage(err.message || "Logout failed")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchMe()
  }, [])

  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Auth Playground</h1>
      <p className="text-muted-foreground">Use this page to test Register, Login, Me and Logout flows.</p>

      {message ? (
        <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
          {message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="r-name">Name</Label>
              <Input id="r-name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-email">Email</Label>
              <Input id="r-email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-pass">Password</Label>
              <Input id="r-pass" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRegister} disabled={loading}>Register</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="l-email">Email</Label>
              <Input id="l-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="l-pass">Password</Label>
              <Input id="l-pass" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} disabled={loading}>Login</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Current authenticated user</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentUser ? (
            <div className="text-sm">
              <div><span className="text-muted-foreground">ID:</span> {currentUser.id}</div>
              <div><span className="text-muted-foreground">Name:</span> {currentUser.name}</div>
              <div><span className="text-muted-foreground">Email:</span> {currentUser.email}</div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No user logged in.</div>
          )}
        </CardContent>
        <CardFooter className="gap-3">
          <Button variant="outline" onClick={fetchMe} disabled={loading}>Refresh</Button>
          <Button variant="destructive" onClick={handleLogout} disabled={loading || !currentUser}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
