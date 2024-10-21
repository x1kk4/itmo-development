import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { TChildren, TSubscription } from './types'
import { useChildren } from '@/utils/hooks/useChildren'
import { useChildrens } from '@/utils/hooks/useChildrens'
import { useSubscription } from '@/utils/hooks/useSubscription'

export type TParentContextShape = {
  parentId: number
  childs: TChildren[]
  setSelectedChildren: Dispatch<SetStateAction<number | null>>
  selectedChildrenData?: TChildren
  subscriptionData?: TSubscription
  isSubscriptionDataLoading: boolean
}
const ParentContext = React.createContext<TParentContextShape>({} as TParentContextShape)

export type TParentProviderProps = {
  parentId: number
  children: React.ReactNode
  childrenIds: number[]
  subscriptionId: number | null
}

const ParentProvider = (props: TParentProviderProps) => {
  const { parentId, children, childrenIds, subscriptionId } = props
  const [selectedChildren, setSelectedChildren] = useState<number | null>(1)

  const { data: subscriptionData, isLoading: isSubscriptionDataLoading } =
    useSubscription(subscriptionId)

  const { data: childsData } = useChildrens(childrenIds)
  const { data: selectedChildrenData } = useChildren(selectedChildren)

  const value: TParentContextShape = useMemo(() => {
    if (!childsData) {
      return {
        parentId,
        childs: [],
        setSelectedChildren,
        selectedChildrenData,
        subscriptionData,
        isSubscriptionDataLoading,
      }
    }
    return {
      parentId,
      childs: childsData,
      setSelectedChildren,
      selectedChildrenData,
      subscriptionData,
      isSubscriptionDataLoading,
    }
  }, [
    parentId,
    childsData,
    setSelectedChildren,
    selectedChildrenData,
    subscriptionData,
    isSubscriptionDataLoading,
  ])

  return <ParentContext.Provider value={value}>{children}</ParentContext.Provider>
}

const useParentContext = () => {
  const context = useContext(ParentContext)

  if (!context || !Object.keys(context).length) {
    throw new Error('useParentContext was used outside of its Provider')
  }

  return context
}

export { ParentContext, useParentContext, ParentProvider }
