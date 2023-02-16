import { Beer } from '../types'

import classes from './BeersListItem.module.scss' 

type BeerListItemProps = {
  beer: Beer;
  onClick: (beerId: number) => void;
};

export const BeersListItem = ({ beer, onClick }: BeerListItemProps) => {
  const handleItemClick = () => {
    onClick(beer.id)
  }

  return (
    <li className={classes.container} onClick={handleItemClick}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={beer.image_url}></img>
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.name}>{beer.name}</div>
        <div className={classes.tagline}>{beer.tagline}</div>
      </div>
    </li>
  )
}
