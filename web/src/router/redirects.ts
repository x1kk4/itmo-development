import { routes } from './routes'
import { ROLE } from './types'

const redirects: Record<ROLE, string> = {
  [ROLE.UNAUTHORIZED]: routes.landing,
  [ROLE.PARENT]: routes.dashboard,
  [ROLE.COACH]: routes.sessions,
  [ROLE.MANAGER]: routes.landing,
}

export { redirects }
