import { useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { MdChevronLeft, MdChevronRight, MdOutlineHome, MdQuestionMark } from "react-icons/md"

import { ThemeSwitcher } from "widgets/ThemeSwitcher"
import { LangSwitcher } from "widgets/LangSwitcher"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink"
import { RoutePath } from "shared/config/routeConfig/routeConfig"
import { t } from "i18next"
import cls from "./Sidebar.module.scss"

interface SidebarProps {
    className?: string
}
export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }
    return (
        <div data-testid="sidebar" className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <Button
                data-testid="sidebar-toggle"
                theme={ButtonTheme.ICON}
                onClick={onToggle}
                className={cls.sidebarButton}
            >
                {collapsed ? <MdChevronLeft /> : <MdChevronRight />}
            </Button>
            <div className={cls.items}>
                <AppLink theme={AppLinkTheme.PRIMARY} to={RoutePath.main} className={cls.item}>
                    <MdOutlineHome className={cls.icon} />
                    <div className={cls.link}>{t("main")}</div>
                </AppLink>
                <AppLink theme={AppLinkTheme.PRIMARY} to={RoutePath.about} className={cls.item}>
                    <MdQuestionMark className={cls.icon} />
                    <div className={cls.link}>{t("about")}</div>
                </AppLink>
            </div>
            <div className={cls.switchers}>
                <LangSwitcher short={collapsed} />

                <ThemeSwitcher />
            </div>
        </div>
    )
}
