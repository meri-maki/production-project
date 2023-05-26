import { classNames } from "shared/lib/classNames/classNames"
import cls from "./AboutPage.module.scss"

interface AboutPageProps {
    className?: string
}

export const AboutPage = ({ className }: AboutPageProps) => (
    <div className={classNames(cls.AboutPage, {}, [className])} />
)
