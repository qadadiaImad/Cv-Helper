import { verifyToken } from "./jwt"
import { findUserById, toPublicUser } from "./storage"
import { PublicUser } from "./types"
import { SESSION_COOKIE_NAME } from "./config"

function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(";")
  for (const part of parts) {
    const [k, ...rest] = part.trim().split("=")
    if (k === name) {
      return decodeURIComponent(rest.join("="))
    }
  }
  return null
}

export async function getSessionUserFromHeader(cookieHeader: string | null): Promise<PublicUser | null> {
  const token = getCookieValue(cookieHeader, SESSION_COOKIE_NAME)
  if (!token) return null
  const payload = await verifyToken(token)
  if (!payload?.sub) return null
  const user = await findUserById(payload.sub)
  return user ? toPublicUser(user) : null
}
