export enum ROLE {
  CHILDREN = 'CHILDREN',
  PARENT = 'PARENT',
  COACH = 'COACH',
  MANAGER = 'MANAGER',
  SUPER = 'SUPER',
}

export type TTrainingSession = {
  id: number
  groupLevel: GROUP_LEVEL
  startDate: string
  endDate: string
  enrolled: number[]
  attendees: number[]
  coachId: number
  branchId: number
}

export type TBranch = {
  id: number
  name: string
  location: string
  workingStart: string
  workingEnd: string
  contactPhone: string
  contactEmail: string
  photos: string[]
}

export type TChildren = {
  id: number
  branch: number | null
  name: string
  age: number
  groupLevel: GROUP_LEVEL
  parent: number
  email: string
  login: string
  role: ROLE.CHILDREN
}

export type TParent = {
  role: ROLE.PARENT
  id: number
  children: number[]
  email: string
  name: string
  username: string
  contact_info: string
  subscription: number | null
  login: string
}

export type TCoach = {
  email: string
  role: ROLE.COACH
  id: number
  name: string
  login: string
  salary: string
  training_sessions: number[]
}

export type TUser = TChildren | TParent | TCoach

export enum GROUP_LEVEL {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export const groupLevel = {
  [GROUP_LEVEL.BEGINNER]: 'Новичок',
  [GROUP_LEVEL.INTERMEDIATE]: 'Средний',
  [GROUP_LEVEL.ADVANCED]: 'Профи',
}

export type TSubscription = {
  id: number
  session_count: number
  client: number
}

export enum STORAGE_KEYS {
  AUTHORIZATION = 'authorization',
  REFRESH = 'refresh',
}
