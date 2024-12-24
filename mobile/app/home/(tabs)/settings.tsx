import { useThemeContext } from '@/providers/ThemeContext'
import { Screen } from '@/ui/Screen'
import { Computer, Moon, Sun } from '@tamagui/lucide-icons'
import { Group, Button, XGroup, Text } from 'tamagui'

export default function SettingsScreen() {
  const { theme, setTheme, isSystem } = useThemeContext()

  return (
    <Screen gap={'$2'}>
      <Text>Тема оформления</Text>
      <XGroup>
        <Group.Item>
          <Button
            flex={1}
            backgroundColor={theme === 'light' && !isSystem ? '$backgroundFocus' : 'unset'}
            onPress={() => {
              setTheme('light')
            }}
            iconAfter={<Sun size={'$1'} />}
          >
            День
          </Button>
        </Group.Item>
        <Group.Item>
          <Button
            flex={1}
            backgroundColor={theme === 'dark' && !isSystem ? '$backgroundFocus' : 'unset'}
            onPress={() => {
              setTheme('dark')
            }}
            iconAfter={<Moon size={'$1'} />}
          >
            Ночь
          </Button>
        </Group.Item>
        <Group.Item>
          <Button
            flex={1}
            backgroundColor={isSystem ? '$backgroundFocus' : 'unset'}
            onPress={() => {
              setTheme('system')
            }}
            iconAfter={<Computer size={'$1'} />}
          >
            Система
          </Button>
        </Group.Item>
      </XGroup>
    </Screen>
  )
}
