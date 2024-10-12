import { DevRolePicker } from '@/components/DevRolePicker'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const LandingLayout: FC = () => {
  return (
    <>
      <Outlet />
      <DevRolePicker />
    </>
  )
}

export { LandingLayout }
