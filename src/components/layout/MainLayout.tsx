import { Button } from '../button/Button'

import classes from './MainLayout.module.scss'

import { logout } from '@/features/auth'
import { useAppDispatch, useAppSelector } from '@/lib/react-redux'


type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const username = useAppSelector((state) => state.auth.name)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.welcomeMessage}>Welcome {username}!</div>
        <Button type="button" onClick={handleLogout}>Log out</Button>
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  )
}