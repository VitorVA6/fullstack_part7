import Notification from './components/Notification'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Login from './pages/Login'
import Home from './pages/Home'
import { useEffect } from 'react'
import { getUser } from './reducers/loginReducer'
import Base from './pages/Base'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'
import { Container } from '@mui/material'

const App = () => {
  const user = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Container>
      <div>
        <Notification />
        <Routes>
          <Route path='/' element={<Base />}>
            <Route index element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<User />} />
            <Route path='blogs/:id' element={<Blog />} />
          </Route>
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
        </Routes>
      </div>
    </Container>
  )
}

export default App
