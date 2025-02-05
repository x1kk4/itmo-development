import { useUser } from '@/api/hooks/users/useUser'
import { RoleBadge } from '@/ui/RoleBadge'
import { UserAvatar } from '@/ui/UserAvatar'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FC } from 'react'
import { Platform, ScrollView } from 'react-native'
import { Heading, View } from 'tamagui'
import { Screen } from '@/ui/Screen'
import { Phone } from '@/ui/Phone'
import { Email } from '@/ui/Email'
import { Telegram } from '@/ui/Telegram'
import { useChildren } from '@/api/hooks/users/useChildren'
import { UserCard } from '@/ui/UserCard'
import { useParents } from '@/api/hooks/users/useParents'
import { ROLE } from '@/api/types'
import { useUserBranches } from '@/api/hooks/users/useUserBranches'
import { BranchCard } from '@/ui/BranchCard'

const User: FC = () => {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const { data: user } = useUser(Number(id))
  const { data: children } = useChildren(Number(id), Boolean(user && user.role !== ROLE.CHILDREN))
  const { data: parents } = useParents(Number(id), Boolean(user && user.role === ROLE.CHILDREN))
  const { data: branches } = useUserBranches(Number(id), Boolean(user && user.role !== ROLE.PARENT))

  if (!user) {
    return null
  }

  return (
    <Screen
      paddingTop={'$3'}
      gap={'$3'}
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
        <UserAvatar
          avatarSrc={user.profilePicture}
          fallback={user.login}
          size={'$10'}
        />
        <Heading>{user.login}</Heading>
        {(user.surname || user.firstname || user.middlename) && (
          <Heading
            fontSize={20}
            lineHeight={20}
            marginTop={'$3'}
            marginBottom={'$2'}
            textAlign={'center'}
          >
            {user.surname ?? ''} {user.firstname ?? ''} {user.middlename ?? ''}
          </Heading>
        )}
        <RoleBadge
          role={user.role}
          size='large'
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginBottom={'$3'}>
          <View>
            <Heading fontSize={18}>Контакты</Heading>
            <View gap={'$1.5'}>
              {user.phone && <Phone phone={user.phone} />}
              {user.telegram && <Telegram telegram={user.telegram} />}
              <Email email={user.email} />
            </View>
          </View>
          {children && children.length !== 0 && (
            <View marginTop={'$3'}>
              <Heading fontSize={18}>Дети</Heading>
              <View gap={'$1.5'}>
                {children.map((child) => (
                  <UserCard
                    key={child.id}
                    {...child}
                  />
                ))}
              </View>
            </View>
          )}
          {parents && parents.length !== 0 && (
            <View marginTop={'$3'}>
              <Heading fontSize={18}>Родители</Heading>
              <View gap={'$1.5'}>
                {parents.map((parent) => (
                  <UserCard
                    key={parent.id}
                    {...parent}
                  />
                ))}
              </View>
            </View>
          )}
          {branches && branches.length !== 0 && (
            <View marginTop={'$3'}>
              <Heading fontSize={18}>Школы</Heading>
              <View gap={'$1.5'}>
                {branches.map((branch) => (
                  <BranchCard
                    key={branch.id}
                    {...branch}
                    deviceLocation={null}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  )
}

export { User }
