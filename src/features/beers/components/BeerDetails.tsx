import { useGetBeerByIdQuery } from '../api'

import classes from './BeerDetails.module.scss'

import { Spinner } from '@/components/spinner/Spinner'

type BeerDetailsProps = {
  beerId: number;
};

export const BeerDetails = ({ beerId }: BeerDetailsProps) => {
  const { data: beer, isLoading } = useGetBeerByIdQuery({ id: beerId })

  return (
    <>
      {isLoading && <>
        <Spinner size="xl" />
        <div className="sr-only">Loading...</div>
      </>}
      {!isLoading && !beer && <div>No beer found.</div>}
      {beer && (
        <>
          <h1 role="heading">
            {beer.name} ({beer.first_brewed ?? 'N/A'})
          </h1>
          <h2>{beer.tagline}</h2>
          <div className={classes.infoContainer}>
            <img src={beer.image_url} className={classes.image}></img>
            <div className={classes.shortDataContainer}>
              <div><strong>ABV: </strong>{beer.abv ?? 'N/A'} %</div>
              <div><strong>IBU: </strong>{beer.ibu ?? 'N/A'}</div>
              <div><strong>PH: </strong>{beer.ph ?? 'N/A'}</div>
              <div><strong>Attenuation level: </strong>{beer.attenuation_level ?? 'N/A'}</div>
              <div><strong>Volume: </strong>{beer.volume.value ?? 'N/A'} {beer.volume.unit}</div>
            </div>
            <div className={classes.descriptionContainer}>
              <p>{beer.description}</p>
            </div>
            <div className={classes.foodPairingsContainer}>
              <div>Food pairings</div>
              {beer.food_pairing.length === 0 && <div>No food pairings available.</div>}
              <ul>
                {beer.food_pairing.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}
