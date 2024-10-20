import { useAuthContext } from '@/utils/contexts/AuthContext'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { FC } from 'react'

type TAuthProps = {
  title: string
}

const Auth: FC<TAuthProps> = ({ title }) => {
  const { authParent } = useAuthContext()

  return (
    <Flex
      border={'1px'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        direction={'column'}
        width={'400px'}
        gap={2}
      >
        <Text
          as={'h1'}
          fontSize={24}
          fontWeight={600}
          textAlign={'center'}
          marginBottom={4}
        >
          {title}
        </Text>
        <Input placeholder={'Логин'} />
        <Input
          type={'password'}
          placeholder={'Пароль'}
        />
        <Button onClick={authParent}>{title}</Button>
      </Flex>
    </Flex>
  )
}

export { Auth }
