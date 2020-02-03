/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  helper.initialBlogs.forEach(async blog => {
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

afterAll(() => {
  mongoose.connection.close()
})
