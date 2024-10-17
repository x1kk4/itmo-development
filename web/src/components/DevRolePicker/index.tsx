import { ROLE } from '@/router/types'
import { useAuthContext } from '@/utils/contexts/AuthContext'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FC } from 'react'
import { MdPermIdentity } from 'react-icons/md'

const role = {
  [ROLE.UNAUTHORIZED]: 'Гость',
  [ROLE.PARENT]: 'Родитель',
  [ROLE.COACH]: 'Тренер',
  [ROLE.MANAGER]: 'Менеджер',
}

const DevRolePicker: FC = () => {
  const { user, changeRole } = useAuthContext()

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdPermIdentity size={20} />}
        position={'absolute'}
        bottom={4}
        right={4}
      >
        {role[user.role]}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeRole(ROLE.UNAUTHORIZED)}>{role[ROLE.UNAUTHORIZED]}</MenuItem>
        <MenuItem onClick={() => changeRole(ROLE.PARENT)}>{role[ROLE.PARENT]}</MenuItem>
        {/* <MenuItem onClick={() => changeRole(ROLE.COACH)}>Тренер</MenuItem> */}
        {/* <MenuItem onClick={() => changeRole(ROLE.MANAGER)}>Менеджер</MenuItem> */}
      </MenuList>
    </Menu>
  )
}

export { DevRolePicker }
