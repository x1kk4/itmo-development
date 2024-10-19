import { ReactNode } from 'react'
import { ParentLayout } from './ParentLayout'
import { AuthLayout } from './AuthLayout'
import { LandingLayout } from './LandingLayout'
import { CoachLayout } from './CoachLayout'

export enum LAYOUT {
  LANDING = 'landing',
  AUTH = 'auth',
  PARENT = 'parent',
  COACH = 'coach',
}

export const layout: Record<LAYOUT, ReactNode> = {
  [LAYOUT.LANDING]: <LandingLayout />,
  [LAYOUT.AUTH]: <AuthLayout />,
  [LAYOUT.PARENT]: <ParentLayout />,
  [LAYOUT.COACH]: <CoachLayout />,
}
