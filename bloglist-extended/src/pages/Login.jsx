import React from 'react'
import LoginForm from '../components/LoginForm'
import { Typography } from '@mui/material'

const Login = () => {
  return (
    <div>
      <Typography variant='h4'>Log in to application</Typography>
      <LoginForm/>
    </div>
  )
}

export default Login