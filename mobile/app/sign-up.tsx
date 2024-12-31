import { useAuthContext } from '@/providers/AuthContext'
import { useRouter } from 'expo-router'
import { Button, Input, Image } from 'tamagui'
import { Screen } from '@/ui/Screen'
import { TSignUpRequest } from '@/api'
import { useState } from 'react'
import { produce } from 'immer'

export default function SignUp() {
  const { signUp } = useAuthContext()

  const [data, setData] = useState<TSignUpRequest>({
    login: '',
    email: '',
    password: '',
  })

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
      <Input
        textContentType='username'
        placeholder='Имя пользователя'
        value={data.login}
        onChangeText={(text) =>
          setData(
            produce((draft) => {
              draft.login = text
            }),
          )
        }
      />
      <Input
        textContentType='emailAddress'
        placeholder='Электронная почта'
        value={data.email}
        onChangeText={(text) =>
          setData(
            produce((draft) => {
              draft.email = text
            }),
          )
        }
      />
      <Input
        textContentType='password'
        secureTextEntry
        placeholder='Пароль'
        value={data.password}
        onChangeText={(text) =>
          setData(
            produce((draft) => {
              draft.password = text
            }),
          )
        }
      />
      <Button
        marginTop='$5'
        theme={'accent'}
        color={'white'}
        onPress={() => signUp(data)}
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
