import { Box } from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { pageRoutes } from './router/pageRoutes'
import { useAuthContext } from './utils/contexts/AuthContext'
import { layout } from './layouts'
import { redirects } from './router/redirects'
import { ROLE } from './router/types'
import { ParentProvider } from './utils/contexts/ParentContext'
import { CoachProvider } from './utils/contexts/CoachContext'

const App: FC = () => {
  const { user } = useAuthContext()

  const routes = useMemo(() => {
    if (!user) {
      return null
    }

    return (
      // <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {pageRoutes
          .filter((route) => route.allowedRoles.includes(user.role))
          .map((route) => (
            <Route
              key={route.path}
              element={layout[route.layout]}
            >
              <Route {...route} />
            </Route>
          ))}
        <Route
          path={'*'}
          element={<Navigate to={redirects[user.role]} />}
        />
      </Routes>
      // </Suspense>
    )
  }, [user])

  const routesWithProvider = useMemo(() => {
    if (!user) {
      return null
    }

    if (user.role === ROLE.PARENT) {
      return (
        <ParentProvider
          parentId={user.id}
          childrenIds={user.children}
          subscriptionId={user.subscription}
        >
          {routes}
        </ParentProvider>
      )
    }

    if (user.role === ROLE.COACH) {
      return <CoachProvider coachId={user.id}>{routes}</CoachProvider>
    }

    return routes
  }, [routes, user])

  if (!user) {
    return null
  }

  return (
    <Box
      display={'grid'}
      gridAutoFlow={'column'}
      gridAutoColumns={'auto 1fr'}
      minHeight={'100vh'}
      width={'100vw'}
      position={'relative'}
    >
      {routesWithProvider}
    </Box>
  )
}

export { App }
