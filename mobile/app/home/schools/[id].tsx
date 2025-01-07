import { useBranch } from '@/api/hooks/branches/useBranch'

import { Screen } from '@/ui/Screen'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, Platform } from 'react-native'
import { Heading, View, Text } from 'tamagui'
import { Image } from 'expo-image'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { useMemo, useRef } from 'react'

const width = Dimensions.get('window').width

// const blurhash =
// '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export default function SchoolModal() {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const { data: branch } = useBranch(Number(id))

  const ref = useRef<ICarouselInstance>(null)

  const imageSet = useMemo(() => {
    if (!branch) {
      return null
    }

    if (branch.photos.length === 0) {
      return (
        <View
          width={width}
          height={width / 2}
          alignItems={'center'}
          justifyContent={'center'}
          borderWidth={'$1'}
          borderColor={'$accentColor'}
          borderTopEndRadius={Platform.OS === 'ios' ? 10 : 0}
          borderTopStartRadius={Platform.OS === 'ios' ? 10 : 0}
        >
          <Text>Нет изображений</Text>
        </View>
      )
    }

    if (Platform.OS === 'web' || branch.photos.length < 2) {
      return (
        <View
          width={width}
          height={width / 2}
        >
          <Image
            source={branch.photos[0]}
            style={{
              width: '100%',
              height: '100%',
            }}
            // placeholder={{ blurhash }}
            contentFit='cover'
            transition={500}
          />
        </View>
      )
    }

    return (
      <View
        width={width}
        height={width / 2}
      >
        <Carousel
          ref={ref}
          width={width}
          height={width / 2}
          data={branch.photos ?? []}
          autoPlay
          autoPlayInterval={4000}
          loop={branch.photos.length >= 2 ?? false}
          renderItem={({ item }) => (
            <View
              height={'100%'}
              width={'100%'}
            >
              <Image
                source={item}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                // placeholder={{ blurhash }}
                contentFit='cover'
                transition={500}
              />
            </View>
          )}
        />
      </View>
    )
  }, [branch])

  if (!branch) {
    return null
  }

  return (
    <Screen
      paddingVertical={Platform.OS === 'ios' ? 0 : '$3'}
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
            marginBottom={'$3'}
          />
        )}

        {imageSet}

        <Heading>{branch.name}</Heading>
      </View>
    </Screen>
  )
}
