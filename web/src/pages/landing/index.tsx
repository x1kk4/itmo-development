import { routes } from '@/router/routes'
import { Button, Flex, Highlight, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const LandingPage: FC = () => {
  return (
    <Flex flexDirection={'column'}>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        px={4}
      >
        <Image
          src={
            'https://static3.tildacdn.com/tild6330-3530-4466-a133-316438613132/svg_1710838252904.svg'
          }
          h={'80px'}
        />
        <Text
          fontSize={64}
          fontStyle={'italic'}
          fontWeight={500}
        >
          НЕВСКИЕ МЕДВЕДИ
        </Text>
        <Flex gap={2}>
          <Link to={routes['sign-in']}>
            <Button colorScheme='blue'>Вход</Button>
          </Link>
          <Link to={routes['sign-up']}>
            <Button colorScheme='blue'>Регистрация</Button>
          </Link>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'column'}
        margin={'auto 200px'}
        gap={'64px'}
      >
        <Text
          alignSelf={'end'}
          fontSize={32}
          fontWeight={500}
          maxWidth={'500px'}
        >
          <Highlight
            query={['присоединиться к лучшим атлетам']}
            styles={{ color: 'blue.500' }}
          >
            Ищешь для себя секцию волейбола и хочешь присоединиться к лучшим атлетам Питера?
          </Highlight>
        </Text>

        <Text
          alignSelf={'start'}
          fontSize={48}
          fontWeight={600}
          maxWidth={'600px'}
        >
          <Highlight
            query={['ВОЛЕЙБОЛА']}
            styles={{ color: 'blue.500' }}
          >
            ШКОЛА ВОЛЕЙБОЛА ДЛЯ ДЕТЕЙ ОТ 9 до 17 ЛЕТ
          </Highlight>
        </Text>
      </Flex>
    </Flex>
  )
}

export { LandingPage }
