import { TableCell, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <TableRow key={blog.id}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}

export default Blog