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
  console.log(groupedBlogs)
  const blogsNumbers = groupedBlogs.//Get array of number of blogs (1,2,3)
  // return the author with that number of blogs

  return { 'author': 'Allan', 'blogs': 4 }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}