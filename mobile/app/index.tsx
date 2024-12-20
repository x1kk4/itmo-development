import { useAuthContext } from '@/providers/AuthContext'
import { Link } from 'expo-router'

import { Button, Image, Input, YStack } from 'tamagui'

export default function SignIn() {
  const { signIn } = useAuthContext()

  return (
    <YStack
      gap='$2'
      flex={1}
      justifyContent='center'
      padding='$4'
    >
      <Image
        source={require('../assets/images/logo.png')}
        width={94}
        height={126}
        alignSelf={'center'}
        marginBottom='$4'
      />
      <Input placeholder='Имя пользователя' />
      <Input placeholder='Пароль' />
      <Button
        marginTop='$5'
        theme={'accent'}
        onPress={() =>
          signIn({
            login: 'username123',
            password: 'Password@123',
          })
        }
      >
        Войти
      </Button>
      <Link
        href={'/sign-up'}
        asChild
      >
        <Button
          width={'100%'}
          themeInverse
          style={{ textDecoration: 'none' }}
        >
          Зарегистрироваться
        </Button>
      </Link>
    </YStack>
  )
}
