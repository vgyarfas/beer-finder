import { Navigate, Route, Routes } from 'react-router-dom'

import { BeerPage } from '../pages/BeerPage'
import { BeersPage } from '../pages/BeersPage'

export const BeersRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<BeersPage />} />
      <Route path=":beerId" element={<BeerPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}