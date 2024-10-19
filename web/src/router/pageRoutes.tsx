import { ROLE } from './types'
import { LAYOUT } from '@/layouts'
import { routes } from './routes'
import { RouteProps } from 'react-router-dom'

import { LandingPage } from 'pages/landing'
import { SignInPage } from 'pages/auth/sign-in'
import { SignUpPage } from 'pages/auth/sign-up'
import { DashboardPage } from 'pages/dashboard'
import { SchedulePage } from 'pages/schedule'
import { BranchesPage } from 'pages/branches'
import { SubscriptionPage } from 'pages/subscription'
import { SessionsPage } from 'pages/sessions'
import { JournalPage } from '@/pages/journal/[id]'
import { SalaryPage } from '@/pages/salary'

type TPageRoute = RouteProps & {
  allowedRoles: ROLE[]
  layout: LAYOUT
}

const pageRoutes: TPageRoute[] = [
  {
    path: routes.landing,
    element: <LandingPage />,
    allowedRoles: [ROLE.UNAUTHORIZED, ROLE.PARENT, ROLE.COACH, ROLE.MANAGER],
    layout: LAYOUT.LANDING,
  },
  {
    path: routes['sign-in'],
    element: <SignInPage />,
    allowedRoles: [ROLE.UNAUTHORIZED],
    layout: LAYOUT.AUTH,
  },
  {
    path: routes['sign-up'],
    element: <SignUpPage />,
    allowedRoles: [ROLE.UNAUTHORIZED],
    layout: LAYOUT.AUTH,
  },
  {
    path: routes.dashboard,
    element: <DashboardPage />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.schedule,
    element: <SchedulePage />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.branches,
    element: <BranchesPage />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.subscription,
    element: <SubscriptionPage />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.sessions,
    element: <SessionsPage />,
    allowedRoles: [ROLE.COACH],
    layout: LAYOUT.COACH,
  },
  {
    path: routes.journal,
    element: <JournalPage />,
    allowedRoles: [ROLE.COACH],
    layout: LAYOUT.COACH,
  },
  {
    path: routes.salary,
    element: <SalaryPage />,
    allowedRoles: [ROLE.COACH],
    layout: LAYOUT.COACH,
  },
]

export { pageRoutes }
