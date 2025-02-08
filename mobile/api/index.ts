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

const getParentsByUserId = async (id: number) => {
  const res = await api.get<TUsersResponse>(`/users/${id}/parents`)
  return res.data
}

const getBranchesByUserId = async (id: number) => {
  const res = await api.get<TBranchesResponse>(`/users/${id}/branches`)
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

export type TBranchesResponse = TBranch[]

const getManyBranches = async (data: TGetBranchesRequest) => {
  const res = await api.get<TBranchesResponse>('/branches', {
    params: data,
  })
  return res.data
}

export type TBranchResponse = TBranch

const getBranchById = async (id: number) => {
  const res = await api.get<TBranchResponse>(`/branches/${id}`)
  return res.data
}

const getUsersByBranchId = async (id: number) => {
  const res = await api.get<TUsersResponse>(`/branches/${id}/users`)
  return res.data
}

const getStaffByBranchId = async (id: number) => {
  const res = await api.get<TUsersResponse>(`/branches/${id}/staff`)
  return res.data
}

export type TBindRequest = {
  branchId: number
  userId: number
}

const bindUserToBranch = async (req: TBindRequest) => {
  await api.post(`/branches/${req.branchId}/bind-user/${req.userId}`)
}

const unbindUserFromBranch = async (req: TBindRequest) => {
  await api.post(`/branches/${req.branchId}/unbind-user/${req.userId}`)
}

export type TTrainingSessionResponse = TTrainingSession
export type TTrainingSessionsResponse = TTrainingSessionResponse[]

export type TGetTrainingSessionsRequest = Omit<TQueryPagination, 'search'> & {
  branchId?: number[]
  userId?: number
}

const getManyTrainingSessions = async (data: TGetTrainingSessionsRequest) => {
  const res = await api.get<TTrainingSessionsResponse>('/training-sessions', {
    params: data,
  })
  return res.data
}

export type TGroupedTrainingSessionsResponse = {
  date: string
  data: TTrainingSession[]
}[]

const getGroupedTrainingSessions = async (data: TGetTrainingSessionsRequest) => {
  const res = await api.get<TGroupedTrainingSessionsResponse>('/training-sessions/grouped', {
    params: data,
  })
  return res.data
}

const getTrainingSessionById = async (id: number) => {
  const res = await api.get<TTrainingSessionResponse>(`/training-sessions/${id}`)
  return res.data
}

export type TEnrollRequest = {
  sessionId: number
  userId: number
}

export type TAttendRequest = TEnrollRequest

const enrollUser = async (req: TEnrollRequest) => {
  await api.post(`/training-sessions/${req.sessionId}/enroll/${req.userId}`)
}

const unenrollUser = async (req: TEnrollRequest) => {
  await api.post(`/training-sessions/${req.sessionId}/unenroll/${req.userId}`)
}

const attendUser = async (req: TAttendRequest) => {
  await api.post(`/training-sessions/${req.sessionId}/attend/${req.userId}`)
}

const unattendUser = async (req: TAttendRequest) => {
  await api.post(`/training-sessions/${req.sessionId}/unattend/${req.userId}`)
}

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
  getParentsByUserId,
  getBranchesByUserId,
  inviteChildren,
  inviteCoach,
  inviteManager,

  // branches
  getManyBranches,
  getBranchById,
  getUsersByBranchId,
  getStaffByBranchId,
  bindUserToBranch,
  unbindUserFromBranch,

  //training-sessions
  getManyTrainingSessions,
  getGroupedTrainingSessions,
  getTrainingSessionById,
  enrollUser,
  unenrollUser,
  attendUser,
  unattendUser,
}
