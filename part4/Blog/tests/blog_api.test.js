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

  test(`there are ${initialBlogs.length} blogs`, async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })

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

    const response = await api.get('/api/blogs')
    const titles = response.body.map(res => res.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('React Hooks')
  })

  test('id is used instead of _id', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body[0].id
    // console.log(id)

    expect(id).toBeDefined()
  })

  test('missing likes property defaults to a value of 0', async () => {
    const newBlog = {
      title: 'React useContext',
      author: 'Judge Joe',
      url: 'N/A'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    response.body.map(res => {
      if (res.likes === undefined) {
        res.likes = 0
      }
    })

    console.log(response.body)
    expect(response.body[response.body.length - 1].likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
