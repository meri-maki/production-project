import { useTranslation } from "react-i18next"
import { RoutePath } from "shared/config/routeConfig/routeConfig"
import { classNames } from "shared/lib/classNames/classNames"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import cls from "./Navbar.module.scss"

interface NavBarProps {
    className?: string
}

export const Navbar = ({ className }: NavBarProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.navLinks}>
                <AppLink theme={AppLinkTheme.PRIMARY} className={cls.mainLink} to={RoutePath.main}>
                    {t("main")}
                </AppLink>

                <AppLink theme={AppLinkTheme.PRIMARY} to={RoutePath.about}>
                    {t("about")}
                </AppLink>
            </div>
        </div>
    )
}
