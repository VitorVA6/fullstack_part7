import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    addBlog(state, action){
      return [...state, action.payload]
    },
    updateBlog(state, action){
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },
    deleteBlog(state, action){
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(content)
      dispatch(addBlog(newBlog))
      dispatch(setNotification({
        type: 'success',
        text: `a new blog ${newBlog.title} by ${newBlog.author}`
      }, 5))
    }catch(err){
      dispatch(setNotification({
        type: 'error',
        text: err.response.data.error
      }, 5))
    }
  }
}

export const likeBlog = (content) => {
  return async dispatch => {
    try{
      const updatedBlog = await blogService.update(content)
      console.log(updatedBlog)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification({
        type: 'success',
        text: `you liked blog ${updatedBlog.title} by ${updatedBlog.author}`
      }, 5))
    }catch(err){
      dispatch(setNotification({
        type: 'error',
        text: err.response.data.error
      }, 5))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try{
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      dispatch(setNotification({
        type: 'success',
        text: 'blog successfully deleted'
      }, 5))
    }catch(err){
      dispatch(setNotification({
        type: 'error',
        text: err.response.data.error
      }, 5))
    }
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    try{
      const updatedBlog = await blogService.createComment(id, comment)
      dispatch(updateBlog(updatedBlog))
    }catch(err){
      console.log(err)
    }
  }
}

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export default blogSlice.reducer