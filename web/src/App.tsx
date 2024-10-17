import { Box } from '@chakra-ui/react'
import { FC, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { pageRoutes } from './router/pageRoutes'
import { useAuthContext } from './utils/contexts/AuthContext'
import { layout } from './layouts'
import { redirects } from './router/redirects'

const App: FC = () => {
  const { user } = useAuthContext()

  return (
    <Box
      display={'grid'}
      gridAutoFlow={'column'}
      gridAutoColumns={'auto 1fr'}
      minHeight={'100vh'}
      width={'100vw'}
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
    </Box>
  )
}

export { App }
