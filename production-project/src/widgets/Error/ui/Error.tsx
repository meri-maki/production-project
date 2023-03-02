import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Error.module.scss'

interface ErrorProps {
    className?: string
}
export const Error = ({ className }: ErrorProps) => {
    const { t } = useTranslation()
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload() // function that reloads page
    }
    return (
        <div className={classNames(cls.error, {}, [className])}>
            <p>{t('error-msg')}</p>

            <Button onClick={reloadPage} theme={ButtonTheme.PRIMARY}>
                {t('reset-btn')}
            </Button>
        </div>
    )
}
