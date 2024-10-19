const routes = {
  // common
  landing: '/',

  // unauthorized
  'sign-in': '/auth/sign-in',
  'sign-up': '/auth/sign-up',

  // parent
  dashboard: '/dashboard',
  schedule: '/schedule',
  branches: '/branches',
  subscription: '/subscription',

  // coach
  sessions: '/sessions',
  journal: '/journal/:id',
  salary: '/salary',
}

export { routes }
