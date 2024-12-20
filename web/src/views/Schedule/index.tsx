import { FC, useMemo, useState } from 'react'
import { Calendar, dayjsLocalizer, type Formats, type Event } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { Box, Card, useDisclosure } from '@chakra-ui/react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './schedule.module.css'
import { AppointmentModal } from './AppointmentModal'
import { useTrainingSessions } from '@/utils/hooks/useTrainingSessions'
import { convertToEventTime } from '@/helpers/convertToEventTime'
import { useParentContext } from '@/utils/contexts/ParentContext'
import { TGroupLevel, groupLevel } from '@/utils/contexts/ParentContext/types'

export type TExtendedEvent = Event & {
  id: number
  level: TGroupLevel
  coach: number
  branch: number
  timeSlot: string
}

dayjs.locale('ru')

const localizer = dayjsLocalizer(dayjs)

const Schedule: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedEvent, setSelectedEvent] = useState<TExtendedEvent | null>(null)

  const { selectedChildrenData } = useParentContext()

  const { data: eventsData, isLoading } = useTrainingSessions()

  const events: TExtendedEvent[] = useMemo(() => {
    if (!eventsData) {
      return []
    }

    return eventsData
      ?.filter((event) => event.branch === selectedChildrenData?.branch)
      .filter((event) => event.group_level === selectedChildrenData?.group_level)
      .map((event) => ({
        id: event.id,
        start: convertToEventTime(event.date, event.start_time),
        end: convertToEventTime(event.date, event.end_time),
        level: event.group_level,
        coach: event.coach,
        branch: event.branch,
        date: event.date,
        timeSlot: `${event.start_time} - ${event.end_time}`,
      }))
  }, [eventsData, selectedChildrenData])

  const formats: Formats = useMemo(
    () => ({
      dateFormat: 'ddd',
      dayFormat: (date) => localizer.format(date, 'DD ddd', 'ru'),
      weekdayFormat: (date) => dayjs(date).format('dd'),
      timeGutterFormat: (date) => localizer.format(date, 'HH:mm'),
      eventTimeRangeFormat: ({ start, end }) =>
        `${localizer.format(start, 'HH:mm')} - ${localizer.format(end, 'HH:mm')}`,
    }),
    [],
  )

  const handleEventClick = (event: TExtendedEvent) => {
    setSelectedEvent(event)
    onOpen()
  }

  const eventPropGetter = (event: TExtendedEvent) => {
    let color = '#4299e1'

    if (event.level === 'Beginner') {
      color = '#48BB78'
    } else if (event.level === 'Intermediate') {
      color = '#ECC94B'
    } else if (event.level === 'Advanced') {
      color = '#F56565'
    }

    return { style: { backgroundColor: color } }
  }

  if (isLoading) {
    return (
      <Card
        height={'calc(100% - 50px)'}
        borderRadius={'lg'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          textAlign={'center'}
          fontSize={24}
          fontWeight={600}
        >
          Загрузка расписания...
        </Box>
      </Card>
    )
  }

  return (
    <Card
      height={'calc(100% - 50px)'}
      maxH={'calc(100% - 50px)'}
      padding={4}
      borderRadius={'lg'}
    >
      <Calendar
        titleAccessor={(event) => groupLevel[event.level]}
        localizer={localizer}
        defaultDate={new Date()}
        startAccessor='start'
        endAccessor='end'
        defaultView='week'
        className={styles.calendar}
        views={['week']}
        events={events}
        onSelectEvent={handleEventClick}
        step={20}
        formats={formats}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        eventPropGetter={eventPropGetter}
      />
      <AppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        event={selectedEvent}
      />
    </Card>
  )
}

export { Schedule }
