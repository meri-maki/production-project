import { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Sidebar.module.scss'
import Menu from 'shared/assets/icons/menu.svg'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'


interface SidebarProps {
  className?: string
}
export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }
  return (
    <div
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        theme={ButtonTheme.ICON}
        onClick={onToggle}
        className={cls.collapseButton}
      >
        <Menu />
      </Button>
      <ThemeSwitcher />
    </div>
  )
}
