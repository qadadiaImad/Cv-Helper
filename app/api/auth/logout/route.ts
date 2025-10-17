import { NextResponse } from "next/server"
import { SESSION_COOKIE_NAME, isProd } from "@/lib/auth/config"

export const runtime = "nodejs"

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 })
  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return res
}
