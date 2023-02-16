import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/layout/MainLayout'
import { Spinner } from '@/components/spinner/Spinner'
import { lazyImport } from '@/utils/lazyImport'

const { BeersRoutes } = lazyImport(
  () => import('@/features/beers'),
  'BeersRoutes'
)

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <Spinner size="xl" />
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const protectedRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      { path: '/beers/*', element: <BeersRoutes /> },
      { path: '*', element: <Navigate to="/beers" /> },
    ],
  },
]