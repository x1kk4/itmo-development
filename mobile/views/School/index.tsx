import { useBranch } from '@/api/hooks/branches/useBranch'
import * as Linking from 'expo-linking'
import { Screen } from '@/ui/Screen'
import { ArrowLeft, SquareArrowOutUpRight } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, Platform, ScrollView } from 'react-native'
import { Heading, View, Text, XGroup, Button } from 'tamagui'
import { Image } from 'expo-image'

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { FC, useCallback, useMemo, useRef } from 'react'
import { Email } from '@/ui/Email'
import { Phone } from '@/ui/Phone'
import { Telegram } from '@/ui/Telegram'
import { Binding } from './Binding'
import { useBranchStaff } from '@/api/hooks/branches/useBranchStaff'
import { UserCard } from '@/ui/UserCard'

const width = Dimensions.get('window').width

// const blurhash =
// '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const School: FC = () => {
  const { id } = useLocalSearchParams()

  const router = useRouter()

  const { data: branch } = useBranch(Number(id))

  const { data: staff } = useBranchStaff(Number(id))

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
          <Text fontSize={18}>Нет изображений</Text>
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

  const handleNavigate = useCallback((link: string) => {
    Linking.openURL(link)
  }, [])

  if (!branch) {
    return null
  }

  return (
    <Screen
      paddingVertical={Platform.OS === 'ios' ? 0 : '$3'}
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
            marginBottom={'$3'}
          />
        )}

        {imageSet}

        <Heading marginTop={'$3'}>{branch.name}</Heading>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Binding />

        {(branch.yaMapsLink || branch.twogisLink || branch.gMapsLink) && (
          <View marginBottom={'$3'}>
            <Heading fontSize={18}>Карты</Heading>
            <XGroup>
              {branch.yaMapsLink && branch.yaMapsLink.startsWith('https') && (
                <XGroup.Item>
                  <Button
                    flex={1}
                    onPress={() => handleNavigate(branch.yaMapsLink as string)}
                  >
                    YaMaps
                    <SquareArrowOutUpRight size={14} />
                  </Button>
                </XGroup.Item>
              )}

              {branch.twogisLink && branch.twogisLink.startsWith('https') && (
                <XGroup.Item>
                  <Button
                    flex={1}
                    onPress={() => handleNavigate(branch.twogisLink as string)}
                  >
                    2GIS
                    <SquareArrowOutUpRight size={14} />
                  </Button>
                </XGroup.Item>
              )}

              {branch.gMapsLink && branch.gMapsLink.startsWith('https') && (
                <XGroup.Item>
                  <Button
                    flex={1}
                    onPress={() => handleNavigate(branch.gMapsLink as string)}
                  >
                    GMaps
                    <SquareArrowOutUpRight size={14} />
                  </Button>
                </XGroup.Item>
              )}
            </XGroup>
          </View>
        )}
        <View marginBottom={'$3'}>
          <Heading fontSize={18}>Контакты</Heading>
          <View gap={'$2'}>
            <Phone phone={branch.contactPhone} />
            {branch.contactTelegram && <Telegram telegram={branch.contactTelegram} />}
            <Email email={branch.contactEmail} />
          </View>
        </View>
        {staff && staff.length !== 0 && (
          <View marginBottom={'$3'}>
            <Heading fontSize={18}>Персонал</Heading>
            <View gap={'$1.5'}>
              {staff.map((person) => (
                <UserCard
                  key={person.id}
                  {...person}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  )
}

export { School }
