import { SignJWT, jwtVerify, JWTPayload } from "jose"
import { JWT_ALG, JWT_EXPIRES_IN_SECONDS, JWT_SECRET } from "./config"

const secretKey = new TextEncoder().encode(JWT_SECRET)

type BasePayload = JWTPayload & {
  sub: string
  email: string
}

export async function signToken(payload: Omit<BasePayload, "iat" | "exp" | "nbf" | "iss" | "aud">, expiresInSec = JWT_EXPIRES_IN_SECONDS) {
  const now = Math.floor(Date.now() / 1000)
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt(now)
    .setExpirationTime(now + expiresInSec)
    .sign(secretKey)
  return token
}

export async function verifyToken<T extends BasePayload = BasePayload>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify<T>(token, secretKey, { algorithms: [JWT_ALG] })
    return payload
  } catch {
    return null
  }
}
