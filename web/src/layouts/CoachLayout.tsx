import { DevRolePicker } from '@/components/DevRolePicker'
import { Sidebar } from '@/components/Sidebar'
import { coachMenu } from '@/components/Sidebar/menus'
import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const CoachLayout: FC = () => {
  return (
    <>
      <Sidebar menu={coachMenu} />
      <Box padding={4}>
        <Outlet />
      </Box>
      <DevRolePicker />
    </>
  )
}

export { CoachLayout }
