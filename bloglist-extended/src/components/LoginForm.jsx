import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signin } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Button } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(signin({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            type='password'
            label='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            variant="standard"
          />
        </div>
        <Button
          variant='contained'
          type='submit'
          sx={{
            marginTop: '20px'
          }}
        >login</Button>
      </form>
    </div>
  )
}

export default LoginForm