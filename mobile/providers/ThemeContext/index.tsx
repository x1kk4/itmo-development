import { STORAGE_KEYS } from '@/api/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ColorSchemeName, useColorScheme } from 'react-native'

export type AppTheme = NonNullable<ColorSchemeName>

export type TThemeContextShape = {
  theme: AppTheme
  isSystem: boolean
  setTheme: (theme: AppTheme | 'system') => void
}
const ThemeContext = React.createContext<TThemeContextShape>({} as TThemeContextShape)

export type TThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider = (props: TThemeProviderProps) => {
  const { children } = props

  const systemColorScheme = useColorScheme()

  const [theme, setTheme] = useState<AppTheme>(systemColorScheme ?? 'light')
  const [isSystem, setIsSystem] = useState<boolean>(false)

  const getStorageTheme = useCallback(async () => {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME)

    if (theme) return theme

    return null
  }, [])

  useEffect(() => {
    const initTheme = async () => {
      const storedTheme = await getStorageTheme()

      if (storedTheme) {
        setTheme(storedTheme as AppTheme)
      } else if (systemColorScheme) {
        setTheme(systemColorScheme)
        setIsSystem(true)
      }
    }

    initTheme()
    //eslint-disable-next-line
  }, [systemColorScheme])

  const setThemeExternal = useCallback(
    async (newTheme: AppTheme | 'system') => {
      if (newTheme !== 'system') {
        await AsyncStorage.setItem(STORAGE_KEYS.THEME, newTheme)
        setTheme(newTheme)
        setIsSystem(false)
        return
      }

      await AsyncStorage.removeItem(STORAGE_KEYS.THEME)
      setTheme(systemColorScheme ?? 'light')
      setIsSystem(true)

      //eslint-disable-next-line
    },
    [systemColorScheme],
  )

  const value: TThemeContextShape = useMemo(() => {
    return {
      theme,
      setTheme: setThemeExternal,
      isSystem,
    }
  }, [theme, setThemeExternal, isSystem])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (!context || !Object.keys(context).length) {
    throw new Error('useThemeContext was used outside of its Provider')
  }

  return context
}

export { ThemeContext, useThemeContext, ThemeProvider }
