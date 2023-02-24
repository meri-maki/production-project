import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'

// COMPONENT FOR TESTING
export const BugButton = () => {
    const [error, setError] = useState(false)
    const { t } = useTranslation()

    const createBug = () => {
        setError(true)
    }

    useEffect(() => {
        if (error) {
            throw new Error()
        }
    }, [error])

    return (
        <Button onClick={createBug}>
            {t('bug-btn')}
        </Button>
    )
}
