import { Copy, Check, Send, SendHorizontal } from '@tamagui/lucide-icons'
import { FC, useCallback, useRef, useState } from 'react'
import { Button, Card, Text, View } from 'tamagui'
import * as Clipboard from 'expo-clipboard'
import * as Linking from 'expo-linking'
import { useThemeContext } from '@/providers/ThemeContext'

type TTelegramProps = {
  telegram: string
}

const Telegram: FC<TTelegramProps> = ({ telegram }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  const { theme } = useThemeContext()

  const timerRef = useRef<NodeJS.Timeout>()

  const handleCopyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(telegram)
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
  }, [telegram, timerRef])

  const handleChat = useCallback(() => {
    Linking.openURL(`tg://resolve?domain=${telegram}`)
  }, [telegram])

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
        <Send />
        <Text fontSize={18}>{telegram}</Text>
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
          onPress={handleChat}
        >
          <SendHorizontal />
        </Button>
      </View>
    </Card>
  )
}

export { Telegram }
