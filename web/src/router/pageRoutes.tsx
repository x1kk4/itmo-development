import { ROLE } from './types'
import { LAYOUT } from '@/layouts'
import { routes } from './routes'
import { RouteProps } from 'react-router-dom'

import { LandingPage } from 'pages/landing/index'
import { SignInPage } from 'pages/auth/sign-in/index'
import { SignUpPage } from 'pages/auth/sign-up/index'
// import { DashboardPage } from 'pages/dashboard/index'
// import { SchedulePage } from '@/pages/schedule/index'
// import { BranchesPage } from '@/pages/branches/index'
// import { SubscriptionPage } from '@/pages/subscription/index'

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
  // {
  //   path: routes.dashboard,
  //   element: <DashboardPage />,
  //   allowedRoles: [ROLE.PARENT],
  //   layout: LAYOUT.PARENT,
  // },
  // {
  //   path: routes.schedule,
  //   element: <SchedulePage />,
  //   allowedRoles: [ROLE.PARENT],
  //   layout: LAYOUT.PARENT,
  // },
  // {
  //   path: routes.branches,
  //   element: <BranchesPage />,
  //   allowedRoles: [ROLE.PARENT],
  //   layout: LAYOUT.PARENT,
  // },
  // {
  //   path: routes.subscription,
  //   element: <SubscriptionPage />,
  //   allowedRoles: [ROLE.PARENT],
  //   layout: LAYOUT.PARENT,
  // },
]

export { pageRoutes }
