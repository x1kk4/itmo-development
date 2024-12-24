import { useAuthContext } from '@/providers/AuthContext'
import { useRouter } from 'expo-router'
import { Button, Input, Image } from 'tamagui'
import { Screen } from '@/ui/Screen'

export default function SignUp() {
  const { signUp } = useAuthContext()

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
      <Input placeholder='Электронная почта' />
      <Input placeholder='Пароль' />
      <Button
        marginTop='$5'
        theme={'accent'}
        onPress={() =>
          signUp({
            login: 'username123',
            password: 'Password@123',
            email: 'email@gmail.com',
          })
        }
      >
        Зарегистрироваться
      </Button>
      <Button
        onPress={() => router.back()}
        width={'100%'}
        themeInverse
        style={{ textDecoration: 'none' }}
      >
        Войти
      </Button>
    </Screen>
  )
}
