import { FC, useCallback, useRef, useState } from 'react'
import * as Clipboard from 'expo-clipboard'
import * as Linking from 'expo-linking'
import { Button, Card, View, Text } from 'tamagui'
import { Copy, Mail as MailIcon, AtSign, Check } from '@tamagui/lucide-icons'
import { useThemeContext } from '@/providers/ThemeContext'

type TEmailProps = {
  email: string
}

const Email: FC<TEmailProps> = ({ email }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  const { theme } = useThemeContext()

  const timerRef = useRef<NodeJS.Timeout>()

  const handleCopyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(email)
    setHasCopied(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }

    timerRef.current = setTimeout(() => {
      setHasCopied(false)
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }, 2000)
  }, [email, timerRef])

  const handleMail = useCallback(() => {
    Linking.openURL(`mailto:${email}`)
  }, [email])

  return (
    <Card
      padding={'$3'}
      flexDirection={'column'}
      gap={'$2'}
    >
      <View
        flexDirection={'row'}
        gap={'$2'}
        alignItems={'center'}
      >
        <AtSign />
        <Text fontSize={18}>{email}</Text>
      </View>
      <View
        flexDirection={'row'}
        gap={'$2'}
        alignSelf={'flex-end'}
      >
        <Button onPress={handleCopyToClipboard}>
          {hasCopied ? (
            <Check color={theme === 'light' ? '$green10Light' : '$green10Dark'} />
          ) : (
            <Copy />
          )}
        </Button>

        <Button
          cursor={'pointer'}
          onPress={handleMail}
        >
          <MailIcon />
        </Button>
      </View>
    </Card>
  )
}

export { Email }
