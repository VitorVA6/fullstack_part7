import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(({ user }) => user)
  const id = useParams().id

  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <div>
      <Typography variant='h4'>{user.name}</Typography>
      <Typography
        variant='h5'
        sx={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        Added blogs
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Typography variant='subtitle1'>{blog.title}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
