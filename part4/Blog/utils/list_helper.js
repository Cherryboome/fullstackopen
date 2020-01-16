const dummy = array => {
  if (Array.isArray(array)) {
    return 1
  }
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.map(item => item.likes).reduce(reducer, 0)
}

const favoriteBlog = array => {
  const favorite = array.sort((a, b) => b.likes - a.likes)

  return {
    title: favorite[0].title,
    author: favorite[0].author,
    likes: favorite[0].likes
  }
}

const mostBlogs = array => {
  const authors = []

  array.map(blog => {
    authors.push(blog.author)
  })

  return authors
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
