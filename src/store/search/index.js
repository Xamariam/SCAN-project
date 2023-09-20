import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
  response: '',
}

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload.response
    },
  },
})

export const { setResponse } = searchSlice.actions

export default searchSlice.reducer
