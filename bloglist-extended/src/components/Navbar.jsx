import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Navbar = () => {
  const user = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const padding = {
    padding: 5
  }

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography variant='subtitle1'>{user?.name} logged in</Typography>
          <Button color='inherit' onClick={handleLogout}>logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar