/* eslint-disable i18next/no-literal-string */
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Modal } from "shared/ui/Modal/Modal"

import cls from "./Navbar.module.scss"

interface NavBarProps {
    className?: string
}

export const Navbar = ({ className }: NavBarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button className={cls.navLinks} theme={ButtonTheme.PRIMARY} onClick={onToggleModal}>
                {t("login")}
            </Button>
            {isAuthModal && (
                <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad veniam in quae corrupti unde maxime
                    nam, veritatis inventore at dolore blanditiis possimus sint sapiente eius debitis perferendis
                    cupiditate facere ipsa.
                </Modal>
            )}
        </div>
    )
}
