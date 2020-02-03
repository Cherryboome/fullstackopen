/* eslint-disable linebreak-style */
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
