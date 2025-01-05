import { TBranch } from '@/api/types'
import { FC } from 'react'
import { Card, Text, View } from 'tamagui'
import { ArrowRight } from '@tamagui/lucide-icons'
import { BranchAvatar } from '../BranchAvatar'
import { router } from 'expo-router'

type TBranchCardProps = TBranch

const BranchCard: FC<TBranchCardProps> = ({
  id,
  name,
  workingStart,
  workingEnd,
  contactPhone,
  contactEmail,
  photos,
}) => {
  return (
    <Card
      flexDirection={'row'}
      padding={'$2.5'}
      justifyContent={'space-between'}
      alignItems={'center'}
      cursor={'pointer'}
      onPress={() => router.push(`/home/schools/${id}`)}
    >
      <View
        flexDirection={'row'}
        alignItems={'flex-start'}
        gap={'$3'}
      >
        <BranchAvatar
          avatarSrc={photos[0] ?? ''}
          fallback={name}
        />
        <View>
          <Text
            fontSize={18}
            fontWeight={600}
          >
            {name}
          </Text>

          <Text
            fontSize={16}
            fontWeight={400}
            marginBottom={'$2'}
          >
            {workingStart}-{workingEnd}
          </Text>
          <Text
            fontSize={14}
            fontWeight={400}
          >
            {contactPhone}
          </Text>
          <Text
            fontSize={12}
            fontWeight={400}
          >
            {contactEmail}
          </Text>
        </View>
      </View>

      <ArrowRight />
    </Card>
  )
}

export { BranchCard }
