import { routes } from '@/router/routes'
import { Box, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Landing: FC = () => {
  return (
    <Box margin={'auto'}>
      <Text marginBottom={8}>Страница лендинга</Text>
      <Flex
        flexDirection={'column'}
        gap={4}
      >
        <Link to={routes['sign-in']}>Вход</Link>
        <Link to={routes['sign-up']}>Регистрация</Link>
        <Link to={routes.dashboard}>Главная (дашборд родителя)</Link>
      </Flex>
    </Box>
  )
}

export { Landing }
