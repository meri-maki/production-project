import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  ICON = 'icon',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
}
export const Button: FC<ButtonProps> = (props) => {
  const { children, className, onClick, theme, ...otherProps } = props

  return (
    <button
      className={classNames(cls.button, {}, [cls[theme]])}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  )
}
