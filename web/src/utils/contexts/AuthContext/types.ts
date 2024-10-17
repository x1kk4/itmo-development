import { ROLE } from '@/router/types'

export type TUser = {
  role: ROLE
  username?: string
  email?: string
  branch: number | null
}
