import { FC, useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from '../lib/ThemeContext'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT // локалка всегда возвращает СТРОКУ поэтому необходимо сделать явное привидение

const ThemeProvider: FC = ({ children }) => {
  // FC указан как тип чтобы использоввнь проп children
  const [theme, setTheme] = useState<Theme>(defaultTheme) // дефолтное значение не хардкодим а берем из локалки

  const defaultProps = useMemo(
    //на каждый ререндер компонента объект с пропсами (value in .Provider) СОХРАНЯЕТСЯ (а не создается новый каждый раз) благодаря useMemo
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  )
  //провайдер создается чтобы работать с контекстом
  return (
    <ThemeContext.Provider value={defaultProps}>
      {/* value - значения самого провайдера */}
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
