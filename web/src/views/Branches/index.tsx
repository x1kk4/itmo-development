import { Box, Tooltip } from '@chakra-ui/react'
import { Map, Placemark, ZoomControl, YMaps } from '@pbe/react-yandex-maps'
import { FC } from 'react'
import { branches } from './branches'

const Branches: FC = () => {
  return (
    <Box>
      <YMaps>
        <Map
          defaultState={{
            center: [59.938678, 30.314474],
            zoom: 9,
          }}
          width={'900px'}
          height={'600px'}
        >
          {branches.map((branch, index) => (
            <Tooltip
              label={branch.name}
              key={index}
            >
              <Placemark
                defaultGeometry={branch.coord}
                properties={{
                  balloonContentBody:
                    '<div>Это ваш кастомный контент для тултипа/поповера</div>' +
                    '<div>Здесь может быть любая HTML-разметка</div>',
                }}
                modules={['geoObject.addon.balloon']}
              />
            </Tooltip>
          ))}
          <ZoomControl
            defaultOptions={{
              position: {
                right: 10,
                top: 150,
              },
            }}
          />
        </Map>
      </YMaps>
    </Box>
  )
}

export { Branches }
