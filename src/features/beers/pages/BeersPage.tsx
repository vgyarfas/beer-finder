import { useNavigate } from 'react-router-dom'

import { BeersList } from '../components/BeersList'

export const BeersPage = () => {
  const navigate = useNavigate()
  
  const handleNavigate = (beerId: number) => navigate(`${beerId}`)

  return (
    <>
      <h1>Beer list</h1>
      <BeersList onNavigate={handleNavigate} />
    </>
  )
}