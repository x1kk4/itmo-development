import { Box } from '@chakra-ui/react'
import { Map, Placemark, ZoomControl, YMaps } from '@pbe/react-yandex-maps'
import { FC, useCallback } from 'react'
import { branches } from './branches'
import { useAuthContext } from '@/utils/AuthContext'

const Branches: FC = () => {
  const { setBranch, user } = useAuthContext()

  const handleBranchClick = useCallback(
    (branch: number) => () => {
      setBranch(branch)
    },
    [setBranch],
  )

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
          {branches.map((branch, index) => (
            <Placemark
              key={index}
              geometry={branch.coord}
              properties={{
                balloonContentHeader: branch.name,
                balloonContentBody: `
                  <img style="width: 200px; margin: auto" src=${branch.image}/>
                  ${
                    user.branch === index
                      ? '<p style="color: #38A169; font-weight: bold; text-align: center; margin-top: 10px;">ВАШ ФИЛИАЛ</p>'
                      : `<button style="color: #3182ce; width: 100%; margin-top: 10px; font-size: 18px; padding: 5px; background: none; border: 1px solid #3182ce; cursor: pointer; border-radius: 8px" id="branch-button-${index}">Записаться</button>`
                  }
                `,
                hintContent: branch.name,
              }}
              options={{
                balloonPanelMaxMapArea: 0,
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              onBalloonOpen={() => {
                setTimeout(() => {
                  const button = document.getElementById(`branch-button-${index}`)
                  if (button) {
                    button.addEventListener('click', handleBranchClick(index))
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
