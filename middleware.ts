import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { JWT_ALG, JWT_SECRET, SESSION_COOKIE_NAME } from "@/lib/auth/config"

export const config = {
  matcher: ["/dashboard/:path*"],
}

const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  try {
    await jwtVerify(token, secretKey, { algorithms: [JWT_ALG] })
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url))
    try {
      res.cookies.set(SESSION_COOKIE_NAME, "", { path: "/", maxAge: 0 })
    } catch {
      // ignore cookie clear failures in middleware
    }
    return res
  }
}
