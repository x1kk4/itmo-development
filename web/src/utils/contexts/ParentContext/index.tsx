import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { TChildren } from './types'
import { useChildren } from '@/utils/hooks/useChildren'

export type TParentContextShape = {
  childs: TChildren[]
  setSelectedChildren: Dispatch<SetStateAction<number | null>>
  selectedChildrenData?: TChildren
}
const ParentContext = React.createContext<TParentContextShape>({} as TParentContextShape)

export type TParentProviderProps = {
  children: React.ReactNode
  childrenIds: number[]
}

const ParentProvider = (props: TParentProviderProps) => {
  const { children, childrenIds } = props
  const [selectedChildren, setSelectedChildren] = useState<number | null>(1)

  const { data: childsData } = useChildren(childrenIds[0])
  const { data: selectedChildrenData } = useChildren(selectedChildren)

  const value: TParentContextShape = useMemo(() => {
    if (!childsData) {
      return {
        childs: [],
        setSelectedChildren,
        selectedChildrenData,
      }
    }
    return {
      childs: [childsData],
      setSelectedChildren,
      selectedChildrenData,
    }
  }, [childsData, setSelectedChildren, selectedChildrenData])

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
