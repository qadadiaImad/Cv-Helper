import { prisma } from "@/lib/db/prisma"
import type { User as DbUser } from "@prisma/client"
import { User, PublicUser } from "./types"

export function toPublicUser(user: Pick<DbUser, "id" | "name" | "email"> | User): PublicUser {
  const { id, name, email } = user
  return { id, name, email }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const u = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!u) return undefined
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    createdAt: u.createdAt.toISOString(),
  }
}

export async function findUserById(id: string): Promise<User | undefined> {
  const u = await prisma.user.findUnique({ where: { id } })
  if (!u) return undefined
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    passwordHash: u.passwordHash,
    createdAt: u.createdAt.toISOString(),
  }
}

export async function addUser(user: User): Promise<void> {
  await prisma.user.create({
    data: {
      id: user.id, // allow provided id for compatibility
      name: user.name,
      email: user.email.toLowerCase(),
      passwordHash: user.passwordHash,
      createdAt: new Date(user.createdAt),
    },
  })
}
