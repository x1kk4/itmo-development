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
  contactTelegram: string | null
  contactPhone: string
  contactEmail: string
  photos: string[]
  yaMapsLink: string | null
  twogisLink: string | null
  gMapsLink: string | null

  trainingSessions?: TTrainingSession[]
}

export type TUser = {
  id: number
  role: ROLE
  login: string
  email: string
  phone: string | null
  telegram: string | null
  firstname: string | null
  surname: string | null
  middlename: string | null
  profilePicture: string | null
}

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
  THEME = 'theme',
}

export type TQueryPagination = {
  page?: number
  limit?: number
  search?: string
}
