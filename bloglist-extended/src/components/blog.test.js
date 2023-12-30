import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container
  let updateMock

  beforeEach(() => {
    const blogMock = {
      id: '1234',
      title: 'example',
      author: 'test',
      url: 'www.google.com',
      likes: 10,
      user: {
        id: '123',
        username: 'vitorva6',
        name: 'vitor',
      },
    }

    const userMock = {
      username: 'user123',
      name: 'user doe',
    }

    updateMock = jest.fn()
    const deleteMock = jest.fn()

    container = render(
      <Blog
        blog={blogMock}
        user={userMock}
        handleDelete={deleteMock}
        handleUpdate={updateMock}
      />,
    ).container
  })

  test('at start renders author and title and does not render likes and url', () => {
    const element = screen.findByText('example test')
    expect(element).toBeDefined()

    const togglableContainer = container.querySelector('.blog-togglable')
    expect(togglableContainer).toHaveStyle('display: none')
  })

  test('clicking the view button, render url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const togglableContainer = container.querySelector('.blog-togglable')
    expect(togglableContainer).not.toHaveStyle('display: none')
  })

  test('clicking like button twice, call handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(updateMock.mock.calls).toHaveLength(2)
  })
})

test('blog form calls handler one time and the handler receives tha data correctly', async () => {
  const user = userEvent.setup()
  const createMock = jest.fn()

  render(<BlogForm handleCreate={createMock} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const button = screen.getByText('create')

  await user.type(titleInput, 'clean code')
  await user.type(authorInput, 'uncle bob')
  await user.type(urlInput, 'www.cleancode.com')
  await user.click(button)

  expect(createMock.mock.calls).toHaveLength(1)
  expect(createMock.mock.calls[0][0]).toEqual({
    title: 'clean code',
    author: 'uncle bob',
    url: 'www.cleancode.com',
  })
})
