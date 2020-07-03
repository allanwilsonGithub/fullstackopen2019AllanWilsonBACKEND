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

module.exports = {
  dummy, totalLikes, favoriteBlog
}