import { cleanup, render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { afterEach } from 'vitest'

import { server } from './server/server'

import { beerApi } from '@/features/beers'
import store from '@/lib/redux-toolkit'

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers()
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(beerApi.util.resetApiState())
  cleanup()
})

afterAll(() => server.close())

const customRender = (ui: React.ReactElement, options = {
  preloadedState: {},
  store: store
}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }: PropsWithChildren<unknown>): JSX.Element => {
      return <Provider store={options.store}>{children}</Provider>
    },
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }