import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
  accessToken: localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')).accessToken
    : '',
  expire: localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')).expire
    : '',
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.expire = action.payload.expire
    },
    resetAuth: (state) => {
      state.accessToken = ''
      state.expire = ''
      localStorage.removeItem('auth')
    },
  },
})

export const { setAuth, resetAuth } = authSlice.actions

export default authSlice.reducer
