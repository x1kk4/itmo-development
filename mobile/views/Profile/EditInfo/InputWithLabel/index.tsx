import { FC } from 'react'
import { Input, View, Text } from 'tamagui'

type TInputWithLabelProps = {
  value: string
  onChange: (text: string) => void
  label: string
  placeholder: string
}

const InputWithLabel: FC<TInputWithLabelProps> = ({ value, onChange, label, placeholder }) => {
  return (
    <View gap={'$1'}>
      <Text
        fontSize={16}
        fontWeight={600}
      >
        {label}
      </Text>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  )
}

export { InputWithLabel }
