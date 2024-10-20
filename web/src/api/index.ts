import { TCoach, TParent } from '@/utils/contexts/AuthContext/types'
import { api } from './client'
import { TChildren } from '@/utils/contexts/ParentContext/types'

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

export type TTrainingSession = {
  id: number
  attendees: string[]
  date: string
  start_time: string
  end_time: string
  coach: number
  branch: number
}

export type TGetTrainingSessionsResponse = TTrainingSession[]

export const getTrainingSessions = async () => {
  const res = await api.get<TGetTrainingSessionsResponse>('/training_sessions')
  return res.data
}

export type TGetClientResponse = Omit<TParent, 'role'>

export const getClient = async (id: number) => {
  const res = await api.get<TGetClientResponse>(`/clients/${id}`)
  return res.data
}

export type TGetCoachResponse = Omit<TCoach, 'role'>

export const getCoach = async (id: number) => {
  const res = await api.get<TGetCoachResponse>(`/coaches/${id}`)
  return res.data
}

export type TGetChildrenResponse = TChildren

export const getChildren = async (id: number | null) => {
  if (id) {
    const res = await api.get<TGetChildrenResponse>(`/children/${id}`)
    return res.data
  }
}

export type TUpdateChildrenRequest = TChildren
export type TUpdateChildrenResponse = TChildren

export const updateChildren = async (data: TUpdateChildrenRequest) => {
  const { id, ...requestData } = data
  const res = await api.put<TUpdateChildrenResponse>(`/children/${id}/`, requestData)
  return res.data
}
