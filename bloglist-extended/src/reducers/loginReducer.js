import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action){
      return action.payload
    },
    clearUser(state, action){
      return null
    }
  }
})

export const signin = (credentials) => {
  return async dispatch => {
    try{
      const user = await loginService(credentials)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }catch(err){
      dispatch(setNotification({
        type: 'error',
        text: err.response.data.error
      }, 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('user')
    dispatch(clearUser())
  }
}

export const getUser = () => {
  return dispatch => {
    const jsonUser = window.localStorage.getItem('user')
    if(jsonUser){
      const user = JSON.parse(jsonUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const { setUser, clearUser } = loginSlice.actions

export default loginSlice.reducer