import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import { getBlogs } from '../reducers/blogReducer'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Home = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blog }) => [...blog].sort((a, b) => b.likes - a.likes))
  const user = useSelector(({ login }) => login)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  return (
    <div>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                TITLE
              </TableCell>
              <TableCell>
                AUTHOR
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home