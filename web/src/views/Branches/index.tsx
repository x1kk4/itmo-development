import { Box, Flex } from '@chakra-ui/react'
import { Map, Placemark, ZoomControl, YMaps } from '@pbe/react-yandex-maps'
import { FC, useCallback } from 'react'

import { useBranches } from '@/utils/hooks/useBranches'
import { useNavigate } from 'react-router-dom'
import { useParentContext } from '@/utils/contexts/ParentContext'
import { useUpdateChild } from '@/utils/hooks/useUpdateChildren'

const Branches: FC = () => {
  const navigate = useNavigate()

  const { selectedChildrenData } = useParentContext()
  const { mutate } = useUpdateChild()

  const { data: branches, isLoading } = useBranches()

  const handleBranchClick = useCallback(
    (branch: number) => () => {
      if (selectedChildrenData) {
        mutate({ ...selectedChildrenData, branch })
        navigate('/schedule')
      }
    },
    [navigate, selectedChildrenData, mutate],
  )

  if (isLoading) {
    return (
      <Flex
        border={'1px'}
        borderColor={'gray.300'}
        height={'100%'}
        borderRadius={'lg'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          textAlign={'center'}
          fontSize={24}
          fontWeight={600}
        >
          Загрузка карты...
        </Box>
      </Flex>
    )
  }

  if (!branches || branches?.length === 0) {
    return (
      <Flex
        border={'1px'}
        borderColor={'gray.300'}
        height={'100%'}
        borderRadius={'lg'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          textAlign={'center'}
          fontSize={24}
          fontWeight={600}
        >
          Карта появится после добавления хотя бы одного филиала
        </Box>
      </Flex>
    )
  }

  return (
    <Box
      height={'calc(100% - 50px)'}
      padding={4}
      border={'1px'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
    >
      <YMaps>
        <Map
          defaultState={{
            center: [59.938678, 30.314474],
            zoom: 11,
          }}
          width={'100%'}
          height={'100%'}
        >
          {branches.map((branch) => (
            <Placemark
              key={branch.id}
              geometry={branch.location.split(',')}
              properties={{
                balloonContentHeader: branch.name,
                balloonContentBody: `
                  <img style="width: 200px; margin: auto" src=${branch.image}/>
                  ${
                    selectedChildrenData?.branch === branch.id
                      ? '<p style="color: #38A169; font-weight: bold; text-align: center; margin-top: 10px;">ВАШ ФИЛИАЛ</p>'
                      : `<button style="color: #3182ce; width: 100%; margin-top: 10px; font-size: 18px; padding: 5px; background: none; border: 1px solid #3182ce; cursor: pointer; border-radius: 8px" id="branch-button-${branch.id}">Записаться</button>`
                  }
                `,
                hintContent: branch.name,
                iconCaption:
                  selectedChildrenData?.branch === branch.id
                    ? `Занимается ${selectedChildrenData?.name}`
                    : '',
              }}
              options={{
                balloonPanelMaxMapArea: 0,
                preset:
                  selectedChildrenData?.branch === branch.id
                    ? 'islands#redIcon'
                    : 'islands#blueIcon',
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              onBalloonOpen={() => {
                setTimeout(() => {
                  const button = document.getElementById(`branch-button-${branch.id}`)
                  if (button) {
                    button.addEventListener('click', handleBranchClick(branch.id))
                  }
                }, 0)
              }}
            />
          ))}
          <ZoomControl
            defaultOptions={{
              position: {
                right: 10,
                bottom: 30,
              },
            }}
          />
        </Map>
      </YMaps>
    </Box>
  )
}

export { Branches }
