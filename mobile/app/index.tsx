import { useSignIn } from '@/api/hooks/auth/useSignIn'
import { Link } from 'expo-router'
import { Button, StyleSheet, TextInput, View } from 'react-native'

export default function SignIn() {
  const { mutate } = useSignIn()

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Имя пользователя'
      />
      <TextInput
        style={styles.input}
        placeholder='Пароль'
      />
      <Button
        title='Войти'
        onPress={() =>
          mutate({
            login: 'username123',
            password: 'Password@123',
          })
        }
      />
      <Link href={'/sign-up'}>Зарегистриооват</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },

  input: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
  },
})
