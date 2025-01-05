import { useBranch } from '@/api/hooks/branches/useBranch'
import { BranchAvatar } from '@/ui/BranchAvatar'

import { Screen } from '@/ui/Screen'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { Heading, Text, View } from 'tamagui'

export default function SchoolModal() {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const { data: branch } = useBranch(Number(id))

  if (!branch) {
    return null
  }

  return (
    <Screen
      paddingVertical={'$3'}
      gap={'$6'}
    >
      <View
        flexDirection={'column'}
        alignItems={'center'}
      >
        {Platform.OS !== 'ios' && (
          <ArrowLeft
            cursor='pointer'
            alignSelf={'flex-start'}
            onPress={() => router.back()}
          />
        )}
        <BranchAvatar
          avatarSrc={branch?.photos[0] ?? ''}
          fallback={branch.name}
          size={'$12'}
        />
        <Heading>{branch.name}</Heading>
      </View>
    </Screen>
  )
}
