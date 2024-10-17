import { api } from './client'

export type TBranch = {
  id: number
  name: string
  location: string
  working_hours: string | null
  contact_info: string | null
  image: string
}

export type TGetBrahcnesResponse = TBranch[]

export const getBranches = async () => {
  const res = await api.get<TGetBrahcnesResponse>('/branches')
  return res.data
}
