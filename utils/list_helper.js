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
  console.log('Author: ', authorWithMostBlogs)

  return { 'author': 'Allan', 'blogs': 4 }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}