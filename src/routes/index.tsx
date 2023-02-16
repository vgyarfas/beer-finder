import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { selectIsLoggedIn } from '@/features/auth'
import { useAppSelector } from '@/lib/react-redux'

export const AppRoutes = () => {
  const loggedIn = useAppSelector(selectIsLoggedIn)

  const routes = loggedIn ? protectedRoutes : publicRoutes

  const element = useRoutes(routes)

  return <>{element}</>
}