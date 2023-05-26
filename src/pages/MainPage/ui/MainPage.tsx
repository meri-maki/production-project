/* import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}
export const MainPage = ({ className }: MainPageProps) => {
    const { t } = useTranslation('main')

    return (
        <div className={classNames(cls.mainpage, {}, [className])}>
            {t('main-page')}
        </div>
    )
} */

import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./MainPage.module.scss"

interface MainPageProps {
    className?: string
}

export const MainPage = ({ className }: MainPageProps) => {
    const { t } = useTranslation("main")

    return <div className={classNames(cls.MainPage, {}, [className])}>{t("main-page")}</div>
}
