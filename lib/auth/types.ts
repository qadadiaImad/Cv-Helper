export type User = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

export type PublicUser = Pick<User, "id" | "name" | "email">
