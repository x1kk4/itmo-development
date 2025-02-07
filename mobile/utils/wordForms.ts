export const getSessionForm = (numberOfEvents: number) => {
  if (numberOfEvents.toString().endsWith('1')) {
    return 'занятие'
  }

  if (
    numberOfEvents.toString().endsWith('2') ||
    numberOfEvents.toString().endsWith('3') ||
    numberOfEvents.toString().endsWith('4')
  ) {
    return 'занятия'
  }

  return 'занятий'
}

export const getEnrolledForm = (numberOfEnrolled: number) => {
  if (numberOfEnrolled.toString().endsWith('1')) {
    return 'участник'
  }

  if (
    numberOfEnrolled.toString().endsWith('2') ||
    numberOfEnrolled.toString().endsWith('3') ||
    numberOfEnrolled.toString().endsWith('4')
  ) {
    return 'участника'
  }

  return 'участников'
}
