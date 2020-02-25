/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
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
    console.log(exception.name)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
