import { api } from './client'
import { TBranch, TQueryPagination, TTrainingSession, TUser } from './types'

// auth

export type TUserResponse = TUser

export type TSignInRequest = Pick<TUser, 'login'> & {
  password: string
}

export type TSignUpRequest = TSignInRequest & Pick<TUser, 'email'>

const signIn = async (data: TSignInRequest) => {
  const res = await api.post<TUserResponse>('/auth/sign-in', data)
  return res.data
}

const signUp = async (data: TSignUpRequest) => {
  const res = await api.post<TUserResponse>('/auth/sign-up', data)
  return res.data
}

export type TSignUpByInviteRequest = TSignUpRequest & { code: string }

const signUpByInvite = async (data: TSignUpByInviteRequest) => {
  const res = await api.post<TUserResponse>('/auth/sign-up-by-invite', data)
  return res.data
}

const me = async () => {
  const res = await api.get<TUserResponse>('/auth/me')
  return res.data
}

const editProfile = async () => {
  await api.patch('/auth/edit-profile')
  return
}

const editAvatar = async (uri: string, mimeType: string, name: string) => {
  const formData = new FormData()
  formData.append('file', {
    uri,
    type: mimeType,
    name: `avatar.${mimeType.split('/')[1]}`, // например 'avatar.jpeg' или 'avatar.png'
  } as any)

  await api.patch('/auth/edit-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return
}

const logout = async () => {
  await api.post('/auth/logout')
  return
}

export type TUsersResponse = TUserResponse[]

const getManyUsers = async (data: TQueryPagination) => {
  const res = await api.get<TUsersResponse>('/users', {
    params: data,
  })
  return res.data
}

const getUserById = async (id: number) => {
  const res = await api.get<TUserResponse>(`/users/${id}`)
  return res.data
}

export type TInviteResponse = string

const inviteChildren = async () => {
  const res = await api.post<TInviteResponse>('/users/invite-children')
  return res.data
}

const inviteCoach = async () => {
  const res = await api.post<TInviteResponse>('/users/invite-coach')
  return res.data
}

const inviteManager = async () => {
  const res = await api.post<TInviteResponse>('/users/invite-manager')
  return res.data
}

export type TGetBranchesRequest = TQueryPagination & {
  latitude?: number
  longitude?: number
}
export type TGetBranchesResponse = TBranch[]

const getManyBranches = async (data: TGetBranchesRequest) => {
  const res = await api.get<TGetBranchesResponse>('/branches', {
    params: data,
  })
  return res.data
}

export type TGetBranchResponse = TBranch

const getBranchById = async (id: number) => {
  const res = await api.get<TGetBranchResponse>(`/branches/${id}`)
  return res.data
}

// const getBranches = async () => {
//   const res = await api.get<TGetBranchesResponse>('/branches')
//   return res.data
// }

// export type TGetBranchResponse = TBranch

// const getBranch = async (id: number) => {
//   const res = await api.get<TGetBranchesResponse>(`/branches/${id}`)
//   return res.data
// }

export type TGetTrainingSessionsResponse = TTrainingSession[]

// const getTrainingSessions = async () => {
//   const res = await api.get<TGetTrainingSessionsResponse>('/training_sessions')
//   return res.data
// }

// export type TGetTrainingSessionResponse = TTrainingSession

// const getTrainingSession = async (id: number) => {
//   const res = await api.get<TGetTrainingSessionResponse>(`/training_sessions/${id}`)
//   return res.data
// }

// export type TUpdateTrainingSessionRequest = Partial<TTrainingSession>
// export type TUpdateTrainingSessionResponse = TTrainingSession

// export type TGetTrainingSessionsByIdsResponse = TTrainingSession[]

// const getTrainingSessionsByIds = async (ids: number[]) => {
//   const res = await api.put<TGetTrainingSessionsByIdsResponse>(
//     '/training_sessions/batch-retrieve/',
//     {
//       ids,
//     },
//   )
//   return res.data
// }

// export type TGetCoachResponse = Omit<TCoach, 'role'>

// const getCoach = async (id?: number) => {
//   const res = await api.get<TGetCoachResponse>(`/coaches/${id}`)
//   return res.data
// }

// export type TGetChildrenResponse = TChildren

// const getChildren = async (id: number) => {
//   const res = await api.get<TGetChildrenResponse>(`/children/${id}`)
//   return res.data
// }

// export type TGetChildrensResponse = TChildren[]

// const getChildrens = async (ids: number[]) => {
//   if (ids) {
//     const res = await api.put<TGetChildrensResponse>('/children/batch-retrieve/', { ids })
//     return res.data
//   }

//   return null
// }

// export type TUpdateChildrenRequest = Partial<TChildren>
// export type TUpdateChildrenResponse = TChildren

// const updateChildren = async (id: number, data: TUpdateChildrenRequest) => {
//   const res = await api.patch<TUpdateChildrenResponse>(`/children/${id}/`, data)
//   return res.data
// }

// export type TGetSubscriptionResponse = TSubscription

// const getSubscription = async (id: number | null) => {
//   const res = await api.get<TGetSubscriptionResponse>(`/subscription/${id}`)
//   return res.data
// }

// const createSubscription = async (client: number) => {
//   const res = await api.post<TGetSubscriptionResponse>('/subscription/', { client })
//   return res.data
// }

// export type TUpdateSubscriptionRequest = Partial<TSubscription>
// export type TUpdateSubscriptionResponse = TSubscription

// const updateSubscription = async (id: number, data: TUpdateSubscriptionRequest) => {
//   const res = await api.patch<TUpdateSubscriptionResponse>(`/subscription/${id}/`, data)
//   return res.data
// }

export const v2 = {
  // auth
  signIn,
  signUp,
  signUpByInvite,
  me,
  logout,
  editProfile,
  editAvatar,

  // users
  getManyUsers,
  getUserById,
  inviteChildren,
  inviteCoach,
  inviteManager,

  // branches
  getManyBranches,
  getBranchById,
}
