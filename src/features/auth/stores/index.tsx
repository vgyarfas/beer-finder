import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/lib/redux-toolkit'

type AuthState = {
  name: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { name: null, loggedIn: false } as AuthState,
  reducers: {
    login: (
      state,
      { payload: { name } }: PayloadAction<{ name: string }>
    ) => {
      state.name = name
    },
    logout: (state) => {
      state.name = null
    }
  },
})

export const { login, logout } = slice.actions

export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.name
export const selectIsLoggedIn = (state: RootState) => state.auth.name !== null
