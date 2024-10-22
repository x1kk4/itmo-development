import { routes } from '@/router/routes'
import { ElementType } from 'react'
import {
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdDashboard,
  MdEventAvailable,
  MdMap,
  MdSchedule,
  // MdWeb,
} from 'react-icons/md'

export type TMenuItem = {
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
    title: 'Филиалы',
    url: routes.branches,
    icon: MdMap,
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
    title: 'Абонемент',
    url: routes.subscription,
    icon: MdAttachMoney,
  },
  // {
  //   title: 'Лендинг',
  //   url: routes.landing,
  //   icon: MdWeb,
  // },
]

const coachMenu = [
  {
    title: 'Тренировки',
    url: routes.sessions,
    icon: MdEventAvailable,
  },
  // {
  //   title: 'Журнал',
  //   url: routes.journal,
  //   icon: MdChecklist,
  // },
  {
    title: 'Зарплата',
    url: routes.salary,
    icon: MdAccountBalanceWallet,
  },
]

export { parentMenu, coachMenu }
