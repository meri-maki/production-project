import { ButtonHTMLAttributes, FC } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Button.module.scss"

export enum ButtonTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    OUTLINED = "outlined",
    ICON = "icon"
}

export enum ButtonSize {
    L = "size_l",
    M = "size_m",
    S = "size_s"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    size?: ButtonSize
}
export const Button: FC<ButtonProps> = (props) => {
    const { children, className, onClick, theme, size, ...otherProps } = props
    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls[size]]: true
    }

    return (
        <button type="button" className={classNames(cls.button, mods, [className])} onClick={onClick} {...otherProps}>
            {children}
        </button>
    )
}
