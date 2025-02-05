import { TSignInRequest } from '@/api'
import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { produce } from 'immer'

import { Button, Image, Input, View, XGroup, Text } from 'tamagui'

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

      <View marginTop={'$3'}>
        <Text
          textAlign='center'
          color={'red'}
        >
          dev only sign-in by role
        </Text>
        <XGroup>
          <XGroup.Item>
            <Button
              flex={1}
              color={'white'}
              onPress={() =>
                signIn({
                  login: 'child_test',
                  password: '12341234',
                })
              }
            >
              Ch
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button
              flex={1}
              color={'white'}
              onPress={() =>
                signIn({
                  login: 'parent_test',
                  password: '12341234',
                })
              }
            >
              Pa
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button
              flex={1}
              color={'white'}
              onPress={() =>
                signIn({
                  login: 'coach_test',
                  password: '12341234',
                })
              }
            >
              Co
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button
              flex={1}
              color={'white'}
              onPress={() =>
                signIn({
                  login: 'manager_test',
                  password: '12341234',
                })
              }
            >
              Ma
            </Button>
          </XGroup.Item>
          <XGroup.Item>
            <Button
              flex={1}
              color={'white'}
              onPress={() =>
                signIn({
                  login: 'super_test',
                  password: '12341234',
                })
              }
            >
              Su
            </Button>
          </XGroup.Item>
        </XGroup>
      </View>
    </Screen>
  )
}
