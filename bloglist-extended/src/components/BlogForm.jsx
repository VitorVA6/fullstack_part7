import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField, Typography } from '@mui/material'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const create = (event) => {
    event.preventDefault()
    const blog = {
      title,
      url,
      author,
    }
    dispatch(createBlog(blog))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <form onSubmit={create}>
      <Typography variant='h4'>Create new</Typography>
      <div>
        <TextField
          id='title'
          label='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          variant='standard'
        />
      </div>
      <div>
        <TextField
          id='author'
          label='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          variant='standard'
        />
      </div>
      <div>
        <TextField
          id='url'
          label='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          variant='standard'
        />
      </div>
      <Button
        id='create-button'
        type='submit'
        variant='outlined'
        sx={{
          marginBottom: '5px',
          marginTop: '15px',
        }}
      >
        create
      </Button>
    </form>
  )
}

export default BlogForm
