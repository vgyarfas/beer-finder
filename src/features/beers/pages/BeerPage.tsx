import { useNavigate, useParams } from 'react-router-dom'

import { BeerDetails } from '../components/BeerDetails'

import classes from './BeerPage.module.scss'

import { Button } from '@/components/button/Button'

export const BeerPage = () => {
  const navigate = useNavigate()
  const {beerId} = useParams()

  const handleBack = () => navigate(-1)
  
  return (
    <>
      {beerId && <BeerDetails beerId={+beerId} />}
      <div className={classes.backButtonContainer}>
        <Button onClick={handleBack}>
          Back to list
        </Button>
      </div>
    </>
  )
}