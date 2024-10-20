import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import { type Event } from 'react-big-calendar'

type TAppointmentModalProps = {
  isOpen: boolean
  onClose: () => void
  event: Event | null
}

const AppointmentModal: FC<TAppointmentModalProps> = ({ isOpen, onClose, event }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Запись на тренировку</ModalHeader>
        <ModalBody>
          {event ? (
            <>
              <p>Start: {event.start?.toLocaleString()}</p>
              <p>End: {event.end?.toLocaleString()}</p>
            </>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            onClick={onClose}
          >
            Записаться
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AppointmentModal }
