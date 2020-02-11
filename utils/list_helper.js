const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(x => x.likes)
  return likesArray.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const likesArray = blogs.map(x => x.likes)
    const mostLikedBlogLikes = Math.max( ...likesArray )
    const mostLikedBlog = blogs.filter(x => x.likes === mostLikedBlogLikes)
    newArray = [
      {'title': mostLikedBlog[0].title,
       'author': mostLikedBlog[0].author,
       'likes': mostLikedBlog[0].likes
      }]
    return newArray[0]
  } else {
    return "Not enough blogs to compare"
  }}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    mostBlogsArray = []


    const allAuthors = blogs.map(x => x['author'])
    const blogsPerAuthor = _.countBy(allAuthors)
    console.log(blogsPerAuthor)


    return blogs
  } else {
    return "Not enough blogs to compare"
  }}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}

// Define a function called mostBlogs that receives an array of blogs as a parameter.
// The function returns the author who has the largest amount of blogs.
// The return value also contains the number of blogs the top author has: