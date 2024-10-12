import { Flex } from '@chakra-ui/react'
import { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { pageRoutes } from './router/pageRoutes'
import { useAuthContext } from './utils/AuthContext'
import { layout } from './layouts'
import { redirects } from './router/redirect'

const App: FC = () => {
  const { user } = useAuthContext()

  return (
    <Flex
      minHeight={'100vh'}
      position={'relative'}
    >
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          {pageRoutes
            .filter((route) => route.allowedRoles.includes(user.role))
            .map((route) => (
              <Route
                key={route.path}
                path='/'
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
      </Suspense>
    </Flex>
  )
}

export { App }
