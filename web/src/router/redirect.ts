import { routes } from './routes'
import { ROLE } from './types'

const redirects: Record<ROLE, string> = {
  [ROLE.UNAUTHORIZED]: routes['sign-in'],
  [ROLE.PARENT]: routes.dashboard,
  [ROLE.COACH]: routes.dashboard,
  [ROLE.MANAGER]: routes.dashboard,
}

export { redirects }
