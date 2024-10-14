import { FC } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box } from '@chakra-ui/react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dayjsLocalizer(dayjs)

const Schedule: FC = () => {
  return (
    <Box
      height={'calc(100% - 50px)'}
      padding={4}
      border={'1px'}
      borderColor={'gray.300'}
      borderRadius={'lg'}
    >
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        startAccessor='start'
        endAccessor='end'
        style={{ maxHeight: '840px' }}
        defaultView='week'
      />
    </Box>
  )
}

export { Schedule }
