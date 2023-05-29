import { useTranslation } from "react-i18next"

import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./LangSwitcher.module.scss"

interface LangSwitcherProps {
    className?: string
    short?: boolean
}
export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
    }

    return (
        <Button theme={ButtonTheme.PRIMARY} onClick={toggle} className={classNames(cls.langswitcher, {}, [className])}>
            {t(short ? "langShort" : "lang")}
        </Button>
    )
}
