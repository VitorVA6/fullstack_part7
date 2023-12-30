import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Box sx={{
      marginBottom: '30px'
    }}>
      <div style={hideWhenVisible}>
        <Button
          variant='outlined'
          onClick={toggleVisibility}
          sx={{
            marginBottom: '10px'
          }}
        >{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          variant='outlined'
          onClick={toggleVisibility}
        >cancel</Button>
      </div>
    </Box>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable