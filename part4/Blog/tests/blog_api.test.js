/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Front end web development in 2020',
    author: 'Lee Wang',
    url: 'N/A',
    likes: 30
  },
  {
    title: 'Technologies every developer should know in 2020',
    author: 'Jean Defaux',
    url: 'N/A',
    likes: 25
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  initialBlogs.forEach(async blog => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
})

describe('return correct amount of blog posts in JSON format', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })
})

test('id is used instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const id = response.body[0].id

  expect(id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
