import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { TExtendedEvent } from '.'
import { useCoach } from '@/utils/hooks/useCoach'
import { useBranch } from '@/utils/hooks/useBranch'
import { useParentContext } from '@/utils/contexts/ParentContext'
import { useTrainingSession } from '@/utils/hooks/useTrainingSession'

type TAppointmentModalProps = {
  isOpen: boolean
  onClose: () => void
  event: TExtendedEvent | null
}

const AppointmentModal: FC<TAppointmentModalProps> = ({ isOpen, onClose, event }) => {
  const { selectedChildrenData } = useParentContext()

  const { data: coachData } = useCoach(event?.coach)
  const { data: branchData } = useBranch(event?.branch)
  const { data: eventData } = useTrainingSession(event?.id)

  const isChildrenAlreadyInList: boolean = useMemo(() => {
    if (!selectedChildrenData?.id) {
      return false
    }

    if (eventData?.children_list.includes(selectedChildrenData?.id)) {
      return true
    }

    return false
  }, [eventData, selectedChildrenData])

  if (!event) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Запись на тренировку</ModalHeader>
        <ModalBody>
          {!isChildrenAlreadyInList ? (
            <>
              <Text>Ребенок: {selectedChildrenData?.name}</Text>
              <Text>Начало: {event.start?.toLocaleString('ru')}</Text>
              <Text>Конец: {event.end?.toLocaleString('ru')}</Text>
              <Text>Тренер: {coachData?.name}</Text>
              <Text>Филиал: {branchData?.name}</Text>
            </>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            onClick={onClose}
          >
            Подтвердить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AppointmentModal }
