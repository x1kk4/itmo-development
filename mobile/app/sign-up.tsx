import { useAuthContext } from '@/providers/AuthContext'
import { Link } from 'expo-router'
import { Button, TextInput, View, StyleSheet } from 'react-native'

export default function SignUp() {
  const { signUp } = useAuthContext()

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
          signUp({
            login: 'someUser',
            password: 'somePassword',
            email: 'someemail@email.com',
          })
        }
      />
      <Link href={'/'}>Зарегистриооваться</Link>
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
