export const JWT_SECRET = (process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET || "DEV_ONLY_CHANGE_ME_SECRET").toString()

export const JWT_ALG = "HS256"
export const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7 // 7 days

export const SESSION_COOKIE_NAME = "session"

export const isProd = process.env.NODE_ENV === "production"
