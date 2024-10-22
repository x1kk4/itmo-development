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
import { FC, useCallback, useMemo } from 'react'
import { TExtendedEvent } from '.'
import { useCoach } from '@/utils/hooks/useCoach'
import { useBranch } from '@/utils/hooks/useBranch'
import { useParentContext } from '@/utils/contexts/ParentContext'
import { useTrainingSession } from '@/utils/hooks/useTrainingSession'
import { useUpdateTrainingSession } from '@/utils/hooks/useUpdaateTrainingSession'

type TAppointmentModalProps = {
  isOpen: boolean
  onClose: () => void
  event: TExtendedEvent | null
}

const AppointmentModal: FC<TAppointmentModalProps> = ({ isOpen, onClose, event }) => {
  const { selectedChildrenData } = useParentContext()

  const { data: coachData, isLoading: isCoachLoading } = useCoach(event?.coach)
  const { data: branchData, isLoading: isBranchLoading } = useBranch(event?.branch)
  const { data: eventData, isLoading: isEventLoading } = useTrainingSession(event?.id)

  const { mutate: updateTrainingSession } = useUpdateTrainingSession()

  const isChildrenAlreadyInList: boolean = useMemo(() => {
    if (!selectedChildrenData?.id) {
      return false
    }

    if (eventData?.children_list.includes(selectedChildrenData?.id)) {
      return true
    }

    return false
  }, [eventData, selectedChildrenData])

  const handleSubscribe = useCallback(() => {
    if (!eventData || !selectedChildrenData) {
      return
    }

    updateTrainingSession({
      id: eventData?.id,
      data: { children_list: [...eventData.children_list, selectedChildrenData.id] },
    })

    onClose()
  }, [eventData, selectedChildrenData, updateTrainingSession, onClose])

  const handleUnsubscribe = useCallback(() => {
    if (!eventData || !selectedChildrenData) {
      return
    }

    updateTrainingSession({
      id: eventData?.id,
      data: {
        children_list: eventData.children_list.filter((item) => item !== selectedChildrenData.id),
      },
    })

    onClose()
  }, [eventData, selectedChildrenData, updateTrainingSession, onClose])

  if (!event || isBranchLoading || isCoachLoading || isEventLoading) {
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
          ) : (
            `${selectedChildrenData?.name} уже записан на эту тренировку.`
          )}
        </ModalBody>
        <ModalFooter>
          {!isChildrenAlreadyInList ? (
            <Button
              colorScheme='blue'
              onClick={handleSubscribe}
            >
              Подтвердить
            </Button>
          ) : (
            <Button
              colorScheme='red'
              onClick={handleUnsubscribe}
            >
              Отменить запись
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AppointmentModal }
