import { createApi } from '@reduxjs/toolkit/query/react'

import { Beer, BeerListFilters } from '../types'

import { punkApiAxiosBaseQuery } from '@/lib/axios'

export interface GetBeersArgs {
  page: number
  perPage: number
  filters?: BeerListFilters
}

export interface GetBeerByIdArgs {
  id: number
}

// Define a service using a base URL and expected endpoints
export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: punkApiAxiosBaseQuery(),
  tagTypes: ['Beers'],
  endpoints: (builder) => ({
    getBeers: builder.query<Array<Beer>, GetBeersArgs>({
      query: (args: GetBeersArgs) => ({
        url: '/beers',
        method: 'get',
        params: { page: args.page, per_page: args.perPage, ...args.filters },
      }),
      providesTags: (result) =>
        result
          ? [
            // Provides a tag for each post in the current page,
            ...result.map((beer: Beer) => ({
              type: 'Beers' as const,
              id: beer.id,
            })),
            { type: 'Beers', id: 'BEER-PAGINATED-LIST' },
          ]
          : [{ type: 'Beers', id: 'BEER-PAGINATED-LIST' }],
    }),
    getBeerById: builder.query<Beer, GetBeerByIdArgs>({
      query: (args: GetBeerByIdArgs) => ({
        url: `beers/${args.id}`,
        method: 'get',
      }),
      transformResponse: (response: Array<Beer>) => response[0],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBeersQuery, useGetBeerByIdQuery } = beerApi
