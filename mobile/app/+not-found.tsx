import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { View, Text } from 'tamagui'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text>Такого экрана не существует...</Text>
        <Link
          href='/'
          style={styles.link}
        >
          <Text>На главную</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
