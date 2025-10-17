import { NextResponse } from "next/server"
import { RegisterSchema } from "@/lib/auth/schemas"
import { findUserByEmail, addUser, toPublicUser } from "@/lib/auth/storage"
import { hashPassword } from "@/lib/auth/password"
import { signToken } from "@/lib/auth/jwt"
import { SESSION_COOKIE_NAME, JWT_EXPIRES_IN_SECONDS, isProd } from "@/lib/auth/config"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = RegisterSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data

    const existing = await findUserByEmail(email)
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    }
    await addUser(user)

    const token = await signToken({ sub: user.id, email: user.email })

    const res = NextResponse.json({ user: toPublicUser(user) }, { status: 201 })
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
