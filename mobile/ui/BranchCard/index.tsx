import { TBranch } from '@/api/types'
import { FC, useMemo } from 'react'
import { Card, Text, View } from 'tamagui'
import { ArrowRight } from '@tamagui/lucide-icons'
import { BranchAvatar } from '../BranchAvatar'
import { router } from 'expo-router'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import { prettifyDistance } from '@/utils/geo'

type TBranchCardProps = TBranch & {
  deviceLocation: Location.LocationObject | null
}

const BranchCard: FC<TBranchCardProps> = ({
  id,
  name,
  workingStart,
  workingEnd,
  contactPhone,
  contactEmail,
  photos,
  location,
  deviceLocation,
}) => {
  const distance = useMemo(() => {
    if (deviceLocation) {
      return (
        <Text
          fontSize={14}
          fontWeight={500}
          marginTop={'$3'}
        >
          {prettifyDistance(
            getDistance(
              { latitude: location.split(', ')[0], longitude: location.split(', ')[1] },
              {
                latitude: deviceLocation?.coords.latitude,
                longitude: deviceLocation.coords.longitude,
              },
            ),
          )}
        </Text>
      )
    }

    return null
  }, [location, deviceLocation])

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
          avatarSrc={photos[0] ?? undefined}
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

          {distance}
        </View>
      </View>

      <ArrowRight />
    </Card>
  )
}

export { BranchCard }
