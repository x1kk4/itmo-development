import { Auth } from '@/views/Auth'
import { Box } from '@chakra-ui/react'
import { FC } from 'react'

const SignInPage: FC = () => {
  return (
    <Box>
      <Auth title='Вход' />
    </Box>
  )
}

export { SignInPage }
