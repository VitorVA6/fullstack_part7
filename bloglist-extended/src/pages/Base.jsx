import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Typography } from '@mui/material'

const Base = () => {

  return (
    <div>
      <Navbar />
      <Typography
        variant='h3'
        sx={{
          marginBottom: '30px',
          marginTop: '30px'
        }}
      >Blog App</Typography>
      <Outlet/>
    </div>
  )
}

export default Base