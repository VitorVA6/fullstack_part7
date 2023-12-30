import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  return (
    <div>
      {notification && (
        <Alert severity={notification.type}>{notification.text}</Alert>
      )}
    </div>
  )
}

export default Notification