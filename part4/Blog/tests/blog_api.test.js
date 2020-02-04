/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('when there are initially blog posts saved in the database', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test(`there are ${helper.initialBlogs.length} blogs`, async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('post request actions', () => {
  test('blog post successfully added', async () => {
    const newBlog = {
      title: 'React Hooks',
      author: 'Damien Marley',
      url: 'N/A',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('React Hooks')
  })

  test('id is used instead of _id', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body[0].id

    expect(id).toBeDefined()
  })

  test('missing likes property defaults to a value of 0', async () => {
    const newBlog = {
      title: 'React useContext',
      author: 'Judge Joe',
      url: 'N/A'
    }

    if (newBlog.likes === undefined) {
      newBlog.likes = 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('blog without title and url properties throw error message', async () => {
    const newBlog = {
      author: 'Julien Johnson',
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.id)

    expect(contents).not.toContain(blogToDelete.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
