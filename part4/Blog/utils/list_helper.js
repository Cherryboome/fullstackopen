const dummy = array => {
  if(Array.isArray(array)) {
    return 1
  }
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.map(item => item.likes).reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}
