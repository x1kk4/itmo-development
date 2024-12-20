import { FC, useCallback, useMemo } from 'react'
import { Flex, Icon, IconButton, Link, Text } from '@chakra-ui/react'

import { TMenuItem, parentMenu } from './menus'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { useLocalStorage } from '@uidotdev/usehooks'

type TSidebarProps = {
  menu?: TMenuItem[]
}

export const Sidebar: FC<TSidebarProps> = ({ menu = parentMenu }) => {
  const [isExpanded, setIsExpanded] = useLocalStorage<boolean>('isSidebarExpanded', false)

  const { pathname } = useLocation()

  const toggleSidebar = useCallback(() => setIsExpanded((prev) => !prev), [setIsExpanded])

  const sidebarWidth = useMemo(() => {
    return isExpanded ? '360px' : '50px'
  }, [isExpanded])

  return (
    <Flex
      flexDirection={'column'}
      width={sidebarWidth}
      h={'100vh'}
      backgroundColor={'gray.100'}
      transition={'width 0.3s ease'}
    >
      <IconButton
        aria-label={'Toggle sidebar'}
        icon={<MdMenu size={24} />}
        width={'100%'}
        borderRadius={0}
        onClick={toggleSidebar}
      />
      <Flex
        flexDirection={'column'}
        padding={'9px'}
        gap={8}
        marginTop={12}
      >
        {menu.map((item, index) => (
          <Link
            as={ReactRouterLink}
            key={index}
            to={item.url}
            _hover={{
              textDecoration: 'none',
            }}
            color={pathname === item.url ? '' : 'gray.400'}
          >
            <Flex
              alignItems={'center'}
              gap={2}
            >
              <Icon
                as={item.icon}
                boxSize={8}
              />
              <Text
                fontSize={20}
                whiteSpace='nowrap'
                overflow='hidden'
                transition='max-width 0.3s ease, opacity 0.3s ease'
                maxWidth={isExpanded ? '300px' : '0'}
                opacity={isExpanded ? 1 : 0}
              >
                {item.title}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}
