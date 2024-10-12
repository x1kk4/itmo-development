import { ROLE } from './types'
import { routes } from './routes'
import { RouteProps } from 'react-router-dom'
import { Landing } from '@/pages/Landing'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'
import { Dashboard } from '@/pages/Dashboard'
import { Schedule } from '@/pages/Schedule'
import { Branches } from '@/pages/Branches'
import { Subscription } from '@/pages/Subscription'
import { LAYOUT } from '@/layouts'

type TPageRoute = RouteProps & {
  allowedRoles: ROLE[]
  layout: LAYOUT
}

const pageRoutes: TPageRoute[] = [
  {
    path: routes.landing,
    element: <Landing />,
    allowedRoles: [ROLE.UNAUTHORIZED, ROLE.PARENT, ROLE.COACH, ROLE.MANAGER],
    layout: LAYOUT.LANDING,
  },
  {
    path: routes['sign-in'],
    element: <SignIn />,
    allowedRoles: [ROLE.UNAUTHORIZED],
    layout: LAYOUT.AUTH,
  },
  {
    path: routes['sign-up'],
    element: <SignUp />,
    allowedRoles: [ROLE.UNAUTHORIZED],
    layout: LAYOUT.AUTH,
  },
  {
    path: routes.dashboard,
    element: <Dashboard />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.schedule,
    element: <Schedule />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.branches,
    element: <Branches />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
  {
    path: routes.subscription,
    element: <Subscription />,
    allowedRoles: [ROLE.PARENT],
    layout: LAYOUT.PARENT,
  },
]

export { pageRoutes }
