import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Footer.module.scss'

interface FooterProps {
  className?: string
}
export const Footer = ({ className }: FooterProps) => {

  return (
    <div className={classNames(styles.footer, {}, [])}> </div>
  )
}
