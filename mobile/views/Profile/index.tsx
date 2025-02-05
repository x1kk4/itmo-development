import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'

import { FC } from 'react'
import { EditAvatar } from './EditAvatar'
import { EditInfo } from './EditInfo'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const Profile: FC = () => {
  const { user, isLoading } = useAuthContext()

  if (!user) {
    return null
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={60}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Screen gap={'$6'}>
          <EditAvatar
            user={user}
            isLoading={isLoading}
          />
          <EditInfo
            user={user}
            isLoading={isLoading}
          />
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export { Profile }
