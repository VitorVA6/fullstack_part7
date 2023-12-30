import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const Users = () => {
  const users = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <Typography
        variant='h4'
        sx={{
          marginBottom: '40px'
        }}
      >Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                USER
              </TableCell>
              <TableCell>
                BLOGS CREATED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user => (
                <TableRow key={user.id}>
                  <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users