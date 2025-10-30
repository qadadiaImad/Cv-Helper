/**
 * SHARED TYPES AND UTILITIES
 * Common types used across schemas
 */

export interface SocialLink {
  platform: string
  url: string
  username?: string
}

export interface Summary {
  text: string
}
