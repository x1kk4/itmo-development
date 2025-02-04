import { TSignInRequest } from '@/api'
import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { produce } from 'immer'

import { Button, Image, Input } from 'tamagui'

export default function SignIn() {
  const { signIn } = useAuthContext()

  const [data, setData] = useState<TSignInRequest>({
    login: '',
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
        placeholder='Имя пользователя или почта'
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
        onPress={() => signIn(data)}
      >
        Войти
      </Button>

      <Button
        width={'100%'}
        themeInverse
        onPress={() => router.push('/sign-up')}
      >
        Еще не зарегистрированы?
      </Button>

      <Button
        marginTop='$5'
        color={'white'}
        onPress={() =>
          signIn({
            login: 'username123',
            password: 'Password@123',
          })
        }
      >
        Войти (dev)
      </Button>
    </Screen>
  )
}
