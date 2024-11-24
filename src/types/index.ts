export type userType = {
  createdAt: string
  name: string
  avatar: string
  description: string
  website: string
  id: string
}

export type dataProp = {
  users: userType[]
}
