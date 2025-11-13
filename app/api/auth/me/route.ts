import { NextResponse } from "next/server"
import { getSessionUserFromHeader } from "@/lib/auth/session"
import { prisma } from "@/lib/db/prisma"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie")
    const sessionUser = await getSessionUserFromHeader(cookieHeader)
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Fetch full user data with subscription details
    const fullUser = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: { subscription: true }
    })
    
    if (!fullUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Return user with subscription info
    const user = {
      id: fullUser.id,
      name: fullUser.name,
      email: fullUser.email,
      subscriptionStatus: fullUser.subscriptionStatus,
      stripeCustomerId: fullUser.stripeCustomerId,
      currentPeriodEnd: fullUser.subscription?.currentPeriodEnd?.toISOString(),
      cancelAtPeriodEnd: fullUser.subscription?.cancelAtPeriodEnd,
      stripeSubscriptionId: fullUser.subscription?.stripeSubscriptionId
    }
    
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error('Error fetching user:', err)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
