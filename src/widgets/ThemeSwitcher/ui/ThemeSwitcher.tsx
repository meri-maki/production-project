import { Theme, useTheme } from "app/providers/ThemeProvider"
import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { MdOutlineModeNight, MdOutlineWbSunny } from "react-icons/md"
import cls from "./ThemeSwitcher.module.scss"

interface ThemeSwitcherProps {
    className?: string
}
export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            onClick={toggleTheme}
            theme={ButtonTheme.ICON}
            className={classNames(cls.themeswitcher, {}, [className])}
        >
            {theme === Theme.DARK ? <MdOutlineWbSunny /> : <MdOutlineModeNight />}
        </Button>
    )
}
