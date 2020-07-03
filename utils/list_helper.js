const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogsLikesArray = blogs.map((blog, i) => blog.likes)

const totalNumberOfLikes = blogsLikesArray.reduce(
(acc, curr, i)=>acc+curr,
0)
return totalNumberOfLikes
}





module.exports = {
  dummy, totalLikes
}