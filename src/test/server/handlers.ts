import { rest } from 'msw'

import { mockPunkApiBeerList } from '@/test'

export const yesNoApiHandlers = [
  rest.get('https://yesno.wtf/api', (req, res, ctx) => {
    return res(ctx.json({ answer: 'yes', forced: false, image: 'https://yesno.wtf/assets/yes/1-1b5b5b5b5b.png' }))
  })
]

export const punkApiHandlers = [
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'))
    const perPage = Number(req.url.searchParams.get('per_page'))
    const beerList = mockPunkApiBeerList(page, perPage)
    return res(ctx.json(beerList))
  }),
  rest.get('https://api.punkapi.com/v2/beers/:beerId', (req, res, ctx) => {
    const beerId = Number(req.params.beerId)
    const beerList = mockPunkApiBeerList(1, 1, +beerId)
    return res(ctx.json(beerList))
  })
]