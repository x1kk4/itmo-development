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

export type TTrainingSession = {
  id: number
  attendees: string[]
  date: string
  start_time: string
  end_time: string
  coach: number
}

export type TGetTrainingSessionsResponse = TTrainingSession[]

export const getTrainingSessions = async () => {
  const res = await api.get<TGetTrainingSessionsResponse>('/training_sessions')
  return res.data
}
