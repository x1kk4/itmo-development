import { routes } from '@/router/routes'
import { ElementType } from 'react'
import { MdAttachMoney, MdDashboard, MdMap, MdSchedule, MdWeb } from 'react-icons/md'

type TMenuItem = {
  title: string
  url: string
  icon: ElementType
}

const parentMenu: TMenuItem[] = [
  {
    title: 'Главная',
    url: routes.dashboard,
    icon: MdDashboard,
  },
  {
    title: 'Расписание',
    url: routes.schedule,
    icon: MdSchedule,
  },
  // {
  //   title: 'Новости',
  //   url: routes.news,
  // },
  {
    title: 'Карта филиалов',
    url: routes.branches,
    icon: MdMap,
  },
  {
    title: 'Абонемент',
    url: routes.subscription,
    icon: MdAttachMoney,
  },
  {
    title: 'Entrypoint',
    url: routes.landing,
    icon: MdWeb,
  },
]

export { parentMenu }
