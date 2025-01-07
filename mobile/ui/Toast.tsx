import { Toast as TamaguiToast, useToastState } from '@tamagui/toast'
import { FC } from 'react'
import { YStack } from 'tamagui'

const Toast: FC = () => {
  const currentToast = useToastState()

  // console.log(currentToast)

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <TamaguiToast
      width={'100%'}
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation='fast'
      viewportName={currentToast.viewportName}
      // borderRadius={'$2'}
    >
      <YStack>
        <TamaguiToast.Title>{currentToast.title}</TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description>{currentToast.message}</TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  )
}

export { Toast }
