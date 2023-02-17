import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { LangSwitcher } from 'widgets/LangSwitcher';
import cls from './Navbar.module.scss';

interface NavBarProps {
  className?: string
}

export const Navbar = ({ className }: NavBarProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <LangSwitcher />
            <div className={cls.navLinks}>
                <AppLink theme={AppLinkTheme.PRIMARY} className={cls.mainLink} to="/">
                    {t('main')}
                </AppLink>
                <AppLink theme={AppLinkTheme.PRIMARY} to="/about">
                    {t('about')}
                </AppLink>
            </div>
        </div>
    );
};
