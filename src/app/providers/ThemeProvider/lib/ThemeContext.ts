import { createContext } from "react"

export enum Theme { // list of themes used in the project
    LIGHT = "light",
    DARK = "dark",
}
export interface ThemeContextProps {
    theme?: Theme
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = "theme"
