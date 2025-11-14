/**
 * Authentication Helper
 * Integrates with existing JWT-based auth system
 */

import { NextRequest } from 'next/server'
import { getSessionUserFromHeader } from './auth/session'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthResult {
  user: AuthUser | null
  error?: string
}

/**
 * Verify authentication from request
 * Uses existing JWT session cookie system
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Get cookie header from request
    const cookieHeader = request.headers.get('cookie')
    
    // Use existing session verification
    const sessionUser = await getSessionUserFromHeader(cookieHeader)
    
    if (!sessionUser) {
      return { user: null, error: 'Not authenticated' }
    }

    // Map to AuthUser interface
    const user: AuthUser = {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name,
    }

    return { user }
  } catch (error) {
    console.error('Auth verification error:', error)
    return { user: null, error: 'Authentication failed' }
  }
}

/**
 * Get current user ID from request
 */
export async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  const auth = await verifyAuth(request)
  return auth.user?.id || null
}

/**
 * Require authentication (throws if not authenticated)
 */
export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const auth = await verifyAuth(request)
  
  if (!auth.user) {
    throw new Error('Authentication required')
  }
  
  return auth.user
}
