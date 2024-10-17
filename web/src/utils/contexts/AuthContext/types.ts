import { ROLE } from '@/router/types'

export type TUser = {
  id?: number
  role: ROLE
  username?: string
  email?: string
  branch: number | null
}
