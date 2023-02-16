import { faker } from '@faker-js/faker'

import { YesNoApiAnswer, YesNoApiResponse } from '@/features/auth'
import { Beer } from '@/features/beers'

export const mockYesNoApiYes = (): YesNoApiResponse => ({
  answer: YesNoApiAnswer.Yes,
  forced: false,
  image: faker.image.imageUrl() as string,
})

export const mockYesNoApiNo = (): YesNoApiResponse => ({
  answer: YesNoApiAnswer.No,
  forced: false,
  image: faker.image.imageUrl() as string,
})

export const mockYesNoApiMaybe = (): YesNoApiResponse => ({
  answer: YesNoApiAnswer.Maybe,
  forced: false,
  image: faker.image.imageUrl() as string,
})

export const mockPunkApiBeerList = (page: number, perPage: number, id?: number): Array<Beer> => {
  const beerList = []

  for (let i = (page - 1) * perPage; i < page * perPage; i++) {
    beerList.push({
      id: id ?? i,
      name: faker.name.firstName(),
      tagline: faker.name.lastName(),
      first_brewed: faker.date.past().toLocaleDateString(),
      description: faker.lorem.paragraph(),
      image_url: faker.image.imageUrl(),
      abv: faker.datatype.float({min: 0.01, max: 15}),
      ibu: faker.datatype.float({min: 0.01, max: 15}),
      target_fg: faker.datatype.float({min: 0.01, max: 15}),
      target_og: faker.datatype.float({min: 0.01, max: 15}),
      ebc: faker.datatype.float({min: 0.01, max: 15}),
      srm: faker.datatype.float({min: 0.01, max: 15}),
      ph: faker.datatype.number({min: 0, max: 14}),
      attenuation_level: faker.datatype.number({min: 0, max: 100}),
      volume: {
        value: faker.datatype.number({min: 0, max: 100}),
        unit: faker.random.word(),
      },
      boil_volume: {
        value: faker.datatype.number({min: 0, max: 100}),
        unit: faker.random.word(),
      },
      method: {
        mash_temp: [
          {
            temp: {
              value: faker.datatype.number({min: 0, max: 100}),
              unit: faker.random.word(),
            },
            duration: faker.datatype.number({min: 0, max: 100}),
          },
        ],
        fermentation: {
          temp: {
            value: faker.datatype.number({min: 0, max: 100}),
            unit: faker.random.word(),
          },
        },
        twist: faker.random.word(),
      },
      ingredients: {
        malt: [
          {
            name: faker.random.word(),
            amount: {
              value: faker.datatype.number({min: 0, max: 100}),
              unit: faker.random.word(),
            },
          },
        ],
        hops: [
          {
            name: faker.random.word(),
            amount: {
              value: faker.datatype.number({min: 0, max: 100}),
              unit: faker.random.word(),
            },
            add: faker.random.word(),
            attribute: faker.random.word(),
          },
        ],
        yeast: faker.random.word(),
      },
      food_pairing: [faker.random.word(), faker.random.word(), faker.random.word()],
      brewers_tips: faker.random.word(),
      contributed_by: faker.random.word(),
    })
  }

  return beerList
}