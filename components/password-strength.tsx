"use client"

import * as React from "react"

function calcStrength(pwd: string) {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  // normalize to 0..4
  if (score > 4) score = 4
  return score
}

function getLabel(score: number) {
  switch (score) {
    case 0:
    case 1:
      return { text: "Weak", color: "bg-destructive" }
    case 2:
      return { text: "Fair", color: "bg-amber-500" }
    case 3:
      return { text: "Good", color: "bg-primary" }
    case 4:
      return { text: "Strong", color: "bg-emerald-500" }
    default:
      return { text: "Weak", color: "bg-destructive" }
  }
}

export function PasswordStrength({ password }: { password: string }) {
  const score = React.useMemo(() => calcStrength(password), [password])
  const { text, color } = getLabel(score)
  const percent = (score / 4) * 100

  return (
    <div className="space-y-1">
      <div className="h-2 w-full rounded-full bg-secondary/50 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">Password strength: <span className="font-medium text-foreground">{text}</span></div>
    </div>
  )
}
