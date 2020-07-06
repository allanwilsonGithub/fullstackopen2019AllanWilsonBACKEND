var _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const blogsLikesArray = blogs.map(blog => blog.likes)

  const totalNumberOfLikes = blogsLikesArray.reduce(
    (acc, curr) => acc+curr,
    0)
  return totalNumberOfLikes
}

const favoriteBlog = (blogs) => {
  const blogsLikesArray = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...blogsLikesArray)
  const faveBlog = blogs.find(blog => blog.likes === maxLikes)
  return { 'author': faveBlog.author, 'likes': faveBlog.likes, 'title': faveBlog.title }
}

const mostBlogs = (blogs) => {
  const groupedBlogs = _.countBy(blogs, 'author')
  const blogsNumbers = Object.keys(groupedBlogs).map(
    (key) => groupedBlogs[key]
  )
  const mostBlogAmount = Math.max(...blogsNumbers)

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
  }
  const authorWithMostBlogs = getKeyByValue(groupedBlogs, mostBlogAmount)

  return { 'author': authorWithMostBlogs, 'blogs': mostBlogAmount }
}

const mostLikes = (blogs) => {
  // Get array of authors
  const groupedBlogs = _.countBy(blogs, 'author')
  const authors = Object.keys(groupedBlogs)

  // Get amount of likes per author
  const authorTotalLikesArray = []
  authors.map(currAuthor => {
    let currLikes = 0
    blogs.map(blog => {
      if (blog.author === currAuthor) {
        currLikes += blog.likes
      }
    })
    authorTotalLikesArray.push({ currAuthor, currLikes })
  })
  const mostLikesAmount = Math.max(...authorTotalLikesArray.map(author => author.currLikes))

  // Return the max likes with author
  const authorWithMostLikes = authorTotalLikesArray.find(author => author.currLikes === mostLikesAmount)
  return { author: authorWithMostLikes.currAuthor, likes: mostLikesAmount }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}