import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const LandingLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export { LandingLayout }
