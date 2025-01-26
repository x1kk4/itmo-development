import { useAuthContext } from '@/providers/AuthContext'
import { Screen } from '@/ui/Screen'

import * as ImagePicker from 'expo-image-picker'
import { CameraType } from 'expo-image-picker'
import { Button, Heading, View, Text } from 'tamagui'
import { UserAvatar } from '@/ui/UserAvatar'
import { Camera, ImageUp } from '@tamagui/lucide-icons'
import { useEditAvatar } from '@/api/hooks/auth/useEditAvatar'

export default function ProfileScreen() {
  const { user, isLoading } = useAuthContext()

  const { mutate: changeAvatar, isPending } = useEditAvatar()

  const takePhoto = async () => {
    console.log('photo...')
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      cameraType: CameraType.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result)

    if (!result.canceled) {
      changeAvatar({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType ?? '',
        name: 'shit',
      })
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result)

    if (!result.canceled) {
      changeAvatar({
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType ?? '',
        name: 'shit',
      })
    }
  }

  if (!user) {
    return null
  }

  return (
    <Screen>
      <View>
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Button
            aspectRatio={1}
            height={'$5'}
            icon={<Camera size={'$1.5'} />}
            onPress={takePhoto}
          />
          <View opacity={isPending || isLoading ? 0.2 : 1}>
            <UserAvatar
              avatarSrc={user.profilePicture}
              fallback={user.login}
              size={'$12'}
            />
          </View>
          <Button
            aspectRatio={1}
            height={'$5'}
            icon={<ImageUp size={'$1.5'} />}
            onPress={pickImage}
          />
        </View>
        <Heading textAlign={'center'}>{user.login}</Heading>
        <Text
          color={'$accentColor'}
          textAlign={'center'}
        >
          #{user.id}
        </Text>
      </View>
    </Screen>
  )
}
