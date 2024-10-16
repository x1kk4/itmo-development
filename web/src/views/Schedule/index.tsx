import { FC, useMemo, useState } from 'react'
import { Calendar, dayjsLocalizer, type Formats, type Event } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Box, useDisclosure } from '@chakra-ui/react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './schedule.module.css'
import { events } from './events'
import { AppointmentModal } from './AppointmentModal'

const localizer = dayjsLocalizer(dayjs)

const Schedule: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const formats: Formats = useMemo(
    () => ({
      dateFormat: 'ddd',

      dayFormat: (date) => localizer.format(date, 'DD ddd', 'ru'),

      // dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      //   localizer.format(start, { date: 'short' }, culture) +
      //   ' — ' +
      //   localizer.format(end, { date: 'short' }, culture),
    }),
    [],
  )

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    onOpen()
  }

  return (
    <Box
      height={'calc(100% - 50px)'}
      maxH={'calc(100% - 50px)'}
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
        defaultView='week'
        className={styles.calendar}
        views={['week', 'month']}
        events={events}
        onSelectEvent={handleEventClick}
        step={20}
        formats={formats}
      />
      <AppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        event={selectedEvent}
      />
    </Box>
  )
}

export { Schedule }
