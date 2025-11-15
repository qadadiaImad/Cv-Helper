import { NextRequest } from "next/server"
import { getSessionUserFromHeader } from "./session"
import { PublicUser } from "./types"

export interface AuthResult {
  user: PublicUser | null
}

/**
 * Verify authentication from Next.js request
 * Extracts session from cookies and returns user if authenticated
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  const cookieHeader = request.headers.get("cookie")
  const user = await getSessionUserFromHeader(cookieHeader)
  return { user }
}

// Re-export commonly used auth utilities
export * from "./types"
export * from "./session"
export * from "./jwt"
export * from "./password"
export * from "./storage"
export * from "./config"
