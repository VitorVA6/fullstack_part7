import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { Box, Button, Stack, Typography, Link, TextField } from '@mui/material'

const Blog = () => {
  const [comment, setComment] = useState('')

  const id = useParams().id
  const blogs = useSelector(({ blog }) => blog)
  const user = useSelector(({ login }) => login)

  const blog = blogs.find(b => b.id === id)

  const dispatch = useDispatch()

  const handleUpdate = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog.id))
    }
  }

  const handleComment = event => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if(!blog) return null

  return (
    <div>
      <Typography variant='h4'>{blog.title} - {blog.author}</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginTop: '20px'
      }}>
        <Link
          href={`https://${blog.url}`}
          target='_blank'
          rel='noreferrer'
          underline='none'
          variant='subtitle1'
        >{blog.url}</Link>
        <Stack direction={'row'} spacing={2}>
          <Typography variant='subtitle1'>
            likes {blog.likes}
          </Typography>
          <Button
            variant='outlined'
            size='small'
            onClick={() => handleUpdate({ ...blog, user: blog.user.id, likes: blog.likes+1 })}
          >
              like
          </Button>
        </Stack>
        <Typography variant='subtitle1'>{blog.user.name}</Typography>
      </Box>
      {
        user.username === blog.user.username &&
        <Button
          onClick={() => handleDelete(blog)}
          className='remove-button'
          variant='contained'
          size='small'
          sx={{
            marginTop: '15px'
          }}
        >remove</Button>
      }
      <Typography
        variant='h5'
        sx={{
          marginTop: '40px',
          marginBottom: '15px'
        }}
      >Comments</Typography>
      <form onSubmit={ handleComment }>
        <TextField
          label='content'
          variant='outlined'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          size='small'
          sx={{
            marginRight: '10px'
          }}
        />
        <Button
          type='submit'
          variant='contained'
        >add comment</Button>
      </form>
      <ul>
        {
          blog.comments.map((c, i) => (
            <li key={i}>
              <Typography variant='subtitle1'>{c}</Typography>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Blog