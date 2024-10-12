import { Sidebar } from '@/components/Sidebar'
import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ParentLayout: FC = () => {
  return (
    <>
      <Sidebar />
      <Box padding={4}>
        <Outlet />
      </Box>
    </>
  )
}

export { ParentLayout }
