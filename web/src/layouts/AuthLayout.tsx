import { DevRolePicker } from '@/components/DevRolePicker'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: FC = () => {
  return (
    <>
      <Outlet />
      <DevRolePicker />
    </>
  )
}

export { AuthLayout }
