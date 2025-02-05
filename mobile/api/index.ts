import { api } from './client'
import { TBranch, TQueryPagination, TTrainingSession, TUser } from './types'

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

export type TEditProfileRequest = Partial<
  Pick<TUser, 'firstname' | 'middlename' | 'surname' | 'phone' | 'telegram'>
>

const editProfile = async (data: TEditProfileRequest) => {
  await api.patch('/auth/edit-profile', data)
  return
}

const editAvatar = async (uri: string, mimeType: string, name: string) => {
  const formData = new FormData()
  formData.append('file', {
    uri,
    type: mimeType,
    name: `avatar.${mimeType.split('/')[1]}`,
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

const getChildrenByUserId = async (id: number) => {
  const res = await api.get<TUsersResponse>(`/users/${id}/children`)
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

export type TGetTrainingSessionsResponse = TTrainingSession[]

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
  getChildrenByUserId,
  inviteChildren,
  inviteCoach,
  inviteManager,

  // branches
  getManyBranches,
  getBranchById,
}
