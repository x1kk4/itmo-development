import { ROLE } from '@/router/types'

export type TGuest = {
  role: ROLE.UNAUTHORIZED
}

export type TParent = {
  role: ROLE.PARENT
  id: number
  children: number[]
  name: string
  username: string
  contact_info: string
}

export type TCoach = {
  role: ROLE.COACH
  id: number
  name: string
  login: string
  salary: string
  training_sessions: number[]
}

export type TUser = TGuest | TParent | TCoach
