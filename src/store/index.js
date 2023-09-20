import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import { searchSlice } from './search'

export const store = configureStore({
  reducer: { authSlice, searchSlice },
})
