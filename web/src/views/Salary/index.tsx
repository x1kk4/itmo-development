import { useCoachContext } from '@/utils/contexts/CoachContext'
import { FC } from 'react'

const Salary: FC = () => {
  const { coachData } = useCoachContext()

  return (
    <>
      <p>Ваша зарплата: {coachData?.salary} рублей.</p>
    </>
  )
}

export { Salary }
