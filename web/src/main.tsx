import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
