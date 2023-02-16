import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/features/auth'
import { beerApi } from '@/features/beers'

const store = configureStore({
  reducer: {
    [beerApi.reducerPath]: beerApi.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store