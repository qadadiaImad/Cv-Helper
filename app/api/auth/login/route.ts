import { NextResponse } from "next/server"
import { LoginSchema } from "@/lib/auth/schemas"
import { findUserByEmail, toPublicUser } from "@/lib/auth/storage"
import { verifyPassword } from "@/lib/auth/password"
import { signToken } from "@/lib/auth/jwt"
import { SESSION_COOKIE_NAME, JWT_EXPIRES_IN_SECONDS, isProd } from "@/lib/auth/config"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = LoginSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await signToken({ sub: user.id, email: user.email })

    const res = NextResponse.json({ user: toPublicUser(user) }, { status: 200 })
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: JWT_EXPIRES_IN_SECONDS,
    })
    return res
  } catch (err) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
