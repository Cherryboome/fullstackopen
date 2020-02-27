/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  if (request.body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be at least 3 characters long' })
      .end()
  }

  try {
    const body = request.body

    const saltRounds = 10
    const passwordHarsh = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHarsh
    })

    const savedUser = await user.save()

    response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
    // console.log(exception.name)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1
  })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await User.findByIdAndDelete(id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
