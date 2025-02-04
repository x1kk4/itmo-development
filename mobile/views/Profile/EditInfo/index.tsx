import { TUser } from '@/api/types'
import { FC, useCallback, useState } from 'react'
import { Button, View } from 'tamagui'
import { InputWithLabel } from './InputWithLabel'
import { TEditProfileRequest } from '@/api'
import { useEditProfile } from '@/api/hooks/auth/useEditProfile'
import { produce } from 'immer'

type TEditInfoProps = {
  user: TUser
  isLoading: boolean
}

type RequiredNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

const EditInfo: FC<TEditInfoProps> = ({ user, isLoading }) => {
  const [data, setData] = useState<RequiredNonNullable<TEditProfileRequest>>({
    firstname: user.firstname ?? '',
    surname: user.surname ?? '',
    middlename: user.middlename ?? '',
    phone: user.phone ?? '',
    telegram: user.telegram ?? '',
  })

  const { mutate: updateProfile } = useEditProfile()

  const handleSubmit = useCallback(
    (data: RequiredNonNullable<TEditProfileRequest>) => {
      const finalData: TEditProfileRequest = {}

      let key: keyof typeof data

      for (key in data) {
        if (data[key] !== '') {
          finalData[key] = data[key]
        }
      }

      updateProfile(finalData)
    },
    [updateProfile],
  )

  return (
    <View
      gap={'$3'}
      paddingBottom={'$4'}
    >
      <InputWithLabel
        label={'Фамилия'}
        placeholder={'Иванов'}
        value={data.surname}
        onChange={(v) => {
          setData(
            produce((draft) => {
              draft.surname = v
            }),
          )
        }}
      />

      <InputWithLabel
        label={'Имя'}
        placeholder={'Иван'}
        value={data.firstname}
        onChange={(v) => {
          setData(
            produce((draft) => {
              draft.firstname = v
            }),
          )
        }}
      />

      <InputWithLabel
        label={'Отчество'}
        placeholder={'Иванович'}
        value={data.middlename}
        onChange={(v) => {
          setData(
            produce((draft) => {
              draft.middlename = v
            }),
          )
        }}
      />

      <InputWithLabel
        label={'Телефон'}
        placeholder={'+79999999999'}
        value={data.phone}
        onChange={(v) => {
          setData(
            produce((draft) => {
              draft.phone = v
            }),
          )
        }}
      />

      <InputWithLabel
        label={'Telegram'}
        placeholder={'@gregjs'}
        value={data.telegram}
        onChange={(v) => {
          setData(
            produce((draft) => {
              draft.telegram = v
            }),
          )
        }}
      />

      <Button
        marginTop={'$3'}
        onPress={() => handleSubmit(data)}
      >
        Отправить
      </Button>
    </View>
  )
}

export { EditInfo }
