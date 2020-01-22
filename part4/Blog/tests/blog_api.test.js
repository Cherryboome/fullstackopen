/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('return correct amount of blog posts in JSON format', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
