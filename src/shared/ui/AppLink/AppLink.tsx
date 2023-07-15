import { FC } from "react"
import { Link, LinkProps } from "react-router-dom"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AppLink.module.scss"

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
}
export const AppLink: FC<AppLinkProps> = (props) => {
    const { className, children, to, theme = AppLinkTheme.PRIMARY, ...otherProps } = props

    const mods: Record<string, boolean> = {
        [cls[theme]]: true
    }

    return (
        <Link
            to={to}
            className={classNames(cls.applink, mods, [className])}
            // [cls[theme]] - динамическая конструкция
            {...otherProps}
        >
            {children}
        </Link>
    )
}
