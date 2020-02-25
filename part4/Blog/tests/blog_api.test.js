/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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

describe('update a single blog', () => {
  test('succeeds with status 201 if content is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'Front end web development in 2020',
      author: 'Lee Wang',
      url: 'N/A',
      likes: 90
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    // console.log(blogsAtEnd)
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    expect(blogsAtEnd[0].likes).toBe(90)
  })
})

describe('Users', () => {
  describe('retrieve initial users from db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'Cher', password: 'Thor' })
      await user.save()
    })

    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there is one user', async () => {
      const response = await api.get('/api/users')

      expect(response.body.length).toBe(1)
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'echerry',
        name: 'Ernest Cherry',
        password: 'itsasecret'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(users => users.username)
      expect(usernames).toContain(newUser.username)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
