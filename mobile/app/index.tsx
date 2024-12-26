import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'
import { useRouter } from 'expo-router'

import { Button, Image, Input } from 'tamagui'

export default function SignIn() {
  const { signIn } = useAuthContext()

  const router = useRouter()

  return (
    <Screen
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
        color={'white'}
        onPress={() =>
          signIn({
            login: 'username123',
            password: 'Password@123',
          })
        }
      >
        Войти
      </Button>

      <Button
        width={'100%'}
        themeInverse
        onPress={() => router.push('/sign-up')}
      >
        Зарегистрироваться
      </Button>
    </Screen>
  )
}
