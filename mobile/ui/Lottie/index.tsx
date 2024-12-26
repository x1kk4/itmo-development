import { FC, ReactNode } from 'react'

import LottieAnimation, { LottieViewProps } from 'lottie-react-native'
import { ViewProps } from 'react-native'

type TLottieProps = LottieViewProps & { containerProps?: ViewProps } & { fallback?: ReactNode }

const Lottie: FC<TLottieProps> = (props) => {
  return <LottieAnimation {...props} />
}

export { Lottie }
