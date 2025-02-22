import { FC } from 'react'
import { Screen } from '@/ui/Screen'
import { Heading, View } from 'tamagui'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTrainingSession } from '@/api/hooks/training-sessions/useTrainingSession'
import { Platform, ScrollView } from 'react-native'
import { ArrowLeft } from '@tamagui/lucide-icons'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { LevelBadge } from '@/ui/LevelBadge'
import { BranchCard } from '@/ui/BranchCard'
import { UserCard } from '@/ui/UserCard'
import { Enrolling } from './Enrolling'
import { useAuthContext } from '@/providers/AuthContext'
import { AttendCard } from './AttendCard'

dayjs.locale('ru')

const TrainingSession: FC = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const { user } = useAuthContext()

  const { data: session } = useTrainingSession(Number(id))

  if (!session || !user) {
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
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          marginBottom={'$2'}
        >
          <Heading>Тренировка </Heading>
          <Heading color={'$accentColor'}>#{session.id}</Heading>
        </View>
        <LevelBadge
          level={session.groupLevel}
          size={'large'}
        />
        <Heading
          textAlign={'center'}
          fontSize={24}
        >
          {dayjs(session.startDate).format('HH:mm')} - {dayjs(session.endDate).format('HH:mm')}
        </Heading>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Enrolling />
        <View
          marginBottom={'$3'}
          gap={'$3'}
        >
          <View>
            <Heading fontSize={18}>Школа</Heading>
            <View gap={'$1.5'}>
              <BranchCard
                {...session.branch}
                deviceLocation={null}
              />
            </View>
          </View>
          <View>
            <Heading fontSize={18}>Тренер</Heading>
            <View gap={'$1.5'}>
              <UserCard {...session.coach} />
            </View>
          </View>
          <View>
            {session.enrolled.length ? (
              <Heading fontSize={18}>Участники</Heading>
            ) : (
              <Heading
                fontSize={18}
                textAlign={'center'}
              >
                {'Участников пока нет'}
              </Heading>
            )}

            <View gap={'$1.5'}>
              {session.enrolled.map((child) => (
                <AttendCard
                  key={child.userId}
                  {...child.user}
                  session={session}
                  user={user}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}

export { TrainingSession }
