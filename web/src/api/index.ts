import { TCoach, TParent } from '@/utils/contexts/AuthContext/types'
import { api } from './client'
import { TChildren, TGroupLevel, TSubscription } from '@/utils/contexts/ParentContext/types'

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
  group_level: TGroupLevel
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

export type TUpdateClientRequest = Partial<Omit<TParent, 'role'>>
export type TUpdateClientResponse = Omit<TParent, 'role'>

export const updateClient = async (id: number, data: TUpdateClientRequest) => {
  const res = await api.patch<TUpdateClientResponse>(`/clients/${id}/`, data)
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

  return null
}

export type TGetChildrensResponse = TChildren[]

export const getChildrens = async (ids: number[]) => {
  if (ids) {
    const res = await api.put<TGetChildrensResponse>('/children/batch-retrieve/', { ids })
    return res.data
  }

  return null
}

export type TUpdateChildrenRequest = Partial<TChildren>
export type TUpdateChildrenResponse = TChildren

export const updateChildren = async (id: number, data: TUpdateChildrenRequest) => {
  const res = await api.patch<TUpdateChildrenResponse>(`/children/${id}/`, data)
  return res.data
}

export type TGetSubscriptionResponse = TSubscription

export const getSubscription = async (id: number | null) => {
  if (id) {
    const res = await api.get<TGetSubscriptionResponse>(`/subscription/${id}`)
    return res.data
  }

  return null
}

export type TCreateSubscriptionResponse = TSubscription

export const createSubscription = async (client: number) => {
  const res = await api.post<TGetSubscriptionResponse>('/subscription/', { client })
  return res.data
}

export type TUpdateSubscriptionRequest = Partial<TSubscription>
export type TUpdateSubscriptionResponse = TSubscription

export const updateSubscription = async (id: number, data: TUpdateSubscriptionRequest) => {
  const res = await api.patch<TUpdateSubscriptionResponse>(`/subscription/${id}/`, data)
  return res.data
}
