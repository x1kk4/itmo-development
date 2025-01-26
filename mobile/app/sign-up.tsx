import { useAuthContext } from '@/providers/AuthContext'
import { useRouter } from 'expo-router'
import { Button, Input, Image } from 'tamagui'
import { Screen } from '@/ui/Screen'
import { TSignUpByInviteRequest } from '@/api'
import { useCallback, useState } from 'react'
import { produce } from 'immer'
import { useSignUpByInvite } from '@/api/hooks/auth/useSignUpByInvite'

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVJZCI6MjIsImludml0ZXJJZCI6MSwicm9sZSI6IkNISUxEUkVOIiwiaWF0IjoxNzM3ODY2NjcxLCJleHAiOjE3Mzc4Njg0NzF9.5-3D04l_OQxs-hP0IFaaLJQYjxXOT7QwQOFk5x-8JHE

export default function SignUp() {
  const { signUp } = useAuthContext()
  const { mutate: signUpByInvite } = useSignUpByInvite()

  const [data, setData] = useState<TSignUpByInviteRequest>({
    login: '',
    email: '',
    password: '',
    code: '',
  })

  const router = useRouter()

  const handleSubmit = useCallback(() => {
    if (data.code === '') {
      signUp({ email: data.email, login: data.login, password: data.password })
      return
    }

    signUpByInvite(data)
  }, [data, signUp, signUpByInvite])

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
      <Input
        placeholder='Ваш код приглашения (при наличии)'
        value={data.code}
        onChangeText={(text) =>
          setData(
            produce((draft) => {
              draft.code = text
            }),
          )
        }
      />

      <Button
        marginTop='$5'
        theme={'accent'}
        color={'white'}
        onPress={handleSubmit}
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
