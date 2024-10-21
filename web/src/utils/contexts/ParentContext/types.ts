export type TGroupLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type TChildren = {
  id: number
  branch: number | null
  name: string
  age: number
  group_level: TGroupLevel
  parent: number
}

export const groupLevel = {
  Beginner: 'Новичок',
  Intermediate: 'Средний',
  Advanced: 'Профи',
}

export type TSubscription = {
  id: number
  session_count: number
  client: number
}
