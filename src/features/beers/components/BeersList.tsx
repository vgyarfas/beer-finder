import { useMemo, useState } from 'react'

import { useGetBeersQuery } from '../api'

import classes from './BeersList.module.scss'
import { BeersListItem } from './BeersListItem'

import { Button } from '@/components/button/Button'
import { FormInputField } from '@/components/form/FormInputField'
import {
  FormSelectField,
  FormSelectFieldOptions,
} from '@/components/form/FormSelectField'
import { Spinner } from '@/components/spinner/Spinner'
import useDebounce from '@/hooks/useDebounce'

// There is no way in PunkAPI to get the total number of beers, therefore we have to hardcode a number.
// https://github.com/sammdec/punkapi/issues/44
const TOTAL_BEER_COUNT = 300

type BeersListProps = {
  onNavigate: (beerId: number) => void;
};

const perPageOptions: Array<FormSelectFieldOptions> = [
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '75', value: 75 },
]

export const BeersList = ({ onNavigate }: BeersListProps) => {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(50)
  const [beerName, setBeerName] = useState<string>('')

  const beerNameFilter = useDebounce(beerName, 200)

  const {
    data: beers,
    isLoading,
    isFetching,
  } = useGetBeersQuery({
    page,
    perPage,
    filters: { beer_name: beerNameFilter || undefined },
  })

  const isFirstPage = useMemo(() => page === 1, [page])
  const isLastPage = useMemo(
    () => page * perPage >= TOTAL_BEER_COUNT || (beers && beers.length < perPage),
    [page, perPage, beers]
  )

  const goPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const goNextPage = () => {
    if (page * perPage < TOTAL_BEER_COUNT) {
      setPage(page + 1)
    }
  }

  const handleClick = (beerId: number) => {
    onNavigate(beerId)
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value))
    setPage(1)
  }

  const handleBeerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeerName(e.target.value)
    setPage(1)
  }

  return (
    <div className={classes.container}>
      <div className={classes.controlRow}>
        <div className={classes.perPageContainer}>
          <FormSelectField
            label="Per page"
            defaultValue={perPage.toString()}
            options={perPageOptions}
            onChange={handlePerPageChange}
          />
        </div>
        <div className={classes.nameFilterContainer}>
          <FormInputField
            type="text"
            label="Beer name"
            defaultValue={beerName}
            onChange={handleBeerNameChange}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            type="button"
            onClick={goPreviousPage}
            isLoading={isLoading || isFetching}
            disabled={isFirstPage}
          >
          Previous page
          </Button>
          <Button
            type="button"
            onClick={goNextPage}
            isLoading={isLoading || isFetching}
            disabled={isLastPage}
          >
          Next page
          </Button>
        </div>
      </div>
      {isLoading || isFetching && (
        <div className={classes.loadingContainer}>
          <Spinner size="xl" />
          <div className="sr-only">Loading...</div>
        </div>
      )}
      {!isLoading && !isFetching && beers?.length === 0 && (
        <div>No beers found.</div>
      )}
      {!isLoading && !isFetching && (
        <ul className={classes.list}>
          {beers?.map((beer) => (
            <BeersListItem key={beer.id} beer={beer} onClick={handleClick} />
          ))}
        </ul>
      )}
    </div>
  )
}
