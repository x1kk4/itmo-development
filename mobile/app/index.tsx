import { useAuthContext } from '@/providers/AuthContext'
import { Link } from 'expo-router'
import { Button, StyleSheet, TextInput, View } from 'react-native'

export default function SignIn() {
  const { signIn } = useAuthContext()

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
          signIn({
            login: 'username123',
            password: 'Password@123',
          })
        }
      />
      <Link href={'/sign-up'}>Зарегистриооваться</Link>
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
