import { Auth } from '@/views/Auth'
import { Box } from '@chakra-ui/react'
import { FC } from 'react'

const SignUpPage: FC = () => {
  return (
    <Box>
      <Auth title='Регистрация' />
    </Box>
  )
}

export { SignUpPage }
