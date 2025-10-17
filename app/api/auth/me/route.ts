import { NextResponse } from "next/server"
import { getSessionUserFromHeader } from "@/lib/auth/session"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie")
    const user = await getSessionUserFromHeader(cookieHeader)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
